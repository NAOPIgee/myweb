using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class UploadRequest
    {
        [Display(Name = "檔案")]
        [Required(ErrorMessage = "{0} 為必填欄位")]
        public IFormFile File { get; set; }
    }

    public class UploadResponse
    {
        public string Url { get; set; }
        public string FileName { get; set; }
        public long Size { get; set; }
    }
}