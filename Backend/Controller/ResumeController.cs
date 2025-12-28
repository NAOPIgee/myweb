using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using Backend.Wrappers;

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
                Profile = new ResumeProfileDto
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
                Preferences = new ResumePreferencesDto
                {
                    JobType = profile.JobType,
                    Role = profile.JobRole,
                    Salary = profile.Salary,
                    Availability = profile.Availability,
                    Location = profile.Location
                },
                Skills = skills.Select(s => new SkillDto { Category = s.Category }).ToList(),
                Experience = exp.Select(e => new ExperienceDto 
                { 
                    Company = e.Company, 
                    Role = e.Role, 
                    Period = e.Period, 
                    Description = e.Description 
                }).ToList(),
                Education = edu.Select(e => new EducationDto 
                { 
                    School = e.School, 
                    Degree = e.Degree, 
                    Period = e.Period 
                }).ToList()
            };

            return Ok(new ApiResponse<ResumeDto>(response));
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

            if (request.Skills != null)
            {
                var newSkills = request.Skills.Select(s => new ResumeSkill { Category = s.Category });
                _context.ResumeSkills.AddRange(newSkills);
            }

            if (request.Experience != null)
            {
                var newExp = request.Experience.Select(e => new ResumeExperience 
                { 
                    Company = e.Company, 
                    Role = e.Role, 
                    Period = e.Period, 
                    Description = e.Description 
                });
                _context.ResumeExperiences.AddRange(newExp);
            }

            if (request.Education != null)
            {
                var newEdu = request.Education.Select(e => new ResumeEducation 
                { 
                    School = e.School, 
                    Degree = e.Degree, 
                    Period = e.Period 
                });
                _context.ResumeEducations.AddRange(newEdu);
            }

            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(null, "履歷更新成功"));
        }
    }
}