using LA.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LA.BusinessLogic.Services
{
    internal static class DocExpressionHelper
    {
        internal static string ExecuteIf(List<string> parameters, List<ComponentFormValue> components)
        {
            var paramValue = components.First(x => $"[[{x.Key}]]" == parameters[0]).Value;

            var thenBlock = parameters[1];
            var elseBlock = parameters.Count > 2 ? parameters[2] : string.Empty;

            var result = !IsNullOrEmptyOrFalse(paramValue)
                ? thenBlock
                : elseBlock;

            return result;
        }

        internal static string ExecutePol(List<string> parameters, List<ComponentFormValue> components)
        {
            var paramValue = components.First(x => x.Key == "pol").Value;

            var maleBlock = parameters[0];
            var femaleBlock = parameters[1];

            var result = paramValue == "true"
                ? maleBlock
                : femaleBlock;

            return result;
        }

        internal static string ExecuteRemoveParagraphIfEmpty(List<string> parameters, List<ComponentFormValue> components)
        {
            var text = parameters[0];
            var key = DocParseHelper.GetFirstParameter(text);
            var paramValue = components.First(x => x.Key == key).Value;

            if (!IsNullOrEmptyOrFalse(paramValue))
            {
                if (parameters.Count > 1)
                {
                    return parameters[1];
                }
                else
                {
                    return text;
                }                
            }
            else
            {
                return null;
            }
        }

        internal static string ExecuteTemplate(List<string> parameters, List<ComponentFormValue> components)
        {
            var text = parameters[0];
            var key = DocParseHelper.GetFirstParameter(text);
            var paramValue = components.First(x => x.Key == key).Value;

            if (!string.IsNullOrEmpty(paramValue))
            {
                return text;
            }
            else if (parameters.Count > 1)
            {
                return parameters[1];
            }
            else
            {
                return string.Empty;
            }
        }

        internal static bool IsNullOrEmptyOrFalse(string str)
        {
            return string.IsNullOrEmpty(str) || string.Equals(str, "false", StringComparison.OrdinalIgnoreCase);
        }
    }
}
