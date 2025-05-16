using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NHibernate.Cfg;
using WebApi.Data.Entities;
 

namespace WebApi.Data;
public class DbContext_EF : DbContext
{ 
    private readonly ILogger<DbContext_Dapper>? _logger;
    private readonly IConfiguration? _configuration; 

    public DbContext_EF(ILogger<DbContext_Dapper> logger, DbContextOptions<DbContext_EF> options, IConfiguration configuration)
        : base(options)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _configuration = configuration;
    }

    public DbSet<Category> Categories { get; set; }
  
   

    
     
    public IDbConnection Connection
    {
        get => Database.GetDbConnection(); 
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Fallback: Get connection string from IConfiguration
            var connectionString = _configuration?.GetConnectionString("InterviewsDB");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }


    private static void ConfigureProductEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().ToTable("Products"); 
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        ConfigureProductEntity(modelBuilder);
       
        modelBuilder.Entity<Category>().ToTable("Categories"); 

    }
     public override int SaveChanges()
    {
        ChangeTracker.DetectChanges();
        return base.SaveChanges();
    }
}


