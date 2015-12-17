# aurelia-teamwork-sample
A prototype to demonstrate Aurelia (v1-beta) and communicating with external APIs for TeamworkPM.

## the problem
Sharing this in case anyone else is interested on a ground-up approach to a real, working SPA built using the latest version of Aurelia. 
The existing documentation and references available online begin with the starting point of the aurelia-skeleton project/codebase. 
I needed to be able to build something from scratch and go through the exercise of installing each module and package manually to learn and 
understand how they relate (or not) to each other.

Disclaimer - This is not intended to be authoritative information about how to implement an Aurelia app, for that I certainly defer 
to the Aurelia documentation and the great minds behind Aurelia. I was looking for a tutorial that walked through how to create 
an Aurelia app from scratch (without using the skeleton project) because building from **zero** is my preferred learning approach.

## learning objectives:
1. NodeJS and all it entails
- JSPM - have general understanding of package managers and solid experience with NuGet 
- SystemJS - have worked with RequireJS but i'm learning SystemJS is much more.
- Gulp/Grunt - general understanding of build automation
- Aurelia - I've worked with DurandalJS+KO extensively and have conceptual understanding of AngularJS.  

## the solution
I have checked-in every change with detailed commit comments and in small change sets. Furthermore, common-themed objectives are split into 
individual branches that build on each other; these range from task001 to taskXXX. To see the progression of changes step-by-step, 
switch to task001 and look at the commit history to review changes and comments.

## tools
- Plastic SCM for source control (sync to this github repo)
- Visual Studio 2013 Pro/Ultimate
- Typescript 1.7.x
- NodeJS 2.14.7

## how to run code
1. Install [NodeJS v4.2.x](https://nodejs.org/en/) and verify by opening command prompt and running `node -v`
- Install JSPM npm package globally by running `npm install jspm -g` 
- Configure [github API credentials](http://stackoverflow.com/a/30995041/1240322) to avoid rate-limiting 
errors, run `jspm registry config github` -> yes -> github username & paste in token.
- Install [git client](http://git-scm.com/download/win) (if not already installed)
- git clone this repository
- `cd` into the project directory (~\src\MMG.Utils.TWPM.HelperSPA\) and run `npm install` and `jspm install` to install all dependencies locally.
- Run the website in Visual Studio and browse to http://localhost:6187/
- Get your Api Token from your [TeamworkPM](https://www.teamwork.com/projects/) installation and click 'Authenticate'.

## exemplified technologies/libraries
1. [ECMAScript 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla) (see [this](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/) also)
- [NodeJS](https://nodejs.org/en/docs/) 
- [TypeScript](http://www.typescriptlang.org/)
- [SystemJS](https://github.com/systemjs/systemjs)
- [JSPM](http://jspm.io/) - (see [registry](http://kasperlewau.github.io/registry/))
- [HTTP fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts) (replaces XMLHttpRequest)
- Use of [TeamworkPM APIs](http://developer.teamwork.com/)
- [Aurelia](http://aurelia.io/)
- [Bootstrap 3](http://getbootstrap.com/)

## roadmap
1. Add JavaScript testing - unit and specs using Wallaby 
- Implement BreezeJS for data management and querying. Possibly leverage local storage to "cache" TWPM 
projects->tasklists->tasks object graphs for a given project. (Reference [Northwind aurelia-breeze](https://github.com/jdanyow/aurelia-breeze-northwind) example)
- aurelia-validation implementation (Reference [github repo](https://github.com/aurelia/validation))

## current problems
1. deployment: gulp - currently I have some problems using gulp and aurelia-bundler. seems like something is misconfigured 
or not properly structured. Using JSPM bundle commands in NPM scripts to accomplish minification, bundling, and prep for production. 
- deployment: jspm - Even with JSPM bundling of all core-js, babel, and aurealia, still have $.es6 modules being loaded separately and for 
some reason not being pulled from the bundle as expected.

## learning resources
1. [Official Aurelia Docs](http://aurelia.io/docs.html)
- [Aurelia Guides - From-Scractch](https://github.com/aurelia-guides/aurelia-guides.md-articles/blob/master/Building-Skeleton-Navigation-From-Scratch.md) (found this after the fact...)
- [SO Posting on Minimalistic Aurelia Project](http://stackoverflow.com/a/32081822/1240322)
- [Gitter chat room](https://gitter.im/Aurelia/Discuss)
- Pluralsight
	- [Scott Allen - Building Applications with Aurelia](https://app.pluralsight.com/library/courses/building-applications-aurelia/table-of-contents)
	- [Wes Higbee - Modern, Modular JavaScript with SystemJS and jspm](http://app.pluralsight.com/courses/javascript-systemjs-jspm)
	- [Wes Higbee - Seamless JavaScript Testing with Wallaby.js](http://app.pluralsight.com/courses/javascript-testing-wallaby-js)

