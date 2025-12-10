using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ResumeBasicInfo
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";
        public string Title { get; set; } = "";
        public string Email { get; set; } = "";
        public string Github { get; set; } = "";
        public string Linkedin { get; set; } = "";
        public string Location { get; set; } = "";
        public string Avatar { get; set; } = "";
        public string JobType { get; set; } = "";
        public string Role { get; set; } = "";
        public string Salary { get; set; } = "";
        public string Availability { get; set; } = "";
    }

    public class ResumeSkill
    {
        public int Id { get; set; }
        public string Category { get; set; } = ""; // e.g., Backend, Frontend
        public List<string> Items { get; set; } = new List<string>(); // e.g., ["C#", ".NET"]
    }

    public class ResumeExperience
    {
        public int Id { get; set; }
        public string Company { get; set; } = "";
        public string Role { get; set; } = "";
        public string Period { get; set; } = "";
        public string Description { get; set; } = "";
    }

    public class ResumeEducation
    {
        public int Id { get; set; }
        public string School { get; set; } = "";
        public string Degree { get; set; } = "";
        public string Period { get; set; } = "";
    }
}