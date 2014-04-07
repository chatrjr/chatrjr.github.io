---
layout: post
title: "Component-Driven Web Design: Principles"
author: Chatman Richmond Jr.
id: 001
date: 2013-02-25
description: "Tomorrow's web will be all about building from components. As developers, we won't see webpages so much as unique modules working in concert to build a cohesive whole. This begins a series of posts on building from these blocks."
excerpt: "Tomorrow's web will be all about building from components. As developers, we won't see webpages so much as unique modules working in concert to build a cohesive whole. This begins a series of posts on building from these blocks."
---

This post begins a series on building component driven websites. In part 1 I lay the foundation and explain why the component driven approach kicks ass. You'll see how proper folder structure, a reliable boilerplate, and a robust package manager can get you off on the right foot whether you're building a simple blog or a complex web app.





## Don't Ignore the Single Broken Window





Maintainable code is a boon to productivity. A disorganized, cluttered codebase can easily inflate the time it takes to complete a project. Among a team, the longer a codebase remains cluttered, the less likely it will ever be cleaned up. Your best bet to ensure a smooth project is to build from a solid foundation that takes root long before a text editor comes into play. When you let even a few sloppy lines of code sit still, you're sending the message to anyone who touches it after that they don't have to care. And at that point the component driven approach becomes impossible. That is, it gets harder to fit the puzzle together as the pieces get warped.


## Build Your Project Not Only for What It Is, but What It Will Become





Component driven web design needs a solid base. In the planning stages you should already be considering how you want your site or app to grow, even if it's just a rough estimate. Planning for the lifetime of your project rather than the immediate implementation ensures that you'll make intelligent decisions on it moving forward. Even if you if don't have a detailed analysis, you should at the very least be thinking about both short-term and long-term project goals and ensure the short-term goals align with your long-term goals. This will spare you from a lot of pain down the road.





Headscape founder Paul Boag [recently issued a call to action](http://www.netmagazine.com/news/paul-boag-web-designers-must-iterate-more-132564) for designers to start iterating their designs more. One especially critical point made in the article regards the boom-bust cycle of client work. To that, Mr. Boag says:





> They launch a lovely new website and then they leave it. Content decays and becomes out of date. Technology becomes redundant over time. The design begins to look dated.





As designers we're drawn to the idea of redesigning, and very often it occurs in one shot. We don't usually do minor tweaks over a period of time; we tear everything down and start from scratch. It's time to rethink our approach. Good iterative design doesn't occur without a process that accommodates it, so let's begin.



## Ode to a Build Process





I know it seems like I have an ax to grind on this subject, but I really can't understate the importance of an effective build and automation process. The key to speedy development is to avoid writing boilerplate code as much as possible. If you find yourself going through the same setup procedures, you would definitely benefit from one. Maybe you're extremely fortunate and you have a regularly updated community boilerplate for your dev stack. Take advantage of that.





For JavaScript-based web apps in particular, you really can't go wrong with [Grunt](http://gruntjs.com/), and there's also [Yeoman](http://yeoman.io/) if you want to take it up to 11. Any project, big or small, can benefit from a great build and automation process. It's better to get comfortable with one sooner rather than later.





> If you have a phobia of the command line as I used to, this also presents a great opportunity to face it: increased productivity.





### Let's Get Modular





Once you start thinking of your project's assets in terms of components, you may want to use an <abbr title="Asynchronous Module Definition">AMD</abbr> loader such as [RequireJS](http://requirejs.org). The main benefit of AMD is conditional loading. As projects get more robust, you're likely to run into the Great Wall of Dependencies. This is when your application becomes so complex as to muddle the order of your scripts, what dependencies you should call, and _when_ to call them. AMD loaders like RequireJS abstract most of these concerns by loading dependencies as modules. The beauty is that _anything_ can be a module. You'll find out what this means in part 3.



## Here's the Stinger





The most vital point of component driven web design is maintainability. A well-kept home is more inviting to visitors. A well-kept codebase is more inviting to a team. This is why top developers recommend a uniform style guide for in-house and open source projects. This is why Grunt may fast become an industry standard. This is why you should never be without a version control system. All of these things contribute to the health of the project and overall sanity of the team.





Equally important is for components to be portable. They have a far greater shelf life than code that's too tightly coupled to the base. If you find yourself in need of a similar solution later on, having a component to be used across projects can be a lifesaver. For example: if you write an excellent script for a complex problem, and you have any suspicion that you'll run into that problem again, abstract it from the codebase and define it as a module. Improve it over time and let it find life in other projects.





## That's Enough, Show Me the Code





Parts 2, 3, and 4 will be a deep dive into component driven web design. I'll walk you through a small project, using the principles above, from concept to completion. Naturally, the code will be archived in a Github repo as we go. I'd like to hear your thoughts on this, so don't be shy. I'm already working on the second part, so stay tuned.