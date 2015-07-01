---
layout: post
redirect_from: "/2014/01/mvc-the-angular-way/"
title: "MVC: The Angular Way"
id: 008
categories: web
date: 2014-01-06
tags:
    - AngularJS
    - MVC
    - experiments
    - learning
src1: "http://jsfiddle.net/chatrjr/neCH7/"
src2: "http://jsfiddle.net/chatrjr/Xz3hp/"
description: "Happy New Year! I'm diving into MVC frameworks. There are many options available from Backbone to Ember. I'm starting with AngularJS."
excerpt: "Happy New Year! I'm diving into MVC frameworks. There are many options available from Backbone to Ember. I'm starting with AngularJS. Over the weekend, I learned some basic concepts of MVC and building with Angular. And then I made something silly."
---

> %post-body_toc%
+ [Obligatory Explanation of MVC](#mvc-explanation)
  + [MVC Philosophy](#mvc-philo)
+ [A Rough Sketch of MVC](#sketch-mvc)
  + [Model](#model)
  + [View](#view)
  + [Controller](#control)
+ [AngularJS: A Very Different Animal](#angular-js)
+ [The Angular View](#angular-view)
+ [Augmented Markup](#augmented-markup)
  + [ng-app](#ng-app)
  + [ng-controller](#ng-controller)
  + [ng-model](#ng-model)
  + [ng-event](#ng-event)
  + [ng-repeat](#ng-repeat)
  + [ng-class](#ng-class)
+ [The Missing Ingredient: Routes](#routes)
+ [The Result](#result)

## [Obligatory Explanation of MVC](id:mvc-explanation)

That's probably the the first thing you're wondering (if you didn't know already). [MVC](abbr:Model-View-Controller) is a software pattern for building user interfaces that emerged from Smalltalk. It's a proven architecture for robust UIs that finally found its way to the web in the explosion of application frameworks that embody its principles along with a few offshoots. I'm talking about Backbone, Ember, Knockout, and the star of today's post: [AngularJS](http://angularjs.org/). Of course, that's just scratching the surface. Before we dive in with Angular, let's have a look at the ideas behind MVC and the problems it was intended to solve.

### [MVC Philosophy](id:mvc-philo)

MVC is critical for building modern applications because it works on the idea that there should be a separation of concerns between the data the application accepts (Model), how the data is shown (View), and how it's changed (Controller). This approach would allow apps to easily grow with feature requests and bug fixes in ways that they couldn't if all those parts were intertwined.

## [A Rough Sketch of MVC](id:sketch-mvc)

It's a bit more complicated than that, so it's example time! The following code is not representative of any MVC framework out there right now, it's only meant to illustrate the general structure.

### [Model](id:model)

Let's say we have a database full of people that we want to use for a "Facebook-killer" social network. We don't need to use all of their data for the model, only the most relevant parts. The following is a model we might use for a profile page.

```language-javascript
// Let's assume there's an App namespace and that
// a Person has already been attached as a Model.
var App = App || {};

App.Model.Person = (function(data) {

  this.id = data.id;
  this.firstName = data.firstName;
  this.lastName = data.lastName;
  this.age = data.age;
  this.birthday = data.birthday;

  // Parse data somehow

  return data;

})('people.json');
```
### [View](id:view)

A view is usually represented through a templating engine (either client or server side). Here is where you plug in your data. For the purpose of our example, let's say the template is written like this.

```language-markup
<!> Mock templating language
<>html
  <>head
    <>title Profile of #{getFullName} &bull; FBKiller
    <name="description" content="This is the profile of #{getFullName}"/>meta
    <name="viewport" content="width=device-width, initial-scale=1"/>meta
    <rel="stylesheet" href="style.css"/>link
    <src="engine.js">script
  <>body
    <role="banner">header.main-head
      <>h1 Profile of #{getFullName}
      <role="navigation">nav.main-nav
        <>ul.main-nav-wrap
          <@for [1..4]>
            <>li
              <href="#">a
          </@for>
    <>.stats
      <>ul.stat-wrap
        <@each $context : prop>
          <>li.stat-item
            <>h2 #{prop}
            <>p #{$context.prop}
        </@each>
    <role="contentinfo">footer.main-foot &copy; 2014 FBKiller
```

When the template is parsed, you end up with something like this.

```language-markup
<!-- Mock templating language -->
<html>
  <head>
    <title> Profile of Dirk Gently &bull; FBKiller</title>
    <meta name="description" content="This is the profile of Dirk Gently" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="style.css" />
    <script src="engine.js"></script>
  </head>
  <body>
    <header class="main-head" role="banner">
      <h1>Profile of Dirk Gently</h1>
      <nav class="main-nav" role="navigation">
        <ul class="main-nav-wrap">
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
          <li><a href="#"></a></li>
        </ul>
      </nav>
    </header>
    <div class="stats">
      <ul class="stat-wrap">
        <li class="stat-item">
          <h2>First Name</h2>
          <p>Dirk</p>
        </li>
        <li class="stat-item">
          <h2>Last Name</h2>
          <p>Gently</p>
        </li>
        <li class="stat-item">
          <h2>Age</h2>
          <p>Unknown</p>
        </li>
        <li class="stat-item">
          <h2>Birthday</h2>
          <p>Unknown</p>
        </li>
      </ul>
    </div>
    <footer class="main-foot" role="contentinfo">&copy; 2014 FBKiller</footer>
  </body>
</html>
```

<div id="control"></div>
### Controller

A controller is responsible for application logic and data manipulation. As such, they are usually bound to the view they affect and are responsible only for that view. In our mock MVC framework, a controller might be written this way.

```language-javascript
App.Controller.UserProfile = (function(Person, ProfileView) {

  // Let's say App.Controller has a bind() method
  // to attach views.
  var $context = App.Controller.bind(this, ProfileView);

  // From this context, we can attach additional manipulators
  // to be shown in the view.
  $context.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  }

})(App.Model.Person, App.View.Profile);
```

That's enough theory. Let's see how a real framework does it.

## [AngularJS: A Very Different Animal](id:angular-js)

Of all that I've read about MVC and its derivatives, Angular is quite unique in its approach. It's a completely different architecture from "traditional" MVC like Backbone. The Angular team marks it as a [MVM](abbr:Model-View-Mapper) framework, and it shows. The rest of this post will be about the silly thing I mentioned in the excerpt, as it helps show exactly how different yet __familiar__ it is to do things the Angular way.

## [The Angular View](id:angular-view)

The first thing I should mention: if you've ever written HTML, then you already know how to build an Angular view. The framework extends natural markup with a ton of useful attributes. Angular has grown surprisingly hardy since its creation, trusted to power apps large and small despite its deceptively simple structure. Here's the view for my [Multiples Listing experiment](http://jsfiddle.net/chatrjr/neCH7/).

```language-markup
<div ng-app="App">
  <div ng-controller="MainCtrl">
    <h1>AngularJS Multiples Experiment.</h1>
    <p>This is just something I built while learning AngularJS, so I can prepare to use it on a larger project I'm working on. Feel free to comb through the code, and let me know if I messed up something.</p>
    <form>
      <div class="field-wrap">
        <label for="mult">Set your multiple. <small>Change to update table.</small></label>
        <input id="mult" class="field" type="number" ng-model="num.multiple">
      </div>
      <div class="field-wrap">
        <label for="limit">Set your limit. <small>Number of items to show.</small></label>
        <input id="limit" class="field" type="number" min="0" max="10000" ng-model="num.limit">
      </div>
      <div class="controls">
        <button ng-click="populate()">Create my table</button>
        <button ng-click="flush()">Reset</button>
      </div>
    </form>
    <ul>
      <li class="boxes" ng-class="{divisible: (numbers[$index] % num.multiple === 0) ? true : false}" ng-repeat="number in numbers">
        {% raw %}{{ number }}{% endraw %}
      </li>
    </ul>
  </div>
</div>
```

See? An Angular view is an augmented HTML document. Nothing else. Let's have a look at some of these augments.

## [Augmented Markup](id:augmented-markup)

### [ng-app](id:ng-app)

The first notable change is the `ng-app` attribute. This lets Angular know where the app rests on your page. When you set it as an attribute of `<html>`, like I am, you're telling Angular the entire page is your app. Wrapping part of your page with `ng-app` is ideal if your website or app is managed by something else. This means you can have a dash of Angular with your Rails, for example.

### [ng-controller](id:ng-controller)

The `<body>` element has the `ng-controller` attribute. Angular uses this to assign a controller's scope on the page to wrap its logic. My experiment only has one controller, `MainCtrl`, because it doesn't need to do too much. Building a controller in Angular isn't a chore either, especially if you're well-versed in the module pattern.

```language-javascript
// Best Practice: Set namespace of your app to
// avoid pollution of the global scope.
var App = angular.module('App', []);

// $scope is the current context of MainCtrl,
// that is, the entire page.
App.controller('MainCtrl', function($scope) {
  var i,
      numArr;

  // An Angular model with defaults set.
  // Keep in mind that models usually aren't static
  // and work with persistent data from the server.
  $scope.num = {
    multiple: 2,
    limit: 24
  };
  
  $scope.numbers = [];
  
  numArr = Array($scope.num.limit);
  
  for (i = 0, len = numArr.length; i <= len; i++) {
    $scope.numbers.push(i);
  }

  $scope.populate = function() {
    $scope.numbers.length = 0;
    
    var list = $scope.num.limit;
    
    for(i = 0; i <= list; i++) {
      $scope.numbers.push(i);
    }
  };
  

  $scope.flush = function() {
    $scope.numbers.length = 0;
  };
  
});
```

### [ng-model](id:ng-model)

This attribute allows you to bind values to elements in real-time. Angular maintains persistent state through two way binding. The `<input>` element in our view with `ng-model="num.multiple"` will update the list as you change it, while the one with `ng-model="num.limit"` attached will modify the size of your list.

### [ng-event](id:ng-event)

What's old is new again. Angular binds events in a way that will look very familiar and worrisome, but there's nothing to fear. My little experiment has buttons that create and reset the table, respectively. The first button is bound to the `populate()` method defined in the controller, while the second is bound to `flush()`.

Here's the view.

```language-markup
<button ng-click="populate()">Create my table</button>
<button ng-click="flush()">Reset</button>
```

And the associated methods.

```language-javascript
$scope.populate = function() {
  $scope.numbers.length = 0;
  
  var list = $scope.num.limit;
  
  for (i = 0; i <= list; i++) {
    $scope.numbers.push(i);
  }
};

$scope.flush = function() {
  $scope.numbers.length = 0;
};
```

### [ng-repeat](id:ng-repeat)

This attribute allows Angular to loop through items in the list once it has been populated. And this will update every time we create a new list. It doesn't just work with arrays, it allows any collection of objects that can be iterated through. And then you can output the value with either `ng-bind=value` or the double bracket syntax.

### [ng-class](id:ng-class)

The final ingredient was to figure out a way to update an item with a special class. Angular supplies the `ng-class` for conditional application of classes. In this case, I wanted to highlight the numbers that are multiples of the first input, that is, by checking that the modulus of that number equals 0.

```language-markup
<li class="boxes" ng-class="{divisible: (numbers[$index] % num.multiple === 0) ? true : false}" ng-repeat="number in numbers">
  {% raw %}{{number}}{% endraw %}
</li>
```

When it does, the `.divisible` class is applied to that item and highlights it as a multiple.

## [The Missing Ingredient: Routes](id:routes)

When MVC came to the web, another special ingredient was added to leverage the power of links. As a result, web apps have shareable URLs that preserve state. This routing allows a web app to apply certain functionality across views in a simple, readable way. And this is arguably their biggest advantage over native apps. My experiment was way too simple to need routing, but don't underestimate the power of this valuable tool.

## [The Result](id:result)

This was a really long post, and I might have tried to do too much. Here's the finished app, if you want to play with it. Also, my understanding of MVC isn't complete, so I urge you to let me know if I've made some mistakes in explaining it. And especially if I got it completely wrong. See ya later, web people!

> %post-body_src%
Multiples Experiment: [{{ page.src1 }}]({{ page.src1 }})

## Bonus

This is another implementation of the multiples list that live updates from inputs. No buttons necessary. You're welcome to compare performance.

> %post-body_src%
Multiples Experiment (Live Updating): [{{ page.src2 }}]({{ page.src2 }})