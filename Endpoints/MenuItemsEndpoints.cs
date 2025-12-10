using backend.Repositories;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Endpoints
{
    public static class MenuItemsEndpoints
    {
        public static void MapMenuItemsEndpoints(this IEndpointRouteBuilder app)
        {
            var menuItems = app.MapGroup("/api/menu-items");

            menuItems.RequireCors("AllowReact");

            // GET ALL
            menuItems.MapGet("/", async (MenuItemRepository repo) =>
                Results.Ok(await repo.GetAllMenuItemsAsync())
            );

            // GET BY ID
            menuItems.MapGet("/{id}", async (int id, MenuItemRepository repo) =>
            {
                var menuItem = await repo.GetMenuItemByIdAsync(id);
                return menuItem is null ? Results.NotFound() : Results.Ok(menuItem);
            });

            // CREATE
            menuItems.MapPost("/", async (MenuItem menuItem, MenuItemRepository repo) =>
            {
                await repo.CreateMenuItemAsync(menuItem);
                return Results.Created($"/api/menu-items/{menuItem.Menu_Item_Id}", menuItem);
            });

            // UPDATE
            menuItems.MapPut("/{id}", async (int id, MenuItem menuItem, MenuItemRepository repo) =>
            {
                menuItem.Menu_Item_Id = id;
                await repo.UpdateMenuItemAsync(menuItem);
                return Results.NoContent();
            });

            // DELETE  
            menuItems.MapDelete("/{id}", async (int id, MenuItemRepository repo) =>
            {
                await repo.DeleteMenuItemAsync(id);
                return Results.NoContent();
            });
        }
    }
}
