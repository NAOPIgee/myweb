using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

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
                                     .ToListAsync();
            return Ok(msgs);
        }

        // POST: api/contact (前台讀者投書用)
        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] ContactMessage message)
        {
            if (string.IsNullOrWhiteSpace(message.Name) || 
                string.IsNullOrWhiteSpace(message.Email) || 
                string.IsNullOrWhiteSpace(message.Message))
            {
                return BadRequest("欄位不得為空");
            }
            message.SentAt = DateTime.Now;
            message.IsRead = false; 
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();
            return Ok(new { message = "投遞成功" });
        }
    }
}