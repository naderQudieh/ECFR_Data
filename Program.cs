using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using WebApi.Services;
using WebApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using NLog.Web;
using NLog;
using NLog.Extensions.Logging;
using Microsoft.AspNetCore.HttpLogging;
using WebApi.Data;
using Microsoft.Net.Http.Headers;
using WebApi.DependencyInjection;
using WebApi.Shared.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;

//string startupPath = AppDomain.CurrentDomain.BaseDirectory;
//var logPath = Path.Combine(startupPath, "logs");
//NLog.LogManager.Setup().LoadConfiguration(builder => {
//    builder.ForLogger().FilterMinLevel(NLog.LogLevel.Info).WriteToConsole();
//    builder.ForLogger().FilterMinLevel(NLog.LogLevel.Debug).WriteToFile("{logPath}/App_${shortdate}.txt");
//});

var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("init main");
try {
	var builder = WebApplication.CreateBuilder(args);

	var config = builder.Configuration;
	var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; 
	builder.Logging.ClearProviders();
	builder.Host.UseNLog();
	logger = LogManager.GetCurrentClassLogger();
	logger.Log(NLog.LogLevel.Debug, "init main333");
	{
		var services = builder.Services;
		var env = builder.Environment; 
		services.AddHttpLogging(logging => {
			logging.LoggingFields = HttpLoggingFields.RequestPropertiesAndHeaders | HttpLoggingFields.ResponsePropertiesAndHeaders;
			logging.RequestBodyLogLimit = 4096;
			logging.ResponseBodyLogLimit = 4096;
		});
		services.AddRazorPages();
		services.AddControllersWithViews();
		services.AddControllers().AddNewtonsoftJson(ops => {
			ops.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
			ops.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
			ops.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
			ops.SerializerSettings.Formatting = Formatting.Indented;
			ops.SerializerSettings.MaxDepth = 1;
			ops.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
			ops.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
			ops.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
		});

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        builder.Services.AddControllersWithViews();


        builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly); 
        services.AddScoped<DbContext_Dapper>();
		services.UseCustomLogging();

        services.AddDbContext<DbContext_EF>()
        .AddServices() 
        .AddSwaggerConfiguration()
        .AddControllers();


        builder.Services.AddCors(options => {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                              policy => {
                                  policy.WithOrigins("http://localhost:4000", "http://localhost:4001")
                                  .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .SetIsOriginAllowed((host) => true)
                                    .AllowCredentials();
                              });
        });
        builder.Services.AddDirectoryBrowser();

    }

	var app = builder.Build();
	app.UseSwaggerConfiguration(app.Environment); 

	app.Use(async (context, next) =>
	{
		// Do work that can write to the Response.
		await next.Invoke();
		// Do logging or other work that doesn't write to the Response.
	});


	var options = new DefaultFilesOptions();
	options.DefaultFileNames.Clear();
	options.DefaultFileNames.Add("home.html");
	//app.UseDirectoryBrowser();

	app.UseStaticFiles();   // serve files from wwwroot
	    

	app.MapStaticAssets();

    app.UseMiddleware<ErrorHandlerMiddleware>();
    app.UseCookiePolicy();
 	app.UseRouting();
	// global cors policy
	app.UseCors(MyAllowSpecificOrigins);
	app.UseAuthentication();

	app.UseAuthorization();
	// global error handler
	 

	app.MapDefaultControllerRoute().WithStaticAssets();
	app.MapRazorPages().WithStaticAssets();


	app.Run("http://localhost:4000");
	//app.Run();
} catch (Exception exception) {
	// NLog: catch setup errors
	logger.Error(exception, "Stopped program because of exception");
	throw;
} finally {
	// Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
	NLog.LogManager.Shutdown();
}
