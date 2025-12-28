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
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/contact (後台查看留言用)
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var msgs = await _context.ContactMessages
                                     .OrderByDescending(m => m.SentAt)
                                     .Select(m => new ContactResponse
                                     {
                                         Id = m.Id,
                                         Name = m.Name,
                                         Email = m.Email,
                                         Message = m.Message,
                                         SentAt = m.SentAt,
                                         IsRead = m.IsRead
                                     })
                                     .ToListAsync();
            
            return Ok(new ApiResponse<List<ContactResponse>>(msgs));
        }

        // POST: api/contact (前台讀者投書用)
        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] ContactRequest request)
        {
            var newMessage = new ContactMessage
            {
                Name = request.Name,
                Email = request.Email,
                Message = request.Message,
                SentAt = DateTime.Now,
                IsRead = false
            };

            _context.ContactMessages.Add(newMessage);
            await _context.SaveChangesAsync();
            
            return Ok(new ApiResponse<string>(null, "投遞成功"));
        }
    }
}