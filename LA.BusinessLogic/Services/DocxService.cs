using LA.BusinessLogic.Interfaces;
using LA.BusinessLogic.Models;
using LA.Common.Enums;
using System.Collections.Generic;
using System.Linq;
using Xceed.Words.NET;

namespace LA.BusinessLogic.Services
{
    public class DocxService : IDocxService
    {   
        public byte[] GetDocument(DocumentFormValue doc, string path)
        {
            using (DocX document = DocX.Load(path))
            {
                //Execute expression in curly brackets {{}}
                //After that document will have only
                //parameters [[]] which we need to replace 
                ExecuteSpecialExpressions(document, doc.Components);

                //Replace document parameters
                ReplaceParameters(document, doc.Components);

                //Added text to footers
                AddSiteSignature(document);

                var result = document.SaveToByteArray();
                return result;
            }
        }

        private void ReplaceParameters(DocX document, List<ComponentFormValue> components)
        {
            var allParameters = DocParseHelper.GetParameters(document.Text);

            foreach (var parameter in allParameters)
            {
                var component = components.FirstOrDefault(x => x.Key == parameter);

                if (component != null)
                {
                    document.ReplaceParameter(parameter, component.Value);
                }
                else
                {
                    throw new System.Exception($"Component value for [[{parameter}]] key is not found");
                }
            }
        }
        
        private void AddSiteSignature(DocX document)
        {
            var text = "Документ подготовлен при поддержке сайта http://www.urobott.ru";
            var margin = 14.1732f;
            var fontSize = 9;

            document.AddFooters();           
            var paragraph = document.Footers.Odd.Paragraphs[0];
            paragraph.Append(text);
            paragraph.FontSize(fontSize);
            document.MarginFooter = margin;

            document.AddHeaders();
            paragraph = document.Headers.Odd.Paragraphs[0];
            paragraph.Append(text);
            paragraph.FontSize(fontSize);
            document.MarginHeader = margin;
        }

        #region Update Doc Help Methods
        private void ExecuteSpecialExpressions(DocX document, List<ComponentFormValue> components)
        {
            var expressionInfos = DocParseHelper.GetExpressions(document.Text);

            foreach (var expressionInfo in expressionInfos)
            {
                switch (expressionInfo.ExpressionKey)
                {
                    case DocExpressionKey.If:
                        var ifResult = DocExpressionHelper.ExecuteIf(expressionInfo.Parameters, components);
                        document.ReplaceExpression(expressionInfo.Expression, ifResult);
                        break;
                    case DocExpressionKey.Pol:
                        var polResult = DocExpressionHelper.ExecutePol(expressionInfo.Parameters, components);
                        document.ReplaceExpression(expressionInfo.Expression, polResult);
                        break;
                    case DocExpressionKey.RemoveParagraphIfEmpty:
                        var removeParResult = DocExpressionHelper.ExecuteRemoveParagraphIfEmpty(expressionInfo.Parameters, components);
                        if (!string.IsNullOrEmpty(removeParResult))
                        {
                            document.ReplaceExpression(expressionInfo.Expression, removeParResult);
                        }
                        else
                        {
                            document.RemoveFirstParagraphByExpression(expressionInfo.Expression);
                        }
                        break;
                    case DocExpressionKey.Template:
                        var templateResult = DocExpressionHelper.ExecuteTemplate(expressionInfo.Parameters, components);
                        document.ReplaceExpression(expressionInfo.Expression, templateResult);
                        break;
                    default:
                        break;
                }
            }
        }
        #endregion

    }
}
