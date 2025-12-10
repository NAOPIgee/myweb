using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ContactMessage
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty; // 對方稱呼

        [Required]
        [EmailAddress] // 自動驗證是否為 Email 格式
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty; // 留言內容

        public bool IsRead { get; set; } = false; // 你讀過了沒

        public DateTime SentAt { get; set; } = DateTime.Now;
    }
}