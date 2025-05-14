using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApi.Data.Models;
using WebApi.Shared.Helpers;

namespace WebApi.Services.Interfaces;
public interface IErrorHandlingService
{
    public void DisplayLogError(ErrorType errorType, string logErrorAction, string errorMessage);
    Error HandleError(
        Exception exception,
        ErrorType errorType,
        string logErrorAction,
        string? initialErrorMessage = ""
    );
    Error HandleConfigurationError();
    Error HandleDatabaseError(Exception exception, string logErrorAction);
    Result<ResultType> HandleDatabaseException<ResultType>(string logErrorAction, Exception exception);
}