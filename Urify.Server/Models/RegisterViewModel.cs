using System.ComponentModel.DataAnnotations;

namespace Urify.Server.Data
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O Email fornecido não é válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "O campo Sobrenome é obrigatório.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "O tipo de Usuário é obrigatório")]
        public int UserType { get; set; }
    }

}
