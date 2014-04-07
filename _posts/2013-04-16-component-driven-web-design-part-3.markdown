---
layout: post
title: "Component-Driven Web Design: Markup"
author: Chatman Richmond Jr.
id: 003
date: 2013-04-16
primary-language: markup
description: "Part 2 was all about setting up your environment with Node.js and Grunt for a slick front-end workflow. Part 3 is all about the markup."
excerpt: "Part 2 was all about setting up your environment with Node.js and Grunt for a slick front-end workflow. Part 3 is all about the markup."
---

Where we last left off in [Part 2]({% post_url 2013-03-30-component-driven-web-design-part-2 %}), I showed you how to set up a dev environment and boilerplate with Node.js and Grunt. Part 3 focuses on writing markup and style that can live beyond a single project. Also, rather than building from the boilerplate, I'll be making judicious use of [Codepen](http://codepen.io). I will be adding to the boilerplate's repo, however.





Also, please don't mind the kittens in some examples.





What you'll learn and/or review:







  * OOCSS


  * BEM class syntax


  * [Emmet](http://emmet.io) (because it rocks)





## Markup Without Borders





The boon of a component-driven web approach is portability. Built properly, you can use any of its parts in different projects. In terms of LEGO®, think of the components as the blocks themselves: seemingly unremarkable on their own, they can be used for stunning creations, but they also exist independently of the finished product. You can take them apart easily and fit them somewhere else. That is how your components should work. That said, they should also be a little more flexible in that you can modify the block itself. Using the markup as a foundation, you want to be able to do this easily with styling.





## Meet Emmet





I'm going to introduce Emmet here, because it has been a key player in helping me write portable HTML & CSS. It works as a plugin for most popular text editors and IDEs (Sublime Text is my preferred editor, for the record). I'm pretty confident that when you install this plugin, you will never willingly write vanilla markup again. I say that by the virtue of Emmet being able to take this syntax:



```markup
section.events>.event*2>h2.event__heading+img.event__image+p.event__content+(.event__date>.event__date__mo+.event__date__yr)
```





And output this markup:



```markup
<section class="events">
    <div class="event">
        <h2 class="event__heading"></h2>
        <img src="" alt="" class="event__image">
        <p class="event__content"></p>
        <div class="event__date">
            <div class="event__date__mo"></div>
            <div class="event__date__yr"></div>
        </div>
    </div>
    <div class="event">
        <h2 class="event__heading"></h2>
        <img src="" alt="" class="event__image">
        <p class="event__content"></p>
        <div class="event__date">
            <div class="event__date__mo"></div>
            <div class="event__date__yr"></div>
        </div>
    </div>
</section>
```





Of course, we're just scratching the surface. I'm going to introduce the basic Emmet syntax, and then we're going to keep moving with our components. If this all feels like déjà vu, it's because Emmet was formerly known as Zen Coding. If you're familiar with the syntax, or otherwise would rather not learn Emmet, you can jump directly to Portable HTML & CSS by Example and keep reading from there. For the rest of you, it's time to learn a bit about this wonderful tool.





### Old Syntax, New Context





The very first thing you might have noticed about Emmet syntax is how similar it is to the CSS we all know and occasionally swear loudly over. Well, it **does** use CSS selector syntax with a few modifications. Thus the following abbreviation and output.



```markup
nav.main-menu>ul.main-menu__wrap>li.main-menu__item$*4>a.main-menu__link[href="#"]

<nav class="main-menu">
    <ul class="main-menu__wrap">
        <li class="main-menu__item1"><a href="#" class="main-menu__link"></a></li>
        <li class="main-menu__item2"><a href="#" class="main-menu__link"></a></li>
        <li class="main-menu__item3"><a href="#" class="main-menu__link"></a></li>
        <li class="main-menu__item4"><a href="#" class="main-menu__link"></a></li>
    </ul>
</nav>
```





Emmet makes writing markup and CSS even easier. Granted, it won't save you if you have no grasp of the basics, but it will help your productivity in ways I can't even begin to scratch. Check out [the documentation](http://docs.emmet.io) if you want to unlock the real power of Emmet. It's not the focus of this post, but I wanted to make you aware of it and how it can help you. Maybe in a future post, we'll dive into it.





## Portable HTML & CSS by Example





The advantages of having markup you can apply to more than one project is that it keeps you from repeatedly writing (and screwing up) frequently implemented functionality. When you build and label components to exist **independent of any context besides its own**, you can safely maintain and apply updates from one project to the next. Like LEGO® blocks, they're interchangeable. This principle of portable HTML & CSS has several names, but the most recognizable is <abbr title="Object-Oriented CSS">OOCSS</abbr> introduced by Nicole Sullivan, which was expanded upon by Jonathan Snook as <abbr title="Scalable and Modular CSS">SMACSS</abbr>.





### How I Got SMACSS'd





From this point on, Codepen will be dominating the post, because it's better to show than tell. We do need some background before diving in though. Alright, so let's start simple with what Nicole and Jonathan call the media object. The media object, in the context of LEGO®, is the general brick. You can then optionally have an additional class or id to serve as an identifier for that media object. The internal elements of your media object could be likened to the connectors and shape of the block, determining its context. That is, it may or may not work within a portfolio vs. a landing page depending on what surrounds it. We all know the frustration as a kid that came from trying to make a brick fit where it didn't belong. At best, it got stuck, and at worst we damaged the brick.





## The Media Object





Time to look at our example.




<p data-height="268" data-theme-id="0" data-slug-hash="ocIpz" data-user="chatrjr" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chatrjr/pen/ocIpz'>Media Object Example</a> by Chatman Richmond Jr. (<a href='http://codepen.io/chatrjr'>@chatrjr</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>




The media object has a class of `.media` and also has a class of `.blog` as an identifier. The `.post` class indicates the context where the connectors fit best and the block's internals. The elements in the block follow the BEM naming convention of `.block__element`. This would be fine by itself, but we can transcend the humble LEGO® brick.





### Modifying Components





Now we're going to take our same media object, but we're going to make some changes without, and this is important, **without making significant changes** to the markup. Check it.




<p data-height="268" data-theme-id="0" data-slug-hash="BjJrf" data-user="chatrjr" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chatrjr/pen/BjJrf'>Modifying a Component</a> by Chatman Richmond Jr. (<a href='http://codepen.io/chatrjr'>@chatrjr</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>






The changes are somewhat trivial, but the point they illustrate is far from it. We modified our block significantly with just a few more lines of CSS and modifier class additions. We didn't have to touch the markup beyond that. The oddity of OOCSS and similar methodologies is that while they appear to tightly couple markup with style, in truth your style has probably never been more **abstracted** from your markup. That was my "Eureka moment" for this entire approach.





## Of Modules and Layout





Within the guidelines of OOCSS and SMACSS this entire post has been focused on the module layer. That's because modules, or I should say content, is the linchpin of writing portable HTML & CSS. My LEGO® analogies were deliberate, not convenient. My process, and indeed the way I think about web design as a whole were transformed by the ideas of some amazing people. Though I have inverted the methodical cascade.





OOCSS is built on the idea of starting with the general and building to the specific. I start with a typographic base, but then my focus immediately shifts to the components. The question I try to answer first isn't how the page will look, it's **what will go on the page**. Following that, it's what personality the project intends to show. On a web that can fit just about anywhere, content will inform layout far more than layout will inform content. The component-based approach is preparing myself, and perhaps you, for that eventuality.
