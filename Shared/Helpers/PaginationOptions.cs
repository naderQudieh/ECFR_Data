using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace WebApi.Shared.Helpers;
    public class PaginationOptions
    {
        public int Limit { get; set; } = 2;
        public int Offset { get; set; } = 0;
        public string? Search { get; set; } = null;
        public decimal? MinPrice  { get; set; } = 0;
        public decimal? MaxPrice { get; set; } = 10000;

    }
 