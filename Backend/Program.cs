using Microsoft.EntityFrameworkCore;
using Backend.Data; // 確認這裡引用的 Namespace 對應到你的資料庫檔案

var builder = WebApplication.CreateBuilder(args);

// --- 1. 設定 CORS (允許 Next.js 連線) ---
// 這裡之後要把您的 Vercel 網址補上去
var vercelUrl = "https://your-portfolio.vercel.app"; 

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs",
        policy => policy.WithOrigins(
                        "http://localhost:3000", // 本地開發
                        vercelUrl                // Vercel 正式站 (之後記得改)
                    ) 
                    .AllowAnyMethod()
                    .AllowAnyHeader());
});

// --- 2. 設定資料庫 (改用 InMemory) ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("PortfolioDb"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 4. 自動建立資料庫 ---
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseCors("AllowNextJs");
app.UseAuthorization();
app.MapControllers();

app.Run();