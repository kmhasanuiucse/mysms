﻿using System.ComponentModel.DataAnnotations;

namespace DotNetForever.Model.Model
{
    public class Product
    {
        public int Id { set; get; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int ReorderLevel { get; set; }
        [Required]
        public string Description { get; set; }
        public virtual Category Category {get; set; }
    }
}
