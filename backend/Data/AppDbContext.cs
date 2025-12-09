using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<VariantType> VariantTypes { get; set; }
        public DbSet<ItemVariant_Price> ItemVariant_Prices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MenuItem>(entity =>
            {
                entity.ToTable("MenuItems");
                entity.Property(e => e.Menu_Item_Id).ValueGeneratedOnAdd();
                entity.Property(e => e.MenuName).IsRequired();
                entity.Property(e => e.Is_available).HasDefaultValue(true);
            });

            modelBuilder.Entity<VariantType>(entity =>
            {
                entity.ToTable("VariantTypes");
                entity.Property(e => e.Variant_Type_Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<ItemVariant_Price>(entity =>
            {
                entity.ToTable("ItemVariant_Prices");
                entity.Property(e => e.Item_Variant_Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                
                entity.HasOne(e => e.MenuItem)
                      .WithMany()
                      .HasForeignKey(e => e.Menu_Item_Id)
                      .HasConstraintName("FK_ItemVariant_Prices_MenuItems_Menu_Item_Id")
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.VariantType)
                      .WithMany(v => v.ItemVariantPrices)
                      .HasForeignKey(e => e.Variant_Type_Id)
                      .HasConstraintName("FK_ItemVariant_Prices_VariantTypes_Variant_Type_Id")
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    
    }
}

