//Install express server
const express = require('express');
const app = express();
const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

Sign inGet started
Homepage
Go to the profile of Ryan Chenkie
Ryan ChenkieFollow
Mostly JavaScripting with Angular and Node. Screencasting at https://angularcasts.io , Google Developer Expert. Formerly at @auth0.
Dec 15, 2016
Angular CLI Deployment: Host Your Angular 2 App on Heroku
Hey! I’m Ryan and I teach at Angularcasts. Follow me on Twitter and let me know what you’re working on!

The Angular CLI is all around awesome and gives us a ton of time-saving features out-of-the-box. One that I love is the development server it comes with. If you’ve used the Angular CLI, there’s a good chance you’ve run ng serve and then visited localhost:4200 to see your app.

This is great for development purposes, but what do we do when it comes time to put our apps into production? The CLI comes with a command to deploy to GitHub Pages, which may be just fine for your use case. However, there’s a good chance that you’ll need more fine-grained control over how your app is served when it’s ready to go live.

Beyond this, the Angular CLI doesn’t come with a command for, nor is it concerned with, how we put our apps into production. Those details are up to us. This is fine, but it can sometimes be confusing to figure out how all the pieces come together to actually deploy an Angular 2 app.

In this tutorial we’ll cover how to deploy an Angular 2 app (built with the Angular CLI) to Heroku. We’ll also cover how to configure the app to redirect users to HTTPS and to properly handle routes.

Get the code and check out the live demo. Also, check out Angularcasts if you’d like the screencast version of this tutorial.


Quick note: I’m writing a book which will teach you everything you need to properly add authentication and lock down your Angular apps. Check it out if you’re interested :)
Get Set Up with Heroku
The beauty of Heroku is in its simple model: push your code to a remote Heroku repo and it will run everything necessary to deploy it. The key is that we need to tell Heroku a few things about how the app should be deployed.

Start by creating a Heroku account if you haven’t already done so. Once you have one, be sure to install the Heroku CLI for your platform and log in with your credentials in your terminal. Follow Heroku’s guide for the full instructions.

From the terminal, change directories into your Angular app and create a Heroku remote.

heroku create
Prepare the Angular App’s package.json File
Building the App
The Angular CLI provides an ng build command which is used to create a dist directory with all the files necessary to run the app. We can pass a number of options with this command that let us specify things like whether it's a development or production build, what the output path should be, and perhaps most importantly, whether we want the app to be compiled ahead of time. With ahead of time compilation, the compiler itself is left out of the build, meaning we get a much smaller overall app size. This is recommended for all production applications.

So when should ng build be run exactly? Should we run the command when all our work is done, commit everything in the project (including the dist folder), and then push to production? That's an option, but it may not be the best one. For one thing, when the built files go to version control, it can create annoying diffing issues that can be problematic when working in teams. Instead, we can have the ng build command be run on the server itself.

When we push code to Heroku, the scripts listed in the package.json file will be consulted, and if we have any preinstall or postinstall scripts, they will be run at the appropriate times. What we want to do in this scenario is have the build command run after the dependencies have been installed.

// package.json
"scripts": {
  // ...
  "postinstall": "ng build --aot -prod"
},
With this postinstall script in place, we'll get a production mode app that lives in a dist folder with ahead of time compilation, all on the server. No need to build the app locally and commit the dist folder to version control. What's more is that this all happens automatically when we push our code to Heroku.

Move the @angular/cli Dependency
When we push our code to Heroku, a number of events take place. One of these events is that Heroku reads which dependencies we have in our package.json file and installs them. By default, however, Heroku will only install the packages listed in the dependencies object and will ignore those in devDependencies. Since we want the application build step to take place on the server rather than on our local machine, we need to adjust the package.json file a bit.

Angular CLI apps put the @angular/cli module itself as a dev dependency, meaning that we won't be able to access any ng commands on the server. To get around this, we need to move it to dependencies.

// package.json
"dependencies": {
  // ...
  "@angular/cli": "1.2.3",
},
Running the Server
Later on, we’re going to create a simple Node server to actually serve the application. We need to specify how the app should be started in a script so that Heroku can boot up the application server at the end of the deployment process.

Create another script for the start command.

// package.json
"scripts": {
  // ...
  "start": "node server.js"
},
Engines
Heroku likes to know about which version of Node and npm you’re using during development so that it can use the same ones for production. This is helpful for preventing unanticipated behavior due to version issues. Add your specific Node and npm versions in the engines key in package.json.

// package.json
"engines": {
  "node": "6.11.1",
  "npm": "3.10.9"
}
Create an Express Server
There are a few different ways we could serve the application once it gets to Heroku. For example, we could install and run a simple server with something like http-server. However, this won’t allow us to have control over the details of how the app is served, which means it’s not the best approach.

Instead we should create a simple Node server to serve the static files from our dist folder. This will easily allow us to handle routes properly and redirect to HTTPS for all requests.

Start by creating a new file in the application root called server.js. This will be an express application, so install and save express.

npm install --save express
Next, require express and create a simple app which serves static files from dist.

// server.js
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

// server.js
const express = require('express');
const app = express();
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
// 

// Serve only the static files form the dist directory
app.use(express.static(__dirname + 'dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
