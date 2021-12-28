using DataBaseWithBusinessLogicConnector.ApiEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService.Helpers
{
    public static class ConvertStringHelper
    {
        public static ApiFrequency ConvertToFrequency(string input, List<ApiFrequency> frequencies)
        {
            foreach (var frequency in frequencies)
            {
                if (frequency.Text == input)
                {
                    return frequency;
                }
            }
            return null;
        }

        public static ApiImportance ConvertToImportance(string input, List<ApiImportance> importances)
        {
            foreach (var importance in importances)
            {
                if (importance.Text == input)
                {
                    return importance;
                }
            }
            return null;
        }

        public static ApiTag ConvertToTag(string input, List<ApiTag> tags)
        {
            foreach (var tag in tags)
            {
                if (tag.Text == input)
                {
                    return tag;
                }
            }
            return null;
        }
    }
}
