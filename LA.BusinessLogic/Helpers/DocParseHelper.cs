using LA.BusinessLogic.Models;
using LA.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace LA.BusinessLogic.Services
{
    internal static class DocParseHelper
    {
        internal static List<string> GetParameters(string text)
        {
            var result = FindByRegex(text, @"\[\[(.*?)\]\]");            
            return result;
        }                

        internal static string GetFirstParameter(string text)
        {
            var result = GetParameters(text).First();
            return result;
        }

        internal static List<ExpressionInfo> GetExpressions(string text)
        {
            var expressionStrings = FindByRegex(text, @"\{\{(.*?)\}\}");
            
            var result = expressionStrings.Select(x =>
            {
                var expArray = x.Split('|').Select(y => y.Trim()).ToList();
                var expressionKey = (DocExpressionKey)Enum.Parse(typeof(DocExpressionKey), expArray.First(), true);
                var parameters = expArray.Skip(1).ToList();

                return new ExpressionInfo
                {
                    Expression = x,
                    ExpressionKey = expressionKey,
                    Parameters = parameters
                };
            })
            .ToList();

            return result;
        }
        
        private static List<string> FindByRegex(string text, string regexExp)
        {
            var matches = Regex.Matches(text, regexExp);

            var result = new List<string>();

            foreach (Match match in matches)
            {
                result.Add(match.Groups[1].Value);
            }

            return result;
        }
    }
}
