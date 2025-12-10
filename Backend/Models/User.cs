using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization; // 為了不小心回傳資料時隱藏密碼

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [JsonIgnore]
        public string PasswordHash { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        
        public DateTime LastLogin { get; set; }
    }
}