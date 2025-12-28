using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Backend.Data;
using Backend.Models;
using Backend.Wrappers;
using Backend.DTOs;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register (註冊帳號)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return BadRequest(new ApiResponse<string>("該帳號已被使用"));
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var newUser = new User
            {
                Username = request.Username,
                PasswordHash = passwordHash,
                Email = request.Email ?? "",
                LastLogin = DateTime.Now
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(newUser.Username, "註冊成功，請登入"));
        }

        // POST: api/auth/login (登入)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized(new ApiResponse<string>("帳號或密碼錯誤"));
            }

            user.LastLogin = DateTime.Now;
            await _context.SaveChangesAsync();

            var responseDto = new LoginResponse
            {
                Token = "fake-jwt-token-" + Guid.NewGuid().ToString(),
                Username = user.Username,
                ExpiresAt = DateTime.Now.AddHours(1)
            };
            return Ok(new ApiResponse<LoginResponse>(responseDto, "登入成功"));
        }

        // POST: api/auth/change-password (修改密碼)
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return NotFound(new ApiResponse<string>("找不到使用者"));
            }

            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.PasswordHash))
            {
                return BadRequest(new ApiResponse<string>("舊密碼錯誤"));
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse<string>(null, "密碼修改成功"));
        }

        // GET: api/auth/profile/{username} (取得個人資料)
        [HttpGet("profile/{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            var userDto = await _context.Users
                .Where(u => u.Username == username)
                .Select(u => new UserProfileDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    LastLogin = u.LastLogin
                })
                .FirstOrDefaultAsync();
            if (userDto == null)
            {
                return NotFound(new ApiResponse<string>("找不到該使用者"));
            }
            return Ok(new ApiResponse<UserProfileDto>(userDto));
        }
    }
}