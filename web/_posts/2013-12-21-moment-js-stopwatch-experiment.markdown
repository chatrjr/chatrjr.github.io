---
layout: post
redirect_from: "/2013/12/moment-js-stopwatch-experiment/"
title: "Moment.js Stopwatch"
id: 006
date: 2013-12-21
tags:
    - Moment.js
    - JavaScript
    - experiments
primary-language: css
src: "http://jsfiddle.net/chatrjr/LaAzg/embedded/result/"
description: "Here we go. Yet another JavaScript stopwatch. This one has a bit of a twist though."
excerpt: "Here we go. Yet another JavaScript stopwatch. This one has a bit of a twist though. It's a very quick and dirty app that I made to possibly use within a larger one."
---
> %post-body_toc%
+ [Markup (HTML)](#html)
+ [Style (CSS)](#css)
+ [Behavior (JS)](#js)
+ [Example](#sample)

You might know [Moment.js](http://momentjs.com) as a widely used library for formatting and parsing dates. I found another novel use for its time setting features: a really simple stopwatch. Here's how I put it together.

## [First Ingredient: Markup](id:html)

```language-markup
<div class="stopwatch" id="stopwatch">
    <div id="time-container" class="container"></div>
    <button class="button" id="start">Start</button>
    <button class="button" id="stop">Stop</button>
</div>
```

There's nothing crazy here, so I won't dwell on it. Just wrapping the whole app with a `.stopwatch` class, setting a container for the time, and simple `#start` and `#stop` controls.

## [Second Ingredient: Style](id:css)

```language-css
*,
*:before,
*:after, {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    margin: 0 auto;
    width: 20em;
}

.stopwatch {
    background: #C0FFEE;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 2rem;
    width: 100%;
    height: 2em;
}

.container {
    margin: 0 auto;
    padding: 0.4em;
    width: 60%;
    height: 100%;
    color: #111;
}

.button {
    background: #BADA55;
    border: none;
    cursor: pointer;
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 0.2em;
    margin-right: 1%;
    padding: 0.3em;
    width: 48%;
    text-align: center;
    transition: all 0.3s ease;
}

.button:hover,
.button:focus {
    background: #FFF;
    color: #BADA55;
    font-weight: 700;
}

.button:last-child {
    background: #E00;
    color: #FFF;
    margin-right: 0;
}

.button:last-child:hover,
.button:last-child:focus {
    background: #FFF;
    color: #E00;
    font-weight: 700;
}
```

_Note: The CSS is unprefixed for convenience. Naturally, you would want to use them where needed, but I recommend checking out [Autoprefixer](https://github.com/ai/autoprefixer) or [-prefix-free](http://leaverou.github.io/prefixfree/) if you'd rather not worry about that. Especially if you use a preprocessor._

Nothing here to write home about. Just a simple layout.

## [Third Ingredient: Behavior](id:js)

```language-javascript
var AppStopwatch = (function () {
    var counter = 0,
        $stopwatch = {
            el: document.getElementById('stopwatch'),
            container: document.getElementById('time-container'),
            startControl: document.getElementById('start'),
            stopControl: document.getElementById('stop')
        };

    var runClock;

    function displayTime() {
        $stopwatch.container.innerHTML = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss');
    }

    function startWatch() {
        runClock = setInterval(displayTime, 1000);
    }

    function stopWatch() {
        clearInterval(runClock);
    }

    return {
        startClock: startWatch,
        stopClock: stopWatch,
        $start: $stopwatch.startControl,
        $stop: $stopwatch.stopControl
    };
})();

AppStopwatch.$start.addEventListener('click', AppStopwatch.startClock, false);

AppStopwatch.$stop.addEventListener('click', AppStopwatch.stopClock, false);
```

There's the whole shebang, now let's dissect it.

### [IIFE](abbr:Immediately Invoked Function Expression)

The very first thing we do is set one global namespace `AppStopwatch` and assign an IIFE. This will contain configuration for the app.

```language-javascript
// Wraps our app and prevents pollution of the 
// hosting environment. That is, the browser in this case.

var AppStopwatch = (function () {
})() // Called immediately;
```

### Set Variables

```language-javascript
    var counter = 0, // to be incremented
        // collection of DOM elements
        $stopwatch = {
            el: document.getElementById('stopwatch'),
            container: document.getElementById('time-container'),
            startControl: document.getElementById('start'),
            stopControl: document.getElementById('stop')
        };

    var runClock; // used as id for setInterval()
```

Now what we want to do is set a `counter` to increment and wrap a collection of the app's selectors in a `$stopwatch` object. The `runClock` variable will be assigned later.

### displayTime()

```language-javascript
    function displayTime() {
        $stopwatch.container.innerHTML = moment().hour(0).minute(0).second(counter++).format('HH : mm : ss');
    }
```

All we really do here is modify the `#time-container` element's contents (currently nothing) to display our stopwatch. The contents are a call to `moment()` which gets Moment.js going, and then we set the `hour()` and `minute()` to zero. The beauty comes from the second to last method in the chain: `second()`. The Moment.js documentation says

> Gets or sets the seconds.
> 
Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the minutes.

That bubbling is what makes the stopwatch work and applies to the other chained methods as well. On every call, `counter` is incremented. It means when the counter is at 60, our stop watch will display 00:01:00. When the counter is at 3600, our display will show 01:00:00. `second()` will bubble up to `minute()`, which bubbles into `hour()`. It's that simple.

Finally, the last method sets the formatting of our display.

### startWatch()

```language-javascript
    function startWatch() {
        runClock = setInterval(displayTime, 1000);
    }
```

All this function does is set our `runClock` variable to set an interval which references displayTime and calls it every second.

### stopWatch()

```language-javascript
    function stopWatch() {
        clearInterval(runClock);
    }
```

Clearing our `runClock` interval stops the watch.

### return

```language-javascript
    return {
        startClock: startWatch,
        stopClock: stopWatch,
        $start: $stopwatch.startControl,
        $stop: $stopwatch.stopControl
    };
```

Now we want to return an object to expose to the environment. The properties are only the functions and elements we need.

### Events

```language-javascript
AppStopwatch.$start.addEventListener('click', AppStopwatch.startClock, false);
AppStopwatch.$stop.addEventListener('click', AppStopwatch.stopClock, false);
```

Outside of the IIFE, we set the actual behavior of our app. Our `#start` and `#stop` buttons are tied to event listeners that we execute when clicked.

## [Result](id:sample)

All that done, we get the finished app.

> %post-body_src%
Moment.js Stopwatch: [{{ page.src }}]({{ page.src }})

## Extra

One thing you'll notice I haven't done is create a way to reset the clock. That's definitely something I'll do in the larger app, but you're welcome to fork that fiddle and do it yourself.

That's all. If you want to follow up, you can [get me on Twitter](http://twitter.com/ChatRJr).



