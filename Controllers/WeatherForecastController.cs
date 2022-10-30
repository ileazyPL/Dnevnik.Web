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
        Dnevnikofmy[] str = new Dnevnikofmy[c.Length / 3];
        for (int i = 0; i < str.Length; i++)
        {
            str[i] = new Dnevnikofmy();
            str[i].Date = c[i * 3];
            str[i].Title = c[i * 3 + 1];
            str[i].Text = c[i * 3 + 2];
            str[i].Summary = Summaries[Random.Shared.Next(Summaries.Length)];

        }
        return str;
    }
}
