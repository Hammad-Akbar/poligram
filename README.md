# Lecture 8 - React

Let's get React up and running with Flask. If you try to run the python file, 
we will get a blank page in our browser preview. We want the browser to 
display **Hello World from React!!!**. In order to do that, we need to install
some libraries to get our client-side code up and running!

## 0. Clone this repo
```$ git clone https://github.com/Sresht/lect8-react```

## 1. Upgrade Node version to 7

```$ nvm install 7```

## 2. Install initial `npm` dependencies from `package.json`

This command runs `npm`, which looks inside our `package.json` file, 
retrieves a list of packages, and installs them to the `node_modules` folder
inside your repository. `node_modules` folder **does not** need to be pushed
to Heroku or GitHub.

```$ npm install```

## 3. Add files to your .gitignore

```$ touch .gitignore; echo "node_modules/" >> .gitignore; ```
```$ echo "static/script.js" >> .gitignore```
```$ echo "package-lock.json" >> .gitignore```

## 4. Install Webpack

This command installs Webpack on your Cloud9 workspace.

**Note: This command MUST be run from the folder that contains package.json!**
**You will get an error if you are in a different folder!**

```$ npm install --save-dev webpack ```

If this doesn't work. close and restart your terminal. 
If it still doesn't work, run `$ npm install -g yarn` and `$ yarn upgrade`

## 5. Compile Javascript using Webpack

This line starts up Webpack, which looks inside `webpack.config.js`, loads
configuration options, and starts transpiling your JS code into 
`static/script.js`. You may be asked to also install webpack-cli. Type **yes**.

```$ npm run watch```

(The program should not stop running. Leave it running.)

If this step fails for whatever reason, please close your terminal and restart it,
and re-run the command.

## 6. Run the web app

Open a new terminal in your AWS Cloud9 environment (click the little green + 
button near your current terminal and choose 'New Terminal'). Run `app.py` 
(from the same folder, but new terminal), then preview the running application,
and verify that the React renders. You should see "Hello World from React!" in
the preview.

**Do not manually edit `static/script.js`! It will update when you make changes.**
**You do need to push this file to Heroku and GitHub, which is why we put it in**
**our .gitignore files**

## 7. Edit HTML

Find the text that says "Hello World from React!" Make a change. Your webpack 
should still be running in the other terminal (and some logs will spit out). 
Try previewing the changes in the Preview Window in AWS. Notice that nothing 
is updating. You need to click 'Pop out to New Window', and hard refresh the
browser (see command below). 

PS This is a known problem for a bunch of people. Unfortunately, there is no 
known fix besides turning off the cache option for the whole browser (which 
we don't want to do).

**You will always need to do a hard refresh (Ctrl+R/Cmd+Shift+R) of an external**
**tab in your browser (while Webpack is running) to see changes**
