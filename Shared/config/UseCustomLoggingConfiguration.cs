using NLog;
using NLog.Web;

namespace WebApi.DependencyInjection
{
    public static class UseCustomLoggingConfiguration
    {
        public static IServiceCollection UseCustomLogging(this IServiceCollection services)
        {
            LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
            services.AddSingleton<NLog.ILogger>(LogManager.GetCurrentClassLogger()); 
            return services;
        }
    }
}