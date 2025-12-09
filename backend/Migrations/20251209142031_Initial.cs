using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VariantTypes",
                columns: table => new
                {
                    Variant_Type_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VariantTypes", x => x.Variant_Type_Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemVariant_Prices",
                columns: table => new
                {
                    Item_Variant_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Menu_Item_Id = table.Column<int>(type: "int", nullable: false),
                    Variant_Type_Id = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemVariant_Prices", x => x.Item_Variant_Id);
                    table.ForeignKey(
                        name: "FK_ItemVariant_Prices_MenuItems_Menu_Item_Id",
                        column: x => x.Menu_Item_Id,
                        principalTable: "MenuItems",
                        principalColumn: "Menu_Item_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemVariant_Prices_VariantTypes_Variant_Type_Id",
                        column: x => x.Variant_Type_Id,
                        principalTable: "VariantTypes",
                        principalColumn: "Variant_Type_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemVariant_Prices_Menu_Item_Id",
                table: "ItemVariant_Prices",
                column: "Menu_Item_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ItemVariant_Prices_Variant_Type_Id",
                table: "ItemVariant_Prices",
                column: "Variant_Type_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemVariant_Prices");

            migrationBuilder.DropTable(
                name: "VariantTypes");
        }
    }
}
