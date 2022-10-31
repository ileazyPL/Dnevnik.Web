namespace MediumEditor.Web.Models
{
    public class NewPostModel
    {
        public string nickname { get; set; }
        public string password { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public IFormFile File {get;set;}
    }
}
