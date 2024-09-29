using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Entities;

[Table("Items")]
public class Item : BaseEntity
{
    public string Make { get; set; }
    
    public string Model { get; set; }

    public int Year { get; set; }

    public string Color { get; set; }
    
    public int Mileage { get; set; }
    
    public string ImageUrl { get; set; }
    
    //nav properties
    public Auction Auction { get; set; }

    public Guid AuctionId { get; set; }
}