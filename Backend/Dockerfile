# 1. 建置階段 (Build Stage)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 複製 csproj 並還原依賴 (Restore)
# 注意：如果您的專案檔名不是 Portfolio.csproj，請修改這裡
COPY ["Backend.csproj", "./"]
RUN dotnet restore

# 複製其餘程式碼並編譯 (Publish)
COPY . .
RUN dotnet publish -c Release -o /app/publish

# 2. 執行階段 (Runtime Stage)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# 設定 Render 要求的 Port 環境變數
# Render 預設會給一個 PORT 變數，但我們在容器內統一開 8080 比較簡單
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# 啟動應用程式
# ★★★ 重要：請將 YourProjectName.dll 改成您實際編譯出的 dll 檔名 ★★★
# (通常跟您的 csproj 檔名一樣)
ENTRYPOINT ["dotnet", "Backend.dll"]