using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Data.Entities
{
    public class BaseEntity : IBaseEntity
    {
        [Column(Order = 1), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastUpdated { get; set; }
        public long LastUpdatedBy { get; set; }
        public bool IsDeleted { get; set; } 
    }
    public interface IEntity<T> where T : IComparable
    {
        T Id { get; set; }
    }
    public interface IBaseEntity : IEntity<long>
    {
        new long Id { get; set; }
        DateTime Created { get; set; }
        DateTime LastUpdated { get; set; }
        long LastUpdatedBy { get; set; }
        bool IsDeleted { get; set; }
        
    }
}
