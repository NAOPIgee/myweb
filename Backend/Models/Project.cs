using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty; // 列表頁的短介紹

        public string Content { get; set; } = string.Empty; // 內頁的詳細 Markdown/HTML

        public string Category { get; set; } = string.Empty; // 分類

        public string? DemoUrl { get; set; } // 網站連結 (允許為空)
        public string? RepoUrl { get; set; } // GitHub 連結 (允許為空)
        public bool IsFeatured { get; set; } = false; // 是否置頂/精選

        public List<string> Images { get; set; } = new List<string>();
        public List<string> TechStack { get; set; } = new List<string>();

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}