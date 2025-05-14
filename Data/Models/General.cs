using System.ComponentModel;


namespace WebApi.Data.Models
{
  
    public enum ErrorType
    {
        [Description("Validation")]
        Validation = 0,
        [Description("Database")]
        Database = 1,
        [Description("Internal")]
        Internal = 2,
        [Description("Failure")]
        Failure = 3,
        [Description("UserAlreadyExist")]
        UserAlreadyExist = 4,
        [Description("PasswordHashing")]
        PasswordHashing = 5,
        [Description("WrongLogin")]
        WrongLogin = 6,
        [Description("WrongPassword")]
        WrongPassword = 7,
        [Description("WrongEmail")]
        WrongEmail = 8,
        [Description("GeneratePasswordResetTokenError")]
        GeneratePasswordResetTokenError = 9,
        [Description("TokenExpired")]
        TokenExpired = 10,
        [Description("InvalidToken")]
        InvalidToken = 11,
        [Description("ApiItunes")]
        ApiItunes = 12,
        [Description("ConfigurationError")]
        ConfigurationError = 13,
        [Description("WrongUserId")]
        WrongUserId = 14,
        [Description("UserNotFound")]
        WrongPlaylistId = 15,
        [Description("Unathorized")]
        Unauthorized = 16,
        [Description("UserIsAlreadyAdded")]
        UserIsAlreadyAdded = 17,
        [Description("UserIsNotAdded")]
        UserIsNotAdded = 18,
        [Description("SongIsAlreadyAdded")]
        SongIsAlreadyAdded = 19,
        [Description("SongIsNotAdded")]
        SongIsNotAdded = 20,
        [Description("PlaylistIsNotPublic")]
        PlaylistIsNotPublic = 21,
        [Description("PlaylistIsAlreadyAddedToFavorites")]
        PlaylistIsAlreadyAddedToFavorites = 22,
        [Description("PlaylistIsNotAddedToFavorites")]
        PlaylistIsNotAddedToFavorites = 23,
        [Description("UserIsOwnerOrCollaborator")]
        UserIsOwnerOrCollaborator = 24
    }
    public record Error(ErrorType Type, object Description)
    {
        public static readonly Error UserAlreadyExist = new(ErrorType.UserAlreadyExist, "User with the provided email address or nickname already exists");
        public static readonly Error WrongLogin = new(ErrorType.WrongLogin, "Incorrect login");
        public static readonly Error WrongPassword = new(ErrorType.WrongPassword, "Incorrect password");
        public static readonly Error WrongEmail = new(ErrorType.WrongEmail, "Account with the provided email does not exist");
        public static readonly Error GeneratePasswordResetTokenError = new(ErrorType.GeneratePasswordResetTokenError, "Failed to generate password reset token");
        public static readonly Error TokenHasExpired = new(ErrorType.TokenExpired, "Token has expired");
        public static readonly Error InvalidToken = new(ErrorType.InvalidToken, "Invalid token");
        public static readonly Error ApiItunesError = new(ErrorType.ApiItunes, "Error calling iTunes API");
        public static readonly Error ConfigurationError = new(ErrorType.ConfigurationError, "Missing secretKey");
        public static readonly Error WrongUserId = new(ErrorType.WrongUserId, "Incorrect user Id");
        public static readonly Error WrongPlaylistId = new(ErrorType.WrongUserId, "Incorrect playlist Id");
        public static readonly Error Unauthorized = new(ErrorType.Unauthorized, "Unauthorized");
        public static readonly Error UserIsAlreadyAdded = new(ErrorType.UserIsAlreadyAdded, "User is already added to collaborators");
        public static readonly Error UserIsNotAdded = new(ErrorType.UserIsNotAdded, "User is not added to collaborators");
        public static readonly Error SongIsAlreadyAdded = new(ErrorType.SongIsAlreadyAdded, "Song is already added to playlist");
        public static readonly Error SongIsNotAdded = new(ErrorType.SongIsNotAdded, "Song is not added to playlist");
        public static readonly Error PlaylistIsNotPublic = new(ErrorType.PlaylistIsNotPublic, "Playlist is not public");
        public static readonly Error PlaylistIsAlreadyAddedToFavorites = new(ErrorType.PlaylistIsAlreadyAddedToFavorites, "Playlist is already added to favorites");
        public static readonly Error PlaylistIsNotAddedToFavorites = new(ErrorType.PlaylistIsNotAddedToFavorites, "Playlist is not added to favorites");
        public static readonly Error UserIsOwnerOrCollaborator = new(ErrorType.UserIsOwnerOrCollaborator, "Playlist cannot be added to favorites - user is owner or collaborator of the playlist");
    }
    
}

public class TokenResult(string accessToken, string refreshToken)
{
    public string AccessToken { get; set; } = accessToken;
    public string RefreshToken { get; set; } = refreshToken;
}
