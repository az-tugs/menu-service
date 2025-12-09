using backend.Data;
using backend.Endpoints;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<MenuItemRepository>();// DI or Dependency Injection
builder.Services.AddScoped<VariantTypeRepository>();
builder.Services.AddScoped<ItemVariantPriceRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "MenuAPI";
    config.Title = "MenuAPI v1";
    config.Version = "v1";
});

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
app.UseCors("AllowReact");


app.MapMenuItemsEndpoints();
app.MapVariantTypesEndpoints();
app.MapItemVariantPricesEndpoints();

app.Run();
