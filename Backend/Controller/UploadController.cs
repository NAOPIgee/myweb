using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;
using Backend.Wrappers;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public UploadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        // POST: api/upload (上傳檔案)
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] UploadRequest request)
        {
            if (request.File == null || request.File.Length == 0)
            {
                return BadRequest(new ApiResponse<string>("請選擇檔案"));
            }
            // if (!request.File.ContentType.StartsWith("image/"))
            // {
            //     return BadRequest(new ApiResponse<string>("只能上傳圖片檔案"));
            // }
            string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
                        if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + request.File.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(fileStream);
            }
            string imageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
            var responseDto = new UploadResponse
            {
                Url = imageUrl,
                FileName = uniqueFileName,
                Size = request.File.Length
            };

            return Ok(new ApiResponse<UploadResponse>(responseDto, "上傳成功"));
        }
    }
}