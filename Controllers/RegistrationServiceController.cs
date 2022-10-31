using Microsoft.AspNetCore.Mvc;

namespace MediumEditor.Web.Controllers
{
    public class RegModel
    {
        public string nickname { get; set; }
        public string password { get; set; }
        public string confirmationpassword { get; set; }
        public string token { get; set; }
        public string date { get; set; }
    }
    [ApiController]
    [Route("[controller]")]
    public class RegistrationServiceController : ControllerBase
    {
        [HttpPost]
        public string Post([FromForm] RegModel newPost)
        {
            var spisok = Get();
            if (newPost.token == null && newPost.confirmationpassword == null)// вход в аккаунт (без подв. пароля и ввода токена )
            {
                foreach(var pole in spisok)
                {
                    if(newPost.nickname == pole.nickname && newPost.password == pole.password)
                    {
                        return ":)";
                    }
                }
                return ":(";
            }
            else // когда мы вводим все поля (регистрация)
            {
                foreach (var pole in spisok)
                {
                    if (newPost.nickname == pole.nickname)
                    {
                        return ":(";
                    }
                }
                System.IO.File.AppendAllText("Registration.txt", DateTime.Now + "\r\n#$#" + newPost.nickname + "\r\n#$#" + newPost.password + "\r\n#$#" + newPost.token + "\r\n#$#");
                return ":)";
            }
        }

        [HttpGet] // IActionResult
        public IEnumerable<RegModel> Get()
        {
            string a = System.IO.File.ReadAllText("Registration.txt");
            var c = a.Split("\r\n#$#");
            RegModel[] str = new RegModel[c.Length / 4];
            for (int i = 0; i < str.Length; i++)
            {
                str[i] = new RegModel();
                str[i].date = c[i * 4];
                str[i].nickname = c[i * 4 + 1];
                str[i].password = c[i * 4 + 2];
                str[i].token = c[i * 4 + 3];
            }
            return str;
        }
    }
}
// c:   0 1 2 3 / 4 5 6 7 / 8 9 10 11 / 12 ...
//str[]:0         1         2           3 