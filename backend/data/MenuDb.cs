using Microsoft.EntityFrameworkCore;

class MenuDb : DbContext
{
    public MenuDb(DbContextOptions<MenuDb> options)
        : base(options) { }

    public DbSet<MenuItem> MenuItems => Set<MenuItem>();
}