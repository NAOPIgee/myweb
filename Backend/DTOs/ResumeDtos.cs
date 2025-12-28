using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    // 主 DTO：包含所有履歷資訊
    public class ResumeDto
    {
        public ResumeProfileDto Profile { get; set; }
        public ResumePreferencesDto Preferences { get; set; }
        public List<SkillDto> Skills { get; set; } = new List<SkillDto>();
        public List<ExperienceDto> Experience { get; set; } = new List<ExperienceDto>();
        public List<EducationDto> Education { get; set; } = new List<EducationDto>();
    }

    public class ResumeProfileDto
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
        public string Location { get; set; }

        [Display(Name = "頭像網址")]
        public string Avatar { get; set; }

        [Display(Name = "GitHub")]
        public string Github { get; set; }

        [Display(Name = "LinkedIn")]
        public string Linkedin { get; set; }

        [Display(Name = "個人簡介")]
        public string BioContent { get; set; }
    }

    public class ResumePreferencesDto
    {
        [Display(Name = "求職類型")]
        public string JobType { get; set; }

        [Display(Name = "期望職位")]
        public string Role { get; set; }

        [Display(Name = "期望薪資")]
        public string Salary { get; set; }

        [Display(Name = "可上班時間")]
        public string Availability { get; set; }

        [Display(Name = "期望地點")]
        public string Location { get; set; }
    }

    public class SkillDto
    {
        public string Category { get; set; }
    }

    public class ExperienceDto
    {
        public string Company { get; set; }
        public string Role { get; set; }
        public string Period { get; set; }
        public string Description { get; set; }
    }

    public class EducationDto
    {
        public string School { get; set; }
        public string Degree { get; set; }
        public string Period { get; set; }
    }
}