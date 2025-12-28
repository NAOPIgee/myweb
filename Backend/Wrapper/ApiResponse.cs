namespace Backend.Wrappers
{
    public class ApiResponse<T>
    {
        // 成功
        public ApiResponse(T data, string message = null)
        {
            Succeeded = true;
            Message = message ?? "Success";
            Data = data;
        }

        // 失敗
        public ApiResponse(string message)
        {
            Succeeded = false;
            Message = message;
        }

        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}