using WebApi.Services.Interfaces;
using WebApi.Services;
 

namespace WebApi.DependencyInjection
{
    public static class ServicesCollection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
           
            services.AddScoped<ICRFService, CRFService>();
            services.AddSingleton<IErrorHandlingService, ErrorHandlingService>();
            services.AddScoped<ICategoryService, CategoryService>();
            return services;
        }
    }
}
