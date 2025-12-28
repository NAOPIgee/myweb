using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs

{
    public static class RegexPatterns
    {
        public const string EMAIL_STR = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

        public const string PASSWORD_STR = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[\s]).{8,}$";

        public const string USERNAME_STR = @"^[a-zA-Z0-9_]+$";
    }

    public static class ErrorMessages
    {
        public const string PASSWORD_REQ = "{0} 需包含至少一個大寫字母、一個小寫字母與一個數字";
        public const string EMAIL_REQ = "{0} 格式不正確";
        public const string USERNAME_REQ = "{0} 只能包含英文字母、數字與底線";
    }

    // 登入請求
    public class LoginRequest
    {
        [Display(Name = "帳號")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [StringLength(50, ErrorMessage = "{0} 長度不能超過 {1} 個字元")]
        [RegularExpression(RegexPatterns.USERNAME_STR, ErrorMessage = ErrorMessages.USERNAME_REQ)]
        public string Username { get; set; }
        [Display(Name = "密碼")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [RegularExpression(RegexPatterns.PASSWORD_STR, ErrorMessage = ErrorMessages.PASSWORD_REQ)]
        public string Password { get; set; }
    }

    // 登入回應
    public class LoginResponse
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public DateTime ExpiresAt { get; set; }
    }

    // 註冊請求
    public class RegisterRequest
    {
        [Display(Name = "帳號")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "{0} 長度需介於 {2} 到 {1} 個字元")]
        [RegularExpression(RegexPatterns.USERNAME_STR, ErrorMessage = ErrorMessages.USERNAME_REQ)]
        public string Username { get; set; }

        [Display(Name = "密碼")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "{0} 長度最少需要 {2} 個字元")]
        [RegularExpression(RegexPatterns.PASSWORD_STR, ErrorMessage = ErrorMessages.PASSWORD_REQ)]
        public string Password { get; set; }

        [Display(Name = "電子信箱")]
        [EmailAddress(ErrorMessage = "{0} 格式不正確")]
        [RegularExpression(RegexPatterns.EMAIL_STR, ErrorMessage = ErrorMessages.EMAIL_REQ)]
        public string? Email { get; set; }
    }

    // 修改密碼請求
    public class ChangePasswordRequest
    {
        [Display(Name = "帳號")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [RegularExpression(RegexPatterns.USERNAME_STR, ErrorMessage = ErrorMessages.USERNAME_REQ)]
        public string Username { get; set; }

        [Display(Name = "舊密碼")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [RegularExpression(RegexPatterns.PASSWORD_STR, ErrorMessage = ErrorMessages.PASSWORD_REQ)]
        public string OldPassword { get; set; }

        [Display(Name = "新密碼")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "{0} 長度最少需要 {2} 個字元")]
        [Compare("NewPassword", ErrorMessage = "新密碼與確認密碼不相符")]
        [RegularExpression(RegexPatterns.PASSWORD_STR, ErrorMessage = ErrorMessages.PASSWORD_REQ)]
        public string NewPassword { get; set; }
    }
    // 個人資料回應
    public class UserProfileDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime LastLogin { get; set; }
    }
}