using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Entities;
[Table(name: "Categories")]
public class Category
{
    public int CategoryID { get; set; } = 0;
    public string? CategoryName { get; set; } = null; 
}
