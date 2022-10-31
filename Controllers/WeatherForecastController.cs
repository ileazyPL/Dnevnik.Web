using Microsoft.AspNetCore.Mvc;

namespace MediumEditor.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet] // IActionResult
    public IEnumerable<Dnevnikofmy> Get()
    {
        string a = System.IO.File.ReadAllText("Content.txt");
        var c = a.Split("\r\n#$#");
        Dnevnikofmy[] str = new Dnevnikofmy[c.Length / 5];
        for (int i = 0; i < str.Length; i++)
        {
            str[i] = new Dnevnikofmy();
            str[i].Date = c[i * 5];
            str[i].nickname = c[i * 5 + 1]; 
            str[i].password = c[i * 5 + 2];
            str[i].Title = c[i * 5 + 3];
            str[i].Text = c[i * 5 + 4];

        }
        return str;
    }
    [HttpPost] // IActionResult
    public IEnumerable<Dnevnikofmy> Post([FromForm] RegModel newPost)
    {
        string a = System.IO.File.ReadAllText("Content.txt");
        var c = a.Split("\r\n#$#");
        Dnevnikofmy[] str = new Dnevnikofmy[c.Length / 5];
        int count = 0;
        for (int i = 0; i < str.Length; i++)
        {
            if (newPost.nickname == c[i * 5 + 1] && newPost.password == c[i * 5 + 2])
            {
                str[count] = new Dnevnikofmy();
                str[count].Date = c[i * 5];
                str[count].nickname = c[i * 5 + 1];
                str[count].password = c[i * 5 + 2];
                str[count].Title = c[i * 5 + 3];
                str[count].Text = c[i * 5 + 4];
                count++;
            }
        }
        Array.Resize(ref str, count);
        return str;
    }
}