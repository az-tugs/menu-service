using backend.Data;
using backend.Endpoints;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<MenuItemRepository>();

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "MenuAPI";
    config.Title = "MenuAPI v1";
    config.Version = "v1";
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.WebHost.UseUrls("http://localhost:5201");

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.DocumentTitle = "MenuAPI";
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MenuAPI v1");
        c.RoutePrefix = "swagger";
    });
}

// FIX: correct CORS policy name
app.UseCors("AllowReact");


app.MapMenuItemsEndpoints();

app.Run();
