// *************************************************
// MMG.Utils.TWPM.HelperSPA.Global.asax.cs
// Last Modified: 11/08/2015 1:26 AM
// Modified By: Bustamante, Diego (bustamd1)
// *************************************************

namespace MMG.Utils.TWPM.HelperSPA
{
    using System;
    using System.Web;
    using System.Web.Routing;

    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            RouteConfig.InitializeRoutes(RouteTable.Routes);
        }

        protected void Session_Start(object sender, EventArgs e) {}

        protected void Application_BeginRequest(object sender, EventArgs e) {}

        protected void Application_AuthenticateRequest(object sender, EventArgs e) {}

        protected void Application_Error(object sender, EventArgs e) {}

        protected void Session_End(object sender, EventArgs e) {}

        protected void Application_End(object sender, EventArgs e) {}
    }
}