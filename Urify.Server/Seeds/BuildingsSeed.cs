using Microsoft.EntityFrameworkCore;

namespace Urify.Server.Data
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Building>().HasData(
                new Building { BuildingId = 1, Name = "Salas de Aula" },
                new Building { BuildingId = 2, Name = "Cantina Uri" },
                new Building { BuildingId = 3, Name = "Clínica de Psicologia Farmácia Escola" },
                new Building { BuildingId = 4, Name = "Clínica Veterinária" },
                new Building { BuildingId = 5, Name = "Lab. Computação" },
                new Building { BuildingId = 6, Name = "Salas de Aula" },
                new Building { BuildingId = 7, Name = "Lab. Química e Lab. Águas" },
                new Building { BuildingId = 8, Name = "Lab. Informática e NTI" },
                new Building { BuildingId = 9, Name = "Salas de Aula" },
                new Building { BuildingId = 10, Name = "Biblioteca" },
                new Building { BuildingId = 11, Name = "Lab. Engenharias" },
                new Building { BuildingId = 12, Name = "Lab. Engenharias" },
                new Building { BuildingId = 13, Name = "Lab. Sáude e Auditorio" },
                new Building { BuildingId = 14, Name = "Escola da Uri Cantina" },
                new Building { BuildingId = 15, Name = "Lab. Engenharias" },
                new Building { BuildingId = 16, Name = "Lab. Anatomia humana e Lab. Anatomia Animal" },
                new Building { BuildingId = 17, Name = "Salas de Aula" },
                new Building { BuildingId = 19, Name = "Ginásio de Esportes 1" },
                new Building { BuildingId = 20, Name = "Centro Administrativo, Salas de Aula e Ateliê de Arquitetura" },
                new Building { BuildingId = 21, Name = "Quiosque" },
                new Building { BuildingId = 22, Name = "Lab. Mecânica" },
                new Building { BuildingId = 23, Name = "Gerador" },
                new Building { BuildingId = 24, Name = "Lab. Eng. Elétrica" },
                new Building { BuildingId = 25, Name = "Ginásio de Esportes 2" },
                new Building { BuildingId = 26, Name = "Almoxarifado de Química" },
                new Building { BuildingId = 27, Name = "Salas de Aula" },
                new Building { BuildingId = 28, Name = "Tecnouri Auditório" },
                new Building { BuildingId = 29, Name = "Lab. Agronomia" },
                new Building { BuildingId = 30, Name = "Container de Agronomia" },
                new Building { BuildingId = 31, Name = "Agroestufa" }
            );
        }
    }
}
