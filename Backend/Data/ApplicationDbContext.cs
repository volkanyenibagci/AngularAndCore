using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Todo> Todos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed some initial data with fixed dates instead of dynamic values
        modelBuilder.Entity<Todo>().HasData(
            new Todo
            {
                Id = 1,
                Title = "Learn Angular",
                IsCompleted = true,
                CreatedAt = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new Todo
            {
                Id = 2,
                Title = "Learn .NET Core",
                IsCompleted = true,
                CreatedAt = new DateTime(2023, 1, 2, 0, 0, 0, DateTimeKind.Utc)
            },
            new Todo
            {
                Id = 3,
                Title = "Build a full-stack application",
                IsCompleted = false,
                CreatedAt = new DateTime(2023, 1, 3, 0, 0, 0, DateTimeKind.Utc)
            }
        );
    }
} 