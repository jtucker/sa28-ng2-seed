using Microsoft.AspNet.Mvc;

namespace Ng2AspNetCore.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
