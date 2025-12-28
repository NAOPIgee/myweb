using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    // 建立/修改專案請求
    public class CreateProjectRequest
    {
        [Display(Name = "專案標題")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Title { get; set; }

        [Display(Name = "簡短描述")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Description { get; set; }

        [Display(Name = "詳細內容")]
        public string Content { get; set; } = "";

        [Display(Name = "分類")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public string Category { get; set; } // e.g., "Full Stack", "Mobile"

        [Display(Name = "Demo 連結")]
        [Url(ErrorMessage = "{0} 格式不正確")]
        public string? DemoUrl { get; set; }

        [Display(Name = "Repo 連結")]
        [Url(ErrorMessage = "{0} 格式不正確")]
        public string? RepoUrl { get; set; }

        [Display(Name = "專案圖片")]
        public List<string> Images { get; set; } = new List<string>();

        [Display(Name = "技術堆疊")]
        public List<string> TechStack { get; set; } = new List<string>();
        
        [Display(Name = "精選專案")]
        public bool IsFeatured { get; set; } = false;
    }

    // 專案回應
    public class ProjectResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string? DemoUrl { get; set; }
        public string? RepoUrl { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime CreatedAt { get; set; }
        
        // 前端拿到的是真正的陣列，不是 JSON 字串
        public List<string> Images { get; set; }
        public List<string> TechStack { get; set; }
    }
}