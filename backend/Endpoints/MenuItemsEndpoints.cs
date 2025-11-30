using Microsoft.EntityFrameworkCore;

public static class MenuItemsEndpoints
{
    public static void MapMenuItemsEndpoints(this IEndpointRouteBuilder app)
    {
        RouteGroupBuilder menuItems = app.MapGroup("/api/menu-items")
            .RequireCors("AllowReact");

        menuItems.MapGet("/", GetAllMenuItems);
        menuItems.MapGet("/available", GetAvailableMenuItems);
        menuItems.MapGet("/{id}", GetMenuItem);
        menuItems.MapPost("/", CreateMenuItem);
        menuItems.MapPut("/{id}", UpdateMenuItem);
        menuItems.MapDelete("/{id}", DeleteMenuItem);

        static async Task<IResult> GetAllMenuItems(MenuDb db)
        {
            return TypedResults.Ok(await db.MenuItems.ToListAsync());
        }
            
        static async Task<IResult> GetAvailableMenuItems(MenuDb db)
        {
            return TypedResults.Ok(await db.MenuItems.Where(t => t.IsAvailable)
                .ToListAsync());
        }

        static async Task<IResult> GetMenuItem(int id, MenuDb db)
        {
            return await db.MenuItems.FindAsync(id)
                is MenuItem menuitem
                    ? TypedResults.Ok(menuitem)
                    : TypedResults.NotFound();
        }
            
        static async Task<IResult> CreateMenuItem(MenuItem menuitem, MenuDb db)
        {
            db.MenuItems.Add(menuitem);
            await db.SaveChangesAsync();

            return TypedResults.Created($"/{menuitem.Id}", menuitem);
        }

        static async Task<IResult> UpdateMenuItem(int id, MenuItem menuItem, MenuDb db)
        {
            var menuitem = await db.MenuItems.FindAsync(id);

            if (menuitem is null) return Results.NotFound();

            menuitem.Name = menuItem.Name;
            menuitem.IsAvailable = menuItem.IsAvailable;

            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }

        static async Task<IResult> DeleteMenuItem(int id, MenuDb db)
        {
            if (await db.MenuItems.FindAsync(id) is MenuItem menuitem)
            {
                db.MenuItems.Remove(menuitem);
                await db.SaveChangesAsync();
                return TypedResults.NoContent();
            }

            return TypedResults.NotFound();
        }
    }
}
