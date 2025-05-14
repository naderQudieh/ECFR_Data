using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

public class DbContext_Dapper : DbContext
{
    private readonly ILogger<DbContext_Dapper> _logger;
    private readonly IConfiguration? _configuration;
    private string? ConnectionString { get; set; }
    public DbContext_Dapper(ILogger<DbContext_Dapper> logger, IConfiguration configuration)
    {
        _configuration = configuration;
        _logger = logger ?? throw new ArgumentNullException(nameof(logger)); 
        Configure();
    }
    protected   void Configure()
    {   
            ConnectionString = _configuration?.GetConnectionString("CRF_DATA");
            _logger.LogInformation("Using connection string." + ConnectionString); 
    }
    public IDbConnection CreateConnection()
    {
        // Use the configured connection string to create a new SqlConnection  
        return new SqlConnection(ConnectionString);
    }
}
 