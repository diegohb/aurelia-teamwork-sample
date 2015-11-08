// *************************************************
// MMG.Utils.TWPM.HelperSPA.TasksController.cs
// Last Modified: 11/08/2015 1:03 AM
// Modified By: Bustamante, Diego (bustamd1)
// *************************************************

namespace MMG.Utils.TWPM.HelperSPA
{
    using System.Web.Mvc;

    [Route("Tasks")]
    public class TasksController : Controller
    {
        
        // GET: Tasks
        [Route("", Name="Default")]
        public ActionResult Index()
        {
            return View();
        }
    }
}