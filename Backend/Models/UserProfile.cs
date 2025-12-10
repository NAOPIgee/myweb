using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = "你的名字";
        public string Title { get; set; } = "Full Stack Developer";
        public string Email { get; set; } = "";
        public string Location { get; set; } = "";
        public string AvatarUrl { get; set; } = "";

        public string NewspaperTitle { get; set; } = "本報特稿";
        public string BioContent { get; set; } = "";

        public string? GithubUrl { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? MediumUrl { get; set; }

        public string JobType { get; set; } = "全職";      // 全職/兼職
        public string JobRole { get; set; } = "後端工程師"; // 期望職位
        public string Salary { get; set; } = "面議";        // 期望薪資
        public string Availability { get; set; } = "兩週內"; // 上班時間
    }
}