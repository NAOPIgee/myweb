using Microsoft.EntityFrameworkCore;
using Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// 步驟 A: 先嘗試去抓 Render (雲端) 的環境變數
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

// 步驟 B: 如果抓不到 (代表現在是在本地端)，就去讀 appsettings.json
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// 步驟 C: 註冊資料庫服務
builder.Services.AddDbContext<AppDbContext>(options =>
{
    // 如果有成功抓到連線字串 (不管是雲端還是本地)，就用 MySQL/TiDB
    if (!string.IsNullOrEmpty(connectionString))
    {
        options.UseMySql(
            connectionString,
            ServerVersion.AutoDetect(connectionString)
        );
    }
    else
    {
        // 萬一兩邊都沒設定 (防呆)，才退回使用記憶體資料庫
        options.UseInMemoryDatabase("FallbackDb");
    }
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
        policy
            .SetIsOriginAllowed(origin =>
            {
                // 1. 允許本地開發
                if (origin == "http://localhost:3000") return true;
                if (origin.EndsWith(".vercel.app")) return true;

                return false;
            })
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials() // 如果未來有要做登入，這行通常需要
    );
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // 確保資料庫已建立 (如果您之後想改用正規 Migration，這裡改成 db.Database.Migrate();)
    db.Database.EnsureCreated();
}

// 開發環境啟用 Swagger (建議 Render 上也可以開，方便除錯)
// 把 if 拿掉就可以在 Render 上看到 Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();

// 順序很重要：先 CORS -> 再 Auth -> 再 Controllers
app.UseCors("AllowNextJs");
app.UseAuthorization();
app.MapControllers();

app.Run();