
namespace Urify.Server.Data
{

    public class UserDto
    {
        public string Id { get; set; }

        public string UserName { get; set; }
    }

    public class ApproveUserDto
    {
        public bool Approved { get; set; }
    }

}