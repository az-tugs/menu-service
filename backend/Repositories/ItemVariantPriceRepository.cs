using backend.Data;
using backend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ItemVariantPriceRepository
    {
        private readonly AppDbContext _context;

        public ItemVariantPriceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ItemVariant_Price>> GetAllItemVariantPricesAsync()
        {
            var sql = "SELECT * FROM ItemVariant_Prices";
            return await _context.ItemVariant_Prices.FromSqlRaw(sql).ToListAsync();
        }

        public async Task<ItemVariant_Price?> GetItemVariantPriceByIdAsync(int id)
        {
            var sql = "SELECT * FROM ItemVariant_Prices WHERE Item_Variant_Id = @Id";
            return await _context.ItemVariant_Prices.FromSqlRaw(sql, new SqlParameter("@Id", id)).FirstOrDefaultAsync();
        }

        public async Task CreateItemVariantPriceAsync(ItemVariant_Price itemVariantPrice)
        {
            var sql = "INSERT INTO ItemVariant_Prices (Menu_Item_Id, Variant_Type_Id, Price) VALUES (@MenuItemId, @VariantTypeId, @Price)";
            await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@MenuItemId", itemVariantPrice.Menu_Item_Id),
                new SqlParameter("@VariantTypeId", itemVariantPrice.Variant_Type_Id),
                new SqlParameter("@Price", itemVariantPrice.Price)
            );
        }
        // CRUD in Variant Type
        public async Task UpdateItemVariantPriceAsync(ItemVariant_Price itemVariantPrice)
        {
            var sql = "UPDATE ItemVariant_Prices SET Menu_Item_Id = @MenuItemId, Variant_Type_Id = @VariantTypeId, Price = @Price WHERE Item_Variant_Id = @Id";
            await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@Id", itemVariantPrice.Item_Variant_Id),
                new SqlParameter("@MenuItemId", itemVariantPrice.Menu_Item_Id),
                new SqlParameter("@VariantTypeId", itemVariantPrice.Variant_Type_Id),
                new SqlParameter("@Price", itemVariantPrice.Price)
            );
        }

        public async Task DeleteItemVariantPriceAsync(int id)
        {
            var sql = "DELETE FROM ItemVariant_Prices WHERE Item_Variant_Id = @Id";
            await _context.Database.ExecuteSqlRawAsync(sql, new SqlParameter("@Id", id));
        }
    }
}
