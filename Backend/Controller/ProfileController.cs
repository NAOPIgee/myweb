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
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/profile
        [HttpGet]
        public async Task<IActionResult> GetProfile([FromQuery] bool isPublic = false)
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();

            if (profile == null)
            {
                profile = new UserProfile
                {
                    Name = "預設名字",
                    Title = "全端工程師",
                    BioContent = "",
                    Email = "",
                    Location = "",
                    AvatarUrl = "",
                    NewspaperTitle = "" 
                };
                _context.UserProfiles.Add(profile);
                await _context.SaveChangesAsync();
            }

            var responseDto = new ProfileResponse
            {
                Id = profile.Id,
                Name = profile.Name,
                Title = profile.Title,
                Email = profile.Email,
                Location = profile.Location,
                AvatarUrl = profile.AvatarUrl,
                NewspaperTitle = profile.NewspaperTitle,
                BioContent = profile.BioContent,
                GithubUrl = profile.GithubUrl,
                LinkedinUrl = profile.LinkedinUrl
            };

            if (isPublic && !string.IsNullOrEmpty(responseDto.BioContent) && responseDto.BioContent.Length > 200)
            {
                responseDto.BioContent = responseDto.BioContent.Substring(0, 200) + "...";
            }

            return Ok(new ApiResponse<ProfileResponse>(responseDto));
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

            var responseDto = new ProfileResponse
            {
                Id = profile.Id,
                Name = profile.Name,
                Title = profile.Title,
                Email = profile.Email,
                Location = profile.Location,
                AvatarUrl = profile.AvatarUrl,
                NewspaperTitle = profile.NewspaperTitle,
                BioContent = profile.BioContent,
                GithubUrl = profile.GithubUrl,
                LinkedinUrl = profile.LinkedinUrl
            };

            return Ok(new ApiResponse<ProfileResponse>(responseDto, "個人檔案已更新"));
        }
    }
}