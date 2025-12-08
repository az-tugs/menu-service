using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;



namespace backend.Repositories
{

    public class MenuItemRepository
    {
        private readonly AppDbContext _context;

        public MenuItemRepository(AppDbContext context)
        {
            _context = context;
        }
        //create
        public async Task CreateMenuItemAsync(MenuItem menuItem)
        {
            var sql = "INSERT INTO MenuItems (MenuName, Description, Category, SubCategory, Img_Url, Is_available) " +
                      "VALUES (@MenuName, @Description, @Category, @SubCategory, @Img_Url, @Is_available)";

            await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@MenuName", menuItem.MenuName),
                new SqlParameter("@Description", menuItem.Description),
                new SqlParameter("@Category", menuItem.Category),
                new SqlParameter("@SubCategory", menuItem.SubCategory),
                new SqlParameter("@Img_Url", menuItem.Img_Url),
                new SqlParameter("@Is_available", menuItem.Is_available)
            );
        }

        public async Task<List<MenuItem>> GetAllMenuItemsAsync()
        {
            var sql = "SELECT * FROM MenuItems WHERE Is_available = 1"; //fetch only the avail items
            return await _context.MenuItems.FromSqlRaw(sql).ToListAsync();
        }

        public async Task<MenuItem?> GetMenuItemByIdAsync(int id)
        {
            var sql = "SELECT * FROM MenuItems WHERE Menu_Item_Id = @Id";
            return await _context.MenuItems.FromSqlRaw(sql, new SqlParameter("@Id", id)).FirstOrDefaultAsync();
        }
        //update
        public async Task UpdateMenuItemAsync(MenuItem menuItem)
        {
            var sql = "UPDATE MenuItems SET MenuName = @MenuName, Description = @Description, " +
                      "Category = @Category, SubCategory = @SubCategory, Img_Url = @Img_Url, " +
                      "Is_available = @Is_available WHERE Menu_Item_Id = @Id";

            await _context.Database.ExecuteSqlRawAsync(sql,
                new SqlParameter("@Id", menuItem.Menu_Item_Id),
                new SqlParameter("@MenuName", menuItem.MenuName),
                new SqlParameter("@Description", menuItem.Description),
                new SqlParameter("@Category", menuItem.Category),
                new SqlParameter("@SubCategory", menuItem.SubCategory),
                new SqlParameter("@Img_Url", menuItem.Img_Url),
                new SqlParameter("@Is_available", menuItem.Is_available)
            );
        }
        //delete
        public async Task DeleteMenuItemAsync(int id)
        {
            var sql = "DELETE FROM MenuItems WHERE Menu_Item_Id = @Id";
            await _context.Database.ExecuteSqlRawAsync(sql, new SqlParameter("@Id", id));
        }
    }
}
