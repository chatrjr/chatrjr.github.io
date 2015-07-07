---
layout: post
redirect_from: "/2013/09/new-reality-of-digital-design/"
title: The New Reality of Digital Design
id: 005
categories: personal
date: 2013-09-21
tags:
    - opinion
    - CSS
    - design
description: "At CSSConf.eu, Harry Roberts gave a talk about normalizing designs for better CSS. Despite the bold title, this is just my perspective on that talk and the bigger picture."
excerpt: "The winds of change are blowing at hurricane force. At CSSConf.eu, Harry Roberts gave a talk about normalizing designs for better CSS. Despite the bold title, this is just my perspective on that talk and the bigger picture."
---

<!-- toc -->

[Harry Roberts of CSS Wizardry](http://csswizardry.com) gave a talk at CSSConf.eu. You really should [give that a look](http://www.youtube.com/watch?v=ldx4ZFxMEeo) first. It's about normalizing designs for better CSS. As someone who straddles the line between design & development, I can identify with both perspectives. I ended up agreeing more with him.

## The Fastest Code is Unwritten Code

The first step to maintainable CSS is an obvious one: write **less** of it. If there's less of it, there's less to maintain. However, this can conflict with a designer's natural commitment to perfection. And depending on their experience, this attitude may be especially entrenched. It's true that a bit more CSS won't be a problem for smaller projects, or projects that may have a short shelf life, so Harry doesn't advise making this a rule.

That said, pixel perfection as a principle slowly erodes as you work more closely with the medium. It took us some time to figure out, but Photoshop was never meant to be the hub of a complete design. Our PSD to HTML direct translations rarely considered the constraints of the web and what was possible. In those days, the badass developer was one who could deliver a design, mocked up in a PSD, in its entirety. Of course a perfect translation of PSD to the web meant grossly inflated codebases. If you didn't know before, **this is why your web developer hated you**.

## Designer/Developer Symbiosis

I'm going to bring up that old saw again. Designer, open a text editor. You don't have to add "Front-end Engineer" to your r&eacute;sum&eacute;, but you should know something about how your designs are implemented. You should understand that performance is a **design feature**. The more complex you make your designs, the more you eat into that critical metric. For every extra HTTP request or costly paint reflow, you impact the experience.

Harry says the solution to this is **compromise**. And let's not treat compromise like a dirty word. If designers and developers agree that the ultimate goal is a stellar project, then it shouldn't be hard to sideline our egos and come up with a solution that adopts the best ideas of both parties. That is compromise.

### Beware of Absolutes

At the same time, a wholesale abandonment of Photoshop is not the answer either. On today's web, Photoshop is a horrible design tool because PSDs are fixed canvases. Your real canvas is very fluid, and that's not a bug but a feature of the web. I think [Leigh Taylor said it best](https://medium.com/design-ux/10489d3cc430) in this article. You should definitely read it later.

> The harsh reality is that anything you 'design' in Photoshop is throw-away. A talking point. A reference for discussion. A platform to build from. It is never a definitive piece.

While I'm an advocate of designing in the browser, using it as your only tool is throwing out the baby with the bathwater. The browser is our real canvas, designer and developer alike. Our ideas are ultimately given form on the web. Treat it as a space to play with your **tangible** ideas. Those ideas that have found life beyond your sketchpad. The ideas that you can see as product. [Dan Mall of Superfriendly](http://superfriend.ly) puts it a bit more eloquently.

> Don't design in the browser. Decide in the browser.

If you work on the web, consider your PSDs transient. Consider them incubators for your ideas, but don't confuse them with the result. Harry notes in his talk "**a PSD is a clue, not a contract**."

## The Developer's Dilemma

Harry also pointed out a not-so-curious truth about being a developer: we're inherently lazy. The better we get at writing code, the less we actually want to write. I think it's because we begin to recognize that [code is a means]({% post_url 2013-09-11-code-is-only-a-method %}), not an end. We start to care more about rationale over methods, and we emphasize reusability over bespoke hacking. Particularly with CSS, developers embrace the 80:20 Rule. Given the choice to achieve 80 percent of the design with 20 percent of the code, we're gonna do that.

That's why CSS authoring and organization techniques exist. If you're not familiar with those, check these out:

  * [OOCSS (Object Oriented CSS) from Nicole Sullivan](http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
  * [BEM Syntax from Yandex (explained by Harry Roberts)](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
  * [DRY CSS from Jeremy Clarke (explained by Steven Bradley)](http://www.vanseodesign.com/css/dry-principles/)
  * [FCSS (Functional CSS) from Wealthfront](http://eng.wealthfront.com/2013/08/functional-css-fcss.html)
  * [My experimental offshoot of BEM](http://github.com/chatrjr/single-responsibility-bem)

This is also why preprocessors like Sass and LESS gained headway. It's partially because we're lazy, and partially because they encourage maintainable CSS without much guesswork. Having reusable and context-specific styling honors the 80:20 Rule.

### The New (Old) Context

The web has always been fluid. Long before Ethan Marcotte had the glimmer of responsive design in his eye, John Allsop wrote what could be considered a [seminal text in web design](http://alistapart.com/article/dao). A Dao of Web Design acknowledged that while the web borrowed heavily from print design, it was its own inherently flexible medium. Building websites wasn't even a thought in my mind in 2000, but his article was one of the first I read in the field.

The biggest thing I took from Harry's talk is that a new context brings new methods and new ideas. Responsive Design can at this point be called web design---without any qualifiers. We moved away from PSDs as deliverables to living style guides and design systems. We moved from slicing and spacer.gif to HTML/CSS prototyping. As our context shifted, so did our priorities.

## Beauty in Simplicity

The flat UI trend is not a fluke. Whether you agree with it or not, it represents a new reality of digital design. You can certainly call the removal of embellishments uninspired, but the result is blazing fast. You can call consistency too predictable, but as Harry says, a consistent UI is more beneficial to your visitors. What it represents, most of all, is the complete transition of the digital context into its own. And the new digital context is one that emphasizes performance and adaptability. Those are the new measuring sticks.

That is what both **designers and developers** should take from this. Given the choice between a 1:1 translation of aesthetics and performance, performance will win on the modern web. Designers, this is not to limit our ideas. In fact, these constraints in the interest of performance and flexibility can force us to be more clever. Developers, we know a maintainable codebase is often more enjoyable to work on. Taking a little extra time to create a space that allows experimentation without much hassle can encourage it. And this can have a measurable impact on the success and growth of a project.

Well, those are my thoughts. Let me know what you think.
