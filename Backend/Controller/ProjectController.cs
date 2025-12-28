using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using Backend.Wrappers;
using System.Text.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/projects (取得所有專案)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResponse>>> GetProjects()
        {
            var projects = await _context.Projects
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            var response = projects.Select(p => MapToResponse(p)).ToList();

            return Ok(new ApiResponse<List<ProjectResponse>>(response));
        }

        // GET: api/projects/home (取得首頁專案)
        [HttpGet("home")]
        public async Task<ActionResult<IEnumerable<ProjectResponse>>> GetHomeProjects()
        {
            var projects = await _context.Projects
                .OrderByDescending(p => p.CreatedAt)
                .Take(3)
                .ToListAsync();

            var response = projects.Select(p => MapToResponse(p)).ToList();

            return Ok(new ApiResponse<List<ProjectResponse>>(response));
        }

        // GET: api/projects/5 (取得單一專案)
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResponse>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            
            if (project == null) 
            {
                return NotFound(new ApiResponse<string>("找不到該專案"));
            }

            return Ok(new ApiResponse<ProjectResponse>(MapToResponse(project)));
        }

        // POST: api/projects (新增專案 - 簡易保護)
        [HttpPost]
        public async Task<ActionResult<ProjectResponse>> PostProject([FromBody] CreateProjectRequest request)
        {
            var project = new Project
            {
                Title = request.Title,
                Description = request.Description,
                Content = request.Content,
                Category = request.Category,
                DemoUrl = request.DemoUrl,
                RepoUrl = request.RepoUrl,
                IsFeatured = request.IsFeatured,
                CreatedAt = DateTime.Now,
                Images = request.Images,
                TechStack = request.TechStack
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            var response = MapToResponse(project);

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, new ApiResponse<ProjectResponse>(response, "專案建立成功"));
        }

        // DELETE: api/projects/5 (刪除專案)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) 
            {
                return NotFound(new ApiResponse<string>("找不到該專案"));
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            
            return Ok(new ApiResponse<string>(null, "專案已刪除"));
        }

        private static ProjectResponse MapToResponse(Project p)
        {
            return new ProjectResponse
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Content = p.Content,
                Category = p.Category,
                DemoUrl = p.DemoUrl,
                RepoUrl = p.RepoUrl,
                IsFeatured = p.IsFeatured,
                CreatedAt = p.CreatedAt,
                Images = p.Images,
                TechStack = p.TechStack
            };
        }
    }
}