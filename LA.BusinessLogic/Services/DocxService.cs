using LA.BusinessLogic.Interfaces;
using LA.BusinessLogic.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Xceed.Words.NET;

namespace LA.BusinessLogic.Services
{
    public class DocxService : IDocxService
    {   
        public byte[] GetDocument(DocumentFormValue doc, string path)
        {
            using (DocX document = DocX.Load(path))
            {
                //Replace document parameters
                UpdateDocument(document, doc);

                //Added text to footers
                AddSiteSignature(document);

                var result = document.SaveToByteArray();
                return result;
            }
        }

        private void UpdateDocument(DocX document, DocumentFormValue doc)
        {
            var allKeys = GetAllKeys(document);

            foreach (var keyWithoutBrackets in allKeys)
            {
                var key = string.Format("[[{0}]]", keyWithoutBrackets);

                bool removeLineIfResultIsEmpty;
                var value = GetValue(keyWithoutBrackets, doc.Components, out removeLineIfResultIsEmpty);

                if (string.IsNullOrEmpty(value) && removeLineIfResultIsEmpty)
                {
                    var paragraph = document.Paragraphs.FirstOrDefault(x => x.Text.Contains(key));

                    if (paragraph != null)
                    {
                        var lines = paragraph.Text.Split('\n');

                        if (lines.Length <= 1)
                        {
                            paragraph.Remove(false);
                        }
                        else
                        {
                            paragraph.ReplaceText("\n" + key, string.Empty);
                            paragraph.ReplaceText(key + "\n", string.Empty);
                        }
                    }
                }
                else
                {
                    document.ReplaceText(key, value ?? string.Empty, false, RegexOptions.IgnoreCase);
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
        private List<string> GetAllKeys(DocX document)
        {
            var text = document.Text;
            var matches = Regex.Matches(text, @"\[\[(.*?)\]\]");

            var result = new List<string>();

            foreach (Match match in matches)
            {
                result.Add(match.Groups[1].Value);
            }

            return result;
        }

        private string GetValue(string keyWithoutBrackets, List<ComponentFormValue> components, out bool removeLineIfResultIsEmpty)
        {
            var keyString = keyWithoutBrackets.Split(':').Select(x => x.Trim()).ToList();
            var key = keyString.First();

            var component = components.FirstOrDefault(x => x.Key == key);

            if (component != null)
            {
                removeLineIfResultIsEmpty = component.RemoveLineIfResultIsEmpty;

                if (key == "pol")
                {
                    //Если мужчина
                    if (component.Value == "1")
                    {
                        return keyString[1];
                    }
                    else
                    {
                        //Если женщина
                        return keyString[2];
                    }
                }
                else if (keyString.Count == 1)
                {
                    return component.Value;
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                throw new System.Exception(string.Format("Component value for {0} key is not found", key));
            }
        }
        #endregion        
    }
}
