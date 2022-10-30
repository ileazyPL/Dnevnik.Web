using Medium;
using Medium.Authentication;
using Medium.Models;
using MediumEditor.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace MediumEditor.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediumServiceController : ControllerBase
    {
        private readonly Client _mediumClient;
        private readonly Token _mediumToken;
        private readonly IWebHostEnvironment _appEnvironment;

        public MediumServiceController(IConfiguration configuration, IWebHostEnvironment appEnvironment)
        {
            _mediumClient = new Client();
            _mediumToken = new Token
            {
                AccessToken = configuration.GetValue<string>("MediumAccessToken")
            };
            _appEnvironment = appEnvironment;
        }

        // HTTP 1.1 GET /mediumservice?key=value
        [HttpGet]
        public User Get()
        {
            return _mediumClient.GetCurrentUser(_mediumToken);
        }
        // 200 OK HTTP 1.1
        // { "name": "username" }

        // HTTP 1.1 POST /mediumservice
        [HttpPost]
        public async Task<string> Post([FromForm] NewPostModel newPost)
        {
            System.IO.File.AppendAllText("Content.txt", DateTime.Now + "\r\n#$#" + newPost.Title + "\r\n#$#" + newPost.Text + "\r\n#$#");

            //var text = string.Empty;
            //if (newPost.File != null)
            //{
            //    using (var memoryStream = new MemoryStream())
            //    {

            //        await newPost.File.CopyToAsync(memoryStream);

            //        var image = _mediumClient.UploadImage(
            //            new UploadImageRequestBody
            //            {
            //                ContentBytes = memoryStream.ToArray(),
            //                ContentType = newPost.File.ContentType
            //            }, 
            //            _mediumToken);

            //        text += $"![{newPost.File.FileName}]({image.Url})\n";
            //    }
            //}

            //// Get profile details of the user identified by the access token.
            //var user = _mediumClient.GetCurrentUser(_mediumToken);

            //// Create a draft post.
            //var post = _mediumClient.CreatePost(
            //    user.Id,
            //    new CreatePostRequestBody
            //    {
            //        Title = newPost.Title,
            //        ContentFormat = Medium.Models.ContentFormat.Markdown,
            //        Content = text + newPost.Text,
            //        PublishStatus = Medium.Models.PublishStatus.Public
            //    },
            //    _mediumToken);

            /*
             * {
                  "title": newPost.Title,
                  "contentFormat": "markdown",
                  "content": newPost.Text,
                  "publishStatus": "public"
                }
             */

            //return post.Url;
            return "";
        }

        // HTTP 1.1 POST /mediumservice/upload
        [HttpPost]
        [Route("upload")]
        public string Upload()
        {
            // try {}
            // finally {stream.Dispose()}

            //using (Stream stream = Request.Form.Files[0].OpenReadStream())
            //{                
            //    return stream.Length.ToString();
            //}

            // ->
            return "";
        }

        // HTTP 1.1 POST /mediumservice/upload2
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Upload2(IFormFile file)
        {
            if (file != null)
            {
                string path = Path.Combine(_appEnvironment.ContentRootPath, "Files");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                using (var fileStream = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                return Redirect(Url.Content($"~/Files/{file.FileName}"));
            }
            return BadRequest();
        }

        public class FileModel
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Path { get; set; }
        }        
    }
}
