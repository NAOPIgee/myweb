using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class ContactRequest
    {
        [Display(Name = "姓名")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Name { get; set; }

        [Display(Name = "電子信箱")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        [RegularExpression(RegexPatterns.EMAIL_STR, ErrorMessage = ErrorMessages.EMAIL_REQ)]
        public string Email { get; set; }

        [Display(Name = "留言內容")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Message { get; set; }
    }

    public class ContactResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsRead { get; set; }
    }
}