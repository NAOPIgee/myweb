using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResumeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/resume
        [HttpGet]
        public async Task<ActionResult<ResumeDto>> GetResume()
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();
            if (profile == null)
            {
                profile = new UserProfile();
                _context.UserProfiles.Add(profile);
                await _context.SaveChangesAsync();
            }

            var skills = await _context.ResumeSkills.ToListAsync();
            var exp = await _context.ResumeExperiences.ToListAsync();
            var edu = await _context.ResumeEducations.ToListAsync();

            var response = new ResumeDto
            {
                Profile = new ProfileDto
                {
                    Name = profile.Name,
                    Title = profile.Title,
                    Email = profile.Email,
                    Location = profile.Location,
                    Avatar = profile.AvatarUrl,
                    Github = profile.GithubUrl ?? "",
                    Linkedin = profile.LinkedinUrl ?? "",
                    BioContent = profile.BioContent
                },
                Preferences = new PreferencesDto
                {
                    JobType = profile.JobType,
                    Role = profile.JobRole,
                    Salary = profile.Salary,
                    Availability = profile.Availability,
                    Location = profile.Location
                },
                Skills = skills,
                Experience = exp,
                Education = edu
            };

            return Ok(response);
        }

        // PUT: api/resume
        [HttpPut]
        public async Task<IActionResult> UpdateResume([FromBody] ResumeDto request)
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();
            if (profile == null)
            {
                profile = new UserProfile();
                _context.UserProfiles.Add(profile);
            }
            profile.Name = request.Profile.Name;
            profile.Title = request.Profile.Title;
            profile.Email = request.Profile.Email;
            profile.Location = request.Profile.Location;
            profile.AvatarUrl = request.Profile.Avatar;
            profile.GithubUrl = request.Profile.Github;
            profile.LinkedinUrl = request.Profile.Linkedin;
            profile.BioContent = request.Profile.BioContent;
            profile.JobType = request.Preferences.JobType;
            profile.JobRole = request.Preferences.Role;
            profile.Salary = request.Preferences.Salary;
            profile.Availability = request.Preferences.Availability;
            _context.ResumeSkills.RemoveRange(_context.ResumeSkills);
            _context.ResumeExperiences.RemoveRange(_context.ResumeExperiences);
            _context.ResumeEducations.RemoveRange(_context.ResumeEducations);

            if (request.Skills != null) _context.ResumeSkills.AddRange(request.Skills);
            if (request.Experience != null) _context.ResumeExperiences.AddRange(request.Experience);
            if (request.Education != null) _context.ResumeEducations.AddRange(request.Education);

            await _context.SaveChangesAsync();

            return Ok(new { message = "履歷更新成功" });
        }
    }

    public class ResumeDto
    {
        public ProfileDto Profile { get; set; }
        public PreferencesDto Preferences { get; set; }
        public List<ResumeSkill> Skills { get; set; }
        public List<ResumeExperience> Experience { get; set; }
        public List<ResumeEducation> Education { get; set; }
    }

    public class ProfileDto
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string Avatar { get; set; }
        public string Github { get; set; }
        public string Linkedin { get; set; }
        public string BioContent { get; set; }
    }

    public class PreferencesDto
    {
        public string JobType { get; set; }
        public string Role { get; set; }
        public string Salary { get; set; }
        public string Availability { get; set; }
        public string Location { get; set; }
    }
}