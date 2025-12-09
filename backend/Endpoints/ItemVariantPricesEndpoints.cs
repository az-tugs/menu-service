using backend.Repositories;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Endpoints
{
    public static class ItemVariantPricesEndpoints
    {
        public static void MapItemVariantPricesEndpoints(this IEndpointRouteBuilder app)
        {
            var itemVariantPrices = app.MapGroup("/api/item-variant-prices");

            itemVariantPrices.RequireCors("AllowReact");

            // GET ALL
            itemVariantPrices.MapGet("/", async (ItemVariantPriceRepository repo) =>
                Results.Ok(await repo.GetAllItemVariantPricesAsync())
            );

            // GET BY ID
            itemVariantPrices.MapGet("/{id}", async (int id, ItemVariantPriceRepository repo) =>
            {
                var itemVariantPrice = await repo.GetItemVariantPriceByIdAsync(id);
                return itemVariantPrice is null ? Results.NotFound() : Results.Ok(itemVariantPrice);
            });

            // CREATE
            itemVariantPrices.MapPost("/", async (ItemVariant_Price itemVariantPrice, ItemVariantPriceRepository repo) =>
            {
                await repo.CreateItemVariantPriceAsync(itemVariantPrice);
                return Results.Created($"/api/item-variant-prices/{itemVariantPrice.Item_Variant_Id}", itemVariantPrice);
            });

            // UPDATE
            itemVariantPrices.MapPut("/{id}", async (int id, ItemVariant_Price itemVariantPrice, ItemVariantPriceRepository repo) =>
            {
                itemVariantPrice.Item_Variant_Id = id;

                await repo.UpdateItemVariantPriceAsync(itemVariantPrice);
                return Results.NoContent();
            });

            // DELETE  
            itemVariantPrices.MapDelete("/{id}", async (int id, ItemVariantPriceRepository repo) =>
            {
                await repo.DeleteItemVariantPriceAsync(id);
                return Results.NoContent();
            });
        }
    }
}
