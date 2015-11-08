// *************************************************
// MMG.Utils.TWPM.HelperSPA.RouteConfig.cs
// Last Modified: 11/08/2015 1:28 AM
// Modified By: Bustamante, Diego (bustamd1)
// *************************************************

namespace MMG.Utils.TWPM.HelperSPA
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class RouteConfig
    {
        public static void InitializeRoutes(RouteCollection pRoutes)
        {
            pRoutes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            
            pRoutes.MapMvcAttributeRoutes();
        }
    }
}