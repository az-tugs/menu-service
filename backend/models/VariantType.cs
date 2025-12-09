using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class VariantType
    {
        [Key]
        public int Variant_Type_Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        // Navigation property
        public ICollection<ItemVariant_Price> ItemVariantPrices { get; set; } = new List<ItemVariant_Price>();
    }
}

