using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService.Helpers
{
    public static class FormFileExtensions
    {
        public static async Task<List<string>> ReadAsStringAsync(this IFormFile file)
        {
            var result = new List<string>();
            using (var reader = new StreamReader(file.OpenReadStream(), System.Text.Encoding.GetEncoding(1250)))
            {
                while (reader.Peek() >= 0)
                {
                    result.Add(await reader.ReadLineAsync());
                }
            }
            return result;
        }
    }
}
