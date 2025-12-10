using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/profile
        [HttpGet]
        public async Task<ActionResult<UserProfile>> GetProfile([FromQuery] bool isPublic = false)
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();

            if (profile == null)
            {
                profile = new UserProfile
                {
                    Name = "預設名字",
                    Title = "全端工程師",
                    BioContent = ""
                };
                _context.UserProfiles.Add(profile);
                await _context.SaveChangesAsync();
            }

            if (isPublic && !string.IsNullOrEmpty(profile.BioContent) && profile.BioContent.Length > 200)
            {
                profile.BioContent = profile.BioContent.Substring(0, 200) + "...";
            }

            return Ok(profile);
        }

        // PUT: api/profile
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();
            if (profile == null)
            {
                profile = new UserProfile();
                _context.UserProfiles.Add(profile);
            }

            profile.Name = request.Name;
            profile.Title = request.Title;
            profile.Email = request.Email;
            profile.Location = request.Location;
            profile.AvatarUrl = request.AvatarUrl;
            profile.NewspaperTitle = request.NewspaperTitle;
            profile.BioContent = request.BioContent;
            profile.GithubUrl = request.GithubUrl;
            profile.LinkedinUrl = request.LinkedinUrl;

            await _context.SaveChangesAsync();
            return Ok(new { message = "個人檔案已更新", data = profile });
        }
    }

    public class UpdateProfileRequest
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
        public string AvatarUrl { get; set; }
        public string NewspaperTitle { get; set; }
        public string BioContent { get; set; }
        public string? GithubUrl { get; set; }
        public string? LinkedinUrl { get; set; }
    }
}