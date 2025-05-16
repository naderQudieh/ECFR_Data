using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Data.Entities;
[Table(name: "Products")]
public class Product
{
    public int ProductID { get; set; }
    public required string ProductName { get; set; }
    public required decimal UnitPrice { get; set; }
    [ForeignKey("CategoryID")]
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
}
