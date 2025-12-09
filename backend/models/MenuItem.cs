using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MenuItem
    {
        [Key]
        public int Menu_Item_Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string MenuName { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string Category { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string SubCategory { get; set; } = null!;

        [Required]
        [MaxLength(200)]
        public string Img_Url { get; set; } = null!;

        [Required]
        public bool Is_available { get; set; } = true;
    }
}
