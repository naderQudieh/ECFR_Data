namespace WebApi.Shared.Helpers;

using System.Globalization;

public class AppException : Exception
{
    public AppException() : base() {}

    public AppException(string message) : base(message) { }

    public AppException(string message, params object[] args) 
        : base(string.Format(CultureInfo.CurrentCulture, message, args))
    {
    }
}