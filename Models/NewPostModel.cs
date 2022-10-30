namespace MediumEditor.Web.Models
{
    public class NewPostModel
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public IFormFile File {get;set;}
    }
}
