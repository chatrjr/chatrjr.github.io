---
layout: post
title: "Component-Driven Web Design: Environment"
author: Chatman Richmond Jr.
id: 002
date: 2013-03-30
description: "Part 1 attempted to explain why the component-driven way is a good approach going forward. Hopefully you're sold on the idea, because Part 2 is all about tooling."
excerpt: "Part 1 attempted to explain why the component-driven way is a good approach going forward. Hopefully you're sold on the idea, because Part 2 is all about tooling."
---

In [Part 1]({% post_url 2013-02-25-component-driven-web-design-part-1 %}) we looked at the concept and merits of a component driven web design approach. We looked at how  planning ahead keeps you sane, no matter the size of your project. Now with Part 2, we'll look at some tools that can streamline the component-based approach and enable a consistent environment for yourself or your team. I should also mention that the `sudo` command may be needed by Mac and Linux users. Let's get started.





Also, I'm warning you now: this post is long. I hope you'll get a lot from it though.





What you'll need:






  * [Node.js](http://nodejs.org/)


  * [Grunt](http://gruntjs.com/)


  * Your shell of choice (though I'll be using Bash)





## Getting Set Up





First, we have to prepare our development environment. If you're already set and have these tools above, then you can jump directly to the [Preparing Your Boilerplate](#boilerplate) section of this post. For the rest of you, let's get up and running.





### Installing Node





Now I'm going to show you how to install Node. Unfortunately, I don't have much experience with Mac OSX, so [I'll leave that explanation to someone who knows better](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/). Recently, the Node.js download page added .msi and .exe packages for Windows and .pkg for Mac to make installation relatively painless. Linux users can install it from source if they want, but Chris Lea has [graciously released a PPA with the latest version](https://launchpad.net/~chris-lea/+archive/node.js) of Node as it releases, so we'll do it that way.





Crack open your terminal and input the following, waiting for each command to complete:



```bash
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```





Once you're done with that, make sure Node installed correctly with the following commands:



```bash
which node
which npm
```





If they both return a directory, then you're all set.





### Installing Grunt





Having installed Node, the rest is simple. Simply input `sudo npm install -g grunt-cli` and wait for the command to finish. The `-g` flag tells npm to install the package globally. After that we're done and ready to move to the actual project.


<div id="boilerplate"></div>
## Preparing Your Boilerplate





I mentioned it in a previous post, but if you're fortunate enough to have a community-curated boilerplate available to you, **use it**. Don't be afraid to stand on the shoulders of giants and let them help you make your work even better. That said, the base of my boilerplate for web projects is unsurprisingly the [HTML5 Boilerplate](http://html5boilerplate.com) modified for my needs. The [Initializr](http://www.initializr.com/) is a great place to start for a customized H5BP.





Your shell should still be open, so let's scaffold out our project. In the shell, input:



```bash
mkdir src dist
```





Next, we want to copy the contents of our boilerplate (in this case: H5BP) into `src`. The directory you downloaded to may be different from mine, so adjust the command as you need.



```bash
cp -ru ~/Downloads/initializr ./src
```





When that is done, your directory structure should look something close to this.




```bash
├── dist
└── src
    ├── 404.html
    ├── crossdomain.xml
    ├── css
    │    ├── main.css
    │    ├── normalize.css
    │    └── normalize.min.css
    ├── humans.txt
    ├── img
    ├── index.html
    ├── js
    │    ├── main.js
    │    ├── plugins.js
    │    └── vendor
    │        ├── jquery-1.9.1.min.js
    │        └── modernizr-2.6.2-respond-1.1.0.min.js
    └── robots.txt
```





Don't worry about the `dist` folder for now, we'll come back to it later. Now we're going to create two critical files so, in your terminal, enter:



```bash
touch package.json Gruntfile.js
```


### The Anatomy of package.json


The `package.json` file contains most of the metadata for your project if you were building your own npm package. It's also the key to a predictable Node development environment for teams of any size. First off, you should definitely check out [Nodejitsu's interactive package.json page](http://package.json.nodejitsu.com/) if you want a deep dive into how exactly npm uses it. For our boilerplate, we're only going to use a few options. I'm going to show you the config, which is rather self-explanatory.



```javascript
{
  "name": "component-driven-web-design-boilerplate",
  "version": "0.1.0",
  "author": "Joe Everyman <joe@somemail.com>",
  "description": "a simple boilerplate for a component-based approach to web design",
  "contributors": [
    {
      "name": "Tom Peters",
      "email": "tpeters@somemail.com"
    },

    {
      "name": "Harry Dresden",
      "email": "damnpc@somemail.com"
    },

    {
      "name": "Dick Grayson",
      "email": "nightwing@somemail.com"
    }
  ],
  "devDependencies": {
  }
}
```





You'll notice we left the `"devDependencies"` value empty. Don't fret, we're about to handle that.





### Preparing Grunt





Grunt is a JavaScript-based task manager for web projects. If you've used Apache Ant or Make, it's similar to those. Since version 0.4, Grunt has decoupled its command line interface from Grunt itself. That's what we installed way up there with `grunt-cli`. In addition to the command line separation, Grunt has a bevy of plugins we can adapt to any web project under the `grunt-contrib` namespace, but there are also several other plugins written by the open source community, and the API makes it a breeze to roll your own.





Alright, we're going to grab Grunt and the most essential plugins for our simple boilerplate for now, and we'll only call in more as the project demands. In your terminal, input:



```bash
sudo npm install grunt --save-dev
```





The `--save-dev` flag tells npm to update our `"devDependencies"` with the latest stable version of the package we specify. In this case, that's Grunt. Now we're going to search npm for grunt plugins under the `grunt-contrib` namespace.



```bash
sudo npm search grunt-contrib
```

Then we're gonna install the following essential plugins for a Grunt boilerplate.

```bash
sudo npm install grunt-contrib-htmlmin grunt-contrib-imagemin grunt-contrib-cssmin grunt-contrib-csslint grunt-contrib-watch --save-dev
```





That done, you'll see that `"devDependencies"` has been updated.



```javascript
"devDependencies": {
  "grunt": "~0.4.1",
  "grunt-contrib-csslint": "~0.1.1",
  "grunt-contrib-htmlmin": "~0.1.1",
  "grunt-contrib-watch": "~0.3.1",
  "grunt-contrib-cssmin": "~0.5.0",
  "grunt-contrib-imagemin": "~0.1.2"
}
```





### Configuring Gruntfile.js





The `Gruntfile.js` file houses the configuration for Grunt… or it will once we build it out. So let's get on that. First, every Grunt configuration requires this wrapper.



```javascript
module.exports = function(grunt) {

};
```





Now we're going to load in our tasks. All the code from this point on is going to assume the wrapper function. They don't have to be in any particular order.



```javascript
// Load our tasks
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-imagemin');
```





Excellent. All that's left to do is configure our tasks, and we're going to do that in stages. First we'll configure `'grunt-contrib-htmlmin'`. Task configuration has its own wrapper:



```javascript
// Configure our tasks
grunt.initConfig({

});
```





This code should be inserted above our loaded tasks. Now for the actual task…



```javascript
pkg: grunt.file.readJSON('package.json'),
htmlmin: {
  /**
   * task identifier (htmlmin:build)
   * @type {Object}
   */
  build: {
    /**
     * task options
     * @type {Object}
     */
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    /**
     * files to be minified (path/to/dist: path/to/source)
     * @type {Object}
     */
    files: {
      'dist/index.html': 'src/index.html',
      'dist/404.html': 'src/404.html'
    }
  }
},
```





It should be noted that the `pkg` object will allow us to dynamically generate things like authorship banners, as you'll see in the `'grunt-contrib-cssmin'` task.

```javascript
cssmin: {
  /**
   * task identifier (cssmin:build)
   * @type {Object}
   */
  build: {
    options: {
      banner: '/* <%= pkg.name %> - <%= pkg.version %>' + '\n' +
              ' * <%= pkg.author %> */',
      report: 'min'
    },
    /**
     * files to be minfied 
     * (path/to/dist: path/to/src || 
     * [path/to/src1, path/to/src2])
     * @type {Object}
     */
    files: {
      'dist/css/style.css': ['src/css/normalize.css', 'src/css/main.css']
    }
  }
},
```





Before we configure the `'grunt-contrib-csslint'`, we need to make one more file. The task does allow you to define rules to lint directly in the config, but that isn't very portable, is it? So we're going to create `.csslintrc` to contain the rules, and then for our purposes it will hold the following:



```javascript
{
  "box-sizing": false,
  "box-model": true,
  "compatible-vendor-prefixes": false,
  "display-property-grouping": true,
  "duplicate-properties": true,
  "empty-rules": true,
  "font-sizes": false,
  "ids": true,
  "important": true,
  "outline-none": false,
  "overqualified-elements": true,
  "star-property-hack": false,
  "text-indent": true,
  "underscore-property-hack": false,
  "unqualified-attributes": false,
  "zero-units": true
}
```





If you want an explanation of the rules we're using, check out the [csslint wiki](https://github.com/stubbornella/csslint/wiki/Rules). For now, let's configure our task.



```javascript
csslint: {
  build: {
    options: {
      csslintrc: '.csslintrc'
    },
    src: 'dist/css/*.css'
  },
  dev: {
    options: {
      csslintrc: '.csslintrc'
    },
    src: 'src/css/*.css'
  }
},
```





You'll notice this time we have two identifiers. They'll be referenced as `csslint:build` and `csslint:dev` in the terminal and when we call them. Now then, let's configure `'grunt-contrib-imagemin'`.

```javascript
imagemin: {
  build: {
    options: {
      optimizationLevel: 3,
      progressive: true
    },
    files: {
      'dist/img': ['src/img/*.jpg', 'src/img/*.png']
    }
  }
},
```





We're almost at the end. Just one more task to configure, and it's arguably the most valuable one. Imagine how tedious manually tracking every change to your files would be. The good news: with `'grunt-contrib-watch'` you don't have to do so. Check it.



```javascript
watch: {
  css: {
    files: '<%= csslint.dev.src %>',
    tasks: ['csslint:dev']
  }
}
```





I referenced the source directly so we don't repeat ourselves, and then its set to run the defined tasks when those files change. I hope you're not tired, because we're almost done. Now we just have to actually register our tasks so they'll be accessible from the command line. Alright then, the following code should go below where we loaded our tasks. I've pasted it again for reference.




```javascript
// Load our tasks
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-imagemin');

// Register our tasks for use in the command line.
grunt.registerTask('default', ['htmlmin', 'csslint', 'cssmin', 'imagemin']);
grunt.registerTask('monitor', ['watch']);
```





The default task can be explicitly run in the command line with `grunt`. When you have more than one task, as we do here, then grunt recognizes it by its name in the terminal. So to run our `'monitor'` task we would input `grunt monitor`.





## We're not Done Yet





Though we are done with this post. The reason I ape a build process and a well-maintained codebase is because it really can make the difference in a team. And hopefully through building this boilerplate (or, just observing it), you're starting to see the potential gains. The beauty of Grunt is that it's written in a language that we as web devs already know, and this means it's piss easy to make it our own. I hope you understand that this is just one way of doing things, and I'd never advocate it as **the** way.





As always, the best process is one that complements your workflow and feels natural. I'm just presenting yet another option for the way we maintain our projects. This component driven web design boilerplate is only a stepping stone toward a more unified team, and I hope you'll stick around for Part 3 where we start working on a small web project using that philosophy. See you soon, web people.
