using backend.Data;
using backend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class VariantTypeRepository
    {
        private readonly AppDbContext _context;

        public VariantTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<VariantType>> GetAllVariantTypesAsync()
        {
            var sql = "SELECT * FROM VariantTypes";
            return await _context.VariantTypes.FromSqlRaw(sql).ToListAsync();
        }

        public async Task<VariantType?> GetVariantTypeByIdAsync(int id)
        {
            var sql = "SELECT * FROM VariantTypes WHERE Variant_Type_Id = @Id";
            return await _context.VariantTypes.FromSqlRaw(sql, new SqlParameter("@Id", id)).FirstOrDefaultAsync();
        }

        public async Task CreateVariantTypeAsync(VariantType variantType)
        {
            var sql = "INSERT INTO VariantTypes (Name) VALUES (@Name)";
            await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@Name", variantType.Name)
            );
        }

        public async Task UpdateVariantTypeAsync(VariantType variantType)
        {
            var sql = "UPDATE VariantTypes SET Name = @Name WHERE Variant_Type_Id = @Id";
            await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@Id", variantType.Variant_Type_Id),
                new SqlParameter("@Name", variantType.Name)
            );
        }

        public async Task DeleteVariantTypeAsync(int id)
        {
            var sql = "DELETE FROM VariantTypes WHERE Variant_Type_Id = @Id";
            await _context.Database.ExecuteSqlRawAsync(sql, new SqlParameter("@Id", id));
        }
    }
}
