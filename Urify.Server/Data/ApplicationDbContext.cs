using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Urify.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Building> Buildings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            foreach (var entity in builder.Model.GetEntityTypes())
            {
                // Manter o nome da tabela como está
                entity.SetTableName(entity.GetTableName());
                
                foreach (var property in entity.GetProperties())
                {
                    // Manter o nome da coluna como está
                    property.SetColumnName(property.GetColumnName());
                }
            }

            // Definir o esquema padrão para "public"
            builder.HasDefaultSchema("public");

            // Configurar relacionamentos e restrições de exclusão
            builder.Entity<Ticket>()
        .HasOne(t => t.User)
        .WithMany()
        .HasForeignKey(t => t.UserId)
        .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Ticket>()
                .HasOne(t => t.TheBuilding)
                .WithMany(b => b.Tickets)
                .HasForeignKey(t => t.BuildingId)
                .HasConstraintName("FK_Ticket_To_Building_BuildingId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Ticket>()
                .HasOne(t => t.Worker)
                .WithMany()
                .HasForeignKey(t => t.WorkerId)
                .OnDelete(DeleteBehavior.Restrict);

        builder.Seed();
        }
    }
}