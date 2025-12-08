using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<MenuItem> MenuItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MenuItem>(entity =>
            {
                entity.Property(e => e.Menu_Item_Id).ValueGeneratedOnAdd();
                entity.Property(e => e.MenuName).IsRequired();
                entity.Property(e => e.Is_available).HasDefaultValue(true);
            });
        }
    
    }
}

