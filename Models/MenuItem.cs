using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MenuItem
    {
        [Key]
        public int Menu_Item_Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string MenuName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string SubCategory { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Img_Url { get; set; } = string.Empty;

        [Required]
        public bool Is_available { get; set; } = true;
    }
}
