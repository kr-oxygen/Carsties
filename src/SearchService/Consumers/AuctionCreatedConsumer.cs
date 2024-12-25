using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer(IMapper mapper) : IConsumer<AuctionCreated>
{
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("--> Consuming auction created: " + context.Message.Id);

        var item = mapper.Map<Item>(context.Message);

        if (item.Model == "Foo")
        {
            throw new ArgumentException("Cannot sell cars with name of Foo");
        }

        await item.SaveAsync();
    }
}

public class AuctionUpdatedConsumer(IMapper mapper) : IConsumer<AuctionUpdated>
{
    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("--> Consuming auction updated: " + context.Message.Id);

        var item = mapper.Map<Item>(context.Message);

        if (item.Model == "Foo")
        {
            throw new ArgumentException("Cannot sell cars with name of Foo");
        }

        var result = await DB.Update<Item>()
            .MatchID(item.ID)
            .ModifyOnly(x => new
            {
                x.Make,
                x.Model,
                x.Year,
                x.Color,
                x.Mileage
            }, item)
            .ExecuteAsync();

        if (!result.IsAcknowledged)
        {
            throw new MessageException(typeof(AuctionUpdated), "Problem updating mongoDb");
        }
    }
}

public class AuctionDeletedConsumer(IMapper mapper) : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        Console.WriteLine("--> Consuming auction deleted: " + context.Message.Id);

        var item = mapper.Map<Item>(context.Message);

        var result = await item.DeleteAsync();

        if (!result.IsAcknowledged)
        {
            throw new MessageException(typeof(AuctionDeleted), "Problem deleting mongoDb");
        }
    }
}