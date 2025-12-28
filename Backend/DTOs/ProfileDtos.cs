using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    // 更新個人檔案請求
    public class UpdateProfileRequest
    {
        [Display(Name = "姓名")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Name { get; set; }

        [Display(Name = "職稱")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Title { get; set; }

        [Display(Name = "電子信箱")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [RegularExpression(RegexPatterns.EMAIL_STR, ErrorMessage = ErrorMessages.EMAIL_REQ)]
        public string Email { get; set; }

        [Display(Name = "居住地")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Location { get; set; }

        [Display(Name = "頭像網址")]
        public string AvatarUrl { get; set; }

        [Display(Name = "報紙標題")]
        public string NewspaperTitle { get; set; }

        [Display(Name = "個人簡介")]
        public string BioContent { get; set; }

        [Display(Name = "GitHub 連結")]
        public string? GithubUrl { get; set; }

        [Display(Name = "LinkedIn 連結")]
        public string? LinkedinUrl { get; set; }
    }

    // 個人檔案回應
    public class ProfileResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string AvatarUrl { get; set; }
        public string NewspaperTitle { get; set; }
        public string BioContent { get; set; }
        public string? GithubUrl { get; set; }
        public string? LinkedinUrl { get; set; }
    }
}