define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.min.css\"></require><require from=\"/styles/bt-custom-theme.css\"></require><require from=\"font-awesome/css/font-awesome.css\"></require><require from=\"./nav-bar.html\"></require><nav-bar router.bind=\"router\"></nav-bar><div class=\"page-host container\"><router-view></router-view></div></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"><span class=\"sr-only\">Toggle Navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\"><i class=\"fa fa-home\"></i> <span>${router.title}</span></a></div><div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"loader\" if.bind=\"router.isNavigating\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i></li></ul></div></nav></template>"; });
define('text!modules/account/login.html', ['module'], function(module) { module.exports = "<template><div show.bind=\"!IsAuthenticated\" class=\"row\"><div class=\"col-sm-12\"><form role=\"form\" submit.delegate=\"login()\"><fieldset><legend>TeamworkPM Authenticate</legend><div class=\"form-group ${hasLoginError ? 'has-error has-feedback' : ''}\"><label for=\"apiTokenInput\">API Token</label><input id=\"apiTokenInput\" type=\"text\" value.bind=\"apiToken\" class=\"form-control\" placeholder=\"e.g. summer50now\" aria-describedby=\"ApiTokenHelp\"> <span if.bind=\"hasLoginError\" class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\"></span><p id=\"ApiTokenHelp\" class=\"help-block\">See <a href=\"http://support.teamwork.com/projects/desktop-timer-131/where-do-i-find-my-api-key\" target=\"_blank\">instructions here</a> to get your API token from TeamworkPM.</p></div><button type=\"submit\" class=\"btn btn-primary\">Submit</button></fieldset></form></div></div><div if.bind=\"IsAuthenticated\" class=\"row\"><div class=\"col-sm-12\"><div class=\"alert alert-success\" role=\"alert\"><h2>Welcome ${UserDisplayName}!</h2><p><img class=\"img-responsive\" src.one-time=\"UserImageURL\" alt=\"user avatar image\"></p><p>&nbsp;</p><p>Check out your TeamworkPM tasks using the navigation menu above.</p><p>&nbsp;</p><button type=\"button\" click.delegate=\"logout()\" class=\"btn btn-danger\">Logout</button></div></div></div></template>"; });