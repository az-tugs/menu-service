using backend.Repositories;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Endpoints
{
    public static class VariantTypesEndpoints
    {
        public static void MapVariantTypesEndpoints(this IEndpointRouteBuilder app)
        {
            var variantTypes = app.MapGroup("/api/variant-types");

            variantTypes.RequireCors("AllowReact");

            // GET ALL
            variantTypes.MapGet("/", async (VariantTypeRepository repo) =>
                Results.Ok(await repo.GetAllVariantTypesAsync())
            );

            // GET BY ID
            variantTypes.MapGet("/{id}", async (int id, VariantTypeRepository repo) =>
            {
                var variantType = await repo.GetVariantTypeByIdAsync(id);
                return variantType is null ? Results.NotFound() : Results.Ok(variantType);
            });

            // CREATE
            variantTypes.MapPost("/", async (VariantType variantType, VariantTypeRepository repo) =>
            {
                await repo.CreateVariantTypeAsync(variantType);
                return Results.Created($"/api/variant-types/{variantType.Variant_Type_Id}", variantType);
            });

            // UPDATE
            variantTypes.MapPut("/{id}", async (int id, VariantType variantType, VariantTypeRepository repo) =>
            {
                variantType.Variant_Type_Id = id;

                await repo.UpdateVariantTypeAsync(variantType);
                return Results.NoContent();
            });

            // DELETE  
            variantTypes.MapDelete("/{id}", async (int id, VariantTypeRepository repo) =>
            {
                await repo.DeleteVariantTypeAsync(id);
                return Results.NoContent();
            });
        }
    }
}
