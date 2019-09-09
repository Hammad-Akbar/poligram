# lecture9-react

Let's get React up and running with Flask. Run these commands in your Project 2 (or scratch) folder.

## Upgrade Node version to 7

```$ nvm install 7```

## Install Webpack

This line installs Webpack on your Cloud9 workspace.

```$npm i webpack --save-dev```

## Install `npm` dependencies from `package.json`

This line starts `npm`, which looks inside our `package.json` file, retrieves a list of
packages, and installs them to the `node_modules` folder inside your repository. `node_modules` folder **does not** need to be pushed to Heroku or GitHub.

```$ npm install```

## Compile Javascript using Webpack

This line starts up Webpack, which looks inside `webpack.config.js`, loads
configuration options, and starts transpiling your JS code into `static/script.js`.

```$ npn run watch```

(The program should not stop running. Leave it running.)

## Edit a JS file

Make a change to `scripts/Content.js`. Webpack should detect the change and
print a bunch of stuff.

**Do not manually edit `static/script.js`!! You do need to push this file to Heroku and GitHub**

## Run the web app

Open a new terminal in your AWS Cloud9 environment (google this if you don't know how). Run `app.py` and verify that the React renders. You should see "Hello, World!" in the preview.

**You will always need to do a refresh (Ctrl+R/Cmd+Shift+R) of your browser (while Webpack is running) to see changes**

