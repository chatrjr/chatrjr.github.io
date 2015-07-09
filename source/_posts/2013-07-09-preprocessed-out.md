---
layout: post
title: Preprocessed Out
language: scss
categories: web
date: 2013-07-09
tags:
    - Sass
    - tooling
    - methodologies
description: "CSS preprocessors have gained some serious headway among designers, with Sass leading the pack. However, we should remember not everyone uses them or wants to use them. Understanding why they don't is critical in understanding why you do."
excerpt: "CSS preprocessors have gained some serious headway among designers, with Sass leading the pack. However, we should remember not everyone uses them or wants to use them. Understanding why they don't is critical in understanding why you do."
---

<!-- toc -->

I recently got into a debate with a developer who doesn't see the point in using CSS preprocessors. I have to admit I got really defensive. As much as I love Sass, once I cooled down, I did what any conscientious developer would do: research. I came out the other side with a better understanding of both sides of the argument, as well as a deeper understanding of exactly why I use a tool like Sass.

To give credence to both sides of the argument, and what Sass and other preprocessors are aiming to fix, there will be code examples. I'd recommend reading the whole thing, but if you really want to, you can jump down to [The Sass Way](#sass-way) for the examples of ways you can use Sass (and some ways you shouldn't).

## CSS as a Language

It should be pretty obvious by this point, but CSS is **not** a programming language. It's a declarative markup language that acts as the skin to its HTML skeleton. CSS is by design supposed to be easy to pick up and understand. However, its loose syntax has some pitfalls to those coming from a traditional programming background (and even some that don't).

  * Not very DRY
  * Doesn't scale too well
  * Fairly easy to abuse without understanding

The interesting thing about that last bullet is that it can apply equally to handwritten CSS and compiled CSS. This is something both advocates and detractors tend to ignore. CSS is easy to pick up, but can easily take years to use effectively. And it falls on the designer/developer to write good CSS first. Then you can look into ways to write it faster.

## A Bad Workman

This is an often quoted proverb, but it's no less true.

> A bad workman never gets a good tool.

The fact is: a CSS preprocessor won't help you do shit if you don't have a good grasp of modern CSS authorship practices and haven't yet grokked the power of your tool. Before even **considering** using one, you should have a good understanding of the following:

  * specificity
  * the cascade
  * efficient selectors
  * SMACSS & BEM (optional)
  * documentation

If you think a CSS preprocessor will cover for the mistakes you already make, you'd be wrong. A tool used this way will only amplify your misunderstanding. No tool is a replacement for knowledge and experience, but they **can** complement them. I realize this is what that developer meant by preprocessors enabling bad code. Used without care, they do make things worse.

## The Elephant in the Room

One of the biggest arguments made against preprocessors is that they add another layer of abstraction to the development stack. This is absolutely true. However, they also ignore that the popularity of Sass and other CSS preprocessors shows that some devs and teams are **very comfortable** with this extra layer in the face of the perceived gains. [Even Apple](http://blog.kaelig.fr/post/51078221503/apple-is-using-sass-and-theyre-doing-it-wrong), apparently. Here are some other arguments.

### Not Necessary

I read an article by Amber Weinberg: [Why I'm (Still) Against Sass & LESS](http://www.amberweinberg.com/why-im-still-against-sass-less/). It was written last year, so I'm not sure if her opinions have changed. It's still paints a good picture of why CSS preprocessors are still "no sale" for some developers. This argument in particular stuck out for me.

> Let me tell you a secret: CSS is NOT a programming language. The beauty of CSS is that it’s so easy for almost any to pick up quickly and read (though it’s very difficult to actually use it properly for the big stuff). Adding a preprocessor on top just needlessly complicates and adds yet another piece of bloat to an already over bloated workflow.

**She's absolutely right**. Nobody needs a CSS preprocessor. Don't ever make that argument. If you're going to argue for CSS preprocessors, do it honestly. Everyone has a different way of working. It doesn't have to be yours. Now, this point is where we differ.

> Code bloat: nesting, unneeded vendor prefixes, etc etc. Giving up control of the final output means you give up control on cleanliness. Queue Photoshop sliced HTML.

This part in particular isn't on the tool but the developer. Bloated CSS can be written with or without a CSS preprocessor. This is why knowledge of good CSS practices is so crucial. Also, Sass doesn't output anything close to the nightmare that was Photoshop sliced HTML. Like any other compiler, it only outputs what you input. If you give it garbage, it will spit out garbage.

### Forced to Learn a New Syntax

This argument would be perfectly valid if Sass still only had one syntax. The Original Sass (.sass) syntax is lifted from its big bro HAML which, structurally, is very similar to Python. Answering this concern, Sass v3.0 introduced the Sassy CSS (.scss) syntax. Put bluntly, valid CSS is valid SCSS. This significantly lowers the barrier to entry, as the only thing you'd have to learn is the new functionality. This in particular is what made me a Sass convert. I could use the power in a way I understood. And in a way that didn't force me to unlearn what I knew. It's a superset of CSS, rather than its own language.

### Forced to Setup a New Environment

This one is tricky. Unless the tool is really going to help out your workflow, there's really no reason to set up an environment just to use it. However, Sass & LESS' barrier to entry is reduced by the fact that Mac OSX now comes with a host of open-source programming languages and frameworks preinstalled (including Ruby and Rails). Linux distros are much the same. The only developers that would run into the issue of actually setting up are Windows developers. I hop between Windows and Linux, myself. Getting Ruby and Python going on Windows 7 did take some work (Cygwin FTW), but the gains were worth that slight pain.

I understand that in some work environments--and especially with a team, this would be pretty hard to start. I forget sometimes that as a solo act, I have **way** more luxury to explore new technologies and workflows as I want. Many on a team don't have the time or opportunity to explore alternative approaches without some **serious** overhead in training. To that I say: only try a tool if you think it will have a measurable impact on your workflow. If you try a preprocessor and it doesn't speed up your turnaround, don't feel bad about it. Go for what makes you most productive, not the new and shiny just because it's new and shiny.

### I'm Better for Using/Not Using a Preprocessor

I'm not going to spend too much time on this argument, because it reeks of the kind of elitism that's endemic in our field. The reason you can't have a Rails and Django developer in the same room sometimes. It's the same reason I didn't handle the argument with that developer as well as I'd have liked. I read "not real CSS" and just lost my shit. That kind of "enlightened" attitude doesn't do anything for anyone. Bottom line: don't call someone an idiot for not working the way you do. We're all trying to create a better web. The dynamic nature of our industry means the answer to "should I do this?" is usually "It depends."

## The Sass Way

Sass is designed to help you write more efficient CSS with a wealth of tools that, admittedly, seem counterproductive at first. It's really worth repeating: a CSS preprocessor is **only** as good as your understanding of CSS. And at this point, I'd consider my understanding to be pretty damn good. The rest of this post will be a "put up or shut up" demonstration of using effective Sass, and by extension, outputting leaner CSS. The best advice I can give about using Sass is being mindful how you use it until you're more comfortable, and monitor your output to ensure it looks the same as you would write your CSS by hand. Never make your output dependent on Sass for updating.

### Duplication vs. Modularity

#### Detractor Argument: CSS Preprocessors promote code bloat and duplication.

They do when the output isn't monitored. One of the most misused features of Sass are [mixins](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#mixins), which work much like functions. The duplication problem comes when developers try to use them as glorified copy/paste vehicles. Tell me if this looks familiar:


```
@mixin border-main() {
  border: 3px solid #f90;
}

.photo {
  @include border-main;
}


.block {
  @include border-main;
}

form {
  .field {
    @include border-main;
  }
}
```

Code like this perfectly illustrates the duplication problem. The sinister thing is that within Sass it **appears** DRY. This is not so much the case in the output.

```css
/* line 5, duplication.scss */
.photo {
  border: 3px solid #f90;
}

/* line 10, duplication.scss */
.block {
  border: 3px solid #f90;
}

/* line 15, duplication.scss */
form .field {
  border: 3px solid #f90;
}
```

Contrived as the example may be, consider it on a larger scale, and that would be a TON of bloat. Authoring lightweight CSS is in part a matter of recognizing patterns within your code. The OOCSS method would suggest making a separate class for that border, but then our markup would be polluted with presentational classes. If I knew certain styles of my design would be used across modules, I might group the declaration under multiple selectors and leverage the cascade to define more specific modifications for the individual parts. Here's the handwritten way and the Sass way.

```
/*------------------------------------*\
    $MODULARITY
\*------------------------------------*/

// Handwritten CSS. Commented so as to be
// untouched by the compiler.

// .photo,
// .block,
// form .field {
//     border: 3px solid #f90;
// }

// .photo {
//   width: 100%;
// }

// .block {
//   float: left;
// }

// form .field {
//   color: white;
// }
```

```
// Placeholder selector, the great and powerful.
// What it does is very similar to a class.
// You define rules within it, and then it applies
// those styles without you having to add a class to your
// markup. Boom. 

// In this case, the selectors that @extend it are 
// grouped together while leaving the unique properties 
// alone. Just like my handwritten example.
%border-main {
    border: 3px solid #f90;
}

.photo {
    @extend %border-main;
    width: 100%;
}

.block {
    @extend %border-main;
    float: left;
}

form {
    .field {
        @extend %border-main;
        color: white;
    }
}
```

Look ma, no bloat!

```css
/*------------------------------------*\
    $MODULARITY
\*------------------------------------*/
/* line 37, modularity.scss */
.photo, .block, form .field {
  border: 3px solid #f90;
}

/* line 41, modularity.scss */
.photo {
  width: 100%;
}

/* line 46, modularity.scss */
.block {
  float: left;
}

/* line 52, modularity.scss */
form .field {
  color: white;
}
```

My examples show, again, that maintaining duplication and code bloat is the responsibility of the developer whether they write vanilla CSS or not. Also, it should be obvious that you would use the `@extend` directive sparingly. Otherwise, you can easily end up with a selector dogpile. Let's move on.

#### Detractor Argument: Mixins can ignore the spec and fill stylesheets with unused vendor prefixes.

Yes and no. Mixins can pollute your stylesheets with unused vendor prefixes if you have no control over them and they're built incorrectly. However, by curating your own set of mixins to use across projects, you can do some pretty awesome stuff. Especially as mixins can contain other mixins.

<div class="post-body__note">
UPDATE: If, for some reason you're still writing mixins to handle vendor prefixes, you're making it harder on yourself. There are wonderful tools like <a href="http://leaverou.github.io/prefixfree/">Lea Verou's prefix-free</a> and <a href="https://github.com/postcss/autoprefixer">Autoprefixer</a>. They're both absolutely brilliant for that minefield.
</div>

### Nesting Hell

The key to using the features of any preprocessor is **moderation**. The rule of "just because you can do something" very much applies here. Nesting in particular can quickly snowball with an inexperienced CSS author. Let's get one thing straight: this is awful.

```
/*------------------------------------*\
    $NESTING HELL
\*------------------------------------*/

// Don't do this.
nav {
    width: 100%;
    ul {
        list-style: none;
        li {
            color: #0af;
            display: inline-block;
            padding: 0.3em;
            a {
                display: block;
            }
        }
    }
}

// NEVER do this.

section {
    width: 100%;
    .blog {
        width: 50%;
        .post {
            background: white;
            h2 {
                color: red;
            }
            .content {
                border: 3px solid lighten(#0cf, 30);
                .quotation {
                    
                }
                .pull-quote {
                    background: #03f;
                    color: white;
                }
                .definition-list {
                    list-style: none;
                }
            }
        }
    }
}
```

The output is even worse.

```css
/*------------------------------------*\
    $NESTING HELL
\*------------------------------------*/
/* line 6, nesting-hell.scss */
nav {
  width: 100%;
}
/* line 8, nesting-hell.scss */
nav ul {
  list-style: none;
}
/* line 10, nesting-hell.scss */
nav ul li {
  color: #0af;
  display: inline-block;
  padding: 0.3em;
}
/* line 14, nesting-hell.scss */
nav ul li a {
  display: block;
}

/* line 23, nesting-hell.scss */
section {
  width: 100%;
}
/* line 25, nesting-hell.scss */
section .blog {
  width: 50%;
}
/* line 27, nesting-hell.scss */
section .blog .post {
  background: white;
}
/* line 29, nesting-hell.scss */
section .blog .post h2 {
  color: red;
}
/* line 32, nesting-hell.scss */
section .blog .post .content {
  border: 3px solid #99ebff;
}
/* line 37, nesting-hell.scss */
section .blog .post .content .pull-quote {
  background: #03f;
  color: white;
}
/* line 41, nesting-hell.scss */
section .blog .post .content .definition-list {
  list-style: none;
}
```

If you're thinking there's nothing particular wrong with this, it's a misconception that your CSS should reflect your markup structure. This is a terrible idea because of the way browser engines actually read CSS. Exactly why they read selectors from right to left is beyond the scope of this post, but [this is a great explanation](http://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left/5813672#5813672). Either way, this is a specificity nuke, and more often than not encourages abuse of IDs and `!important` in stylesheets. Well-structured CSS, formed with or without a preprocessor, should not require either for styling. My personal rule is to save IDs as general hooks for components I intend to inject with JavaScript behavior and events.

<div class="post-body__note">
UPDATE: The performance of modern browser engines is such that optimizing selectors for performance isn't as huge a deal. However, minimal nesting still has a maintenance advantage.
</div>

A great rule for Sass (and programming in general), be mindful of your structure. When nesting selectors, try not to go more than one level deep. It's not as hard as you might think. Efficient classes, use of global styling, and leveraging the cascade will be enough to keep your CSS maintainable and lean.

### On Variables

Variables are another point of division between preprocessor advocates and detractors. Strictly speaking, most editors do have a find and replace feature and you can keep variable-like references within comments as a guide. The problem, and the reason I find variables useful, is us. For an especially complex design, keeping track of values can be hell. Not only do we have to be mindful of our consistent values, but those working in a team will have to keep the **other members** on track.

The lack of variables in CSS might not be a problem when you're by yourself (and let's be honest, they aren't), but a team would benefit from intelligently named variables. They slightly reduce the potential for human error, especially if you or your team uses an editor with code-hinting. For many capable of well-structured CSS, variables become more of a convenience than the necessity. As I said it would probably be a bad idea to make updating your stylesheets dependent on Sass, I'd recommend something like the following:

```
/*------------------------------------*\
    $VARIABLES
\*------------------------------------*/

//Colors
$ocean-blue: rgba(0, 112, 255, 1);
$ocean-blue-dark: darken($ocean-blue, 13);
$aqua: rgba(0, 214, 255, 1);
$sky-blue: rgba(0, 155, 255, 1);
$sky-blue-dark: darken($sky-blue, 40);
$lime: rgba(138, 255, 0, 1);
$lime-light: lighten($lime, 16);
$lime-dark: darken($lime, 10);
$white: rgba(255, 255, 255, 1);
$white-translucent: rgba($white, 0.6);
$black: rgba(0, 0, 0, 1);


// Borrowed from Pattern Lab
$error : #f00;
$valid : #089e00;

$brand-facebook: #03539e;
$brand-twitter: #35ccff;
$brand-linkedin: #217bc1;
// _______________________

//Typography

$base-font-size: 18px;
$base-line-height: 24px;

$headline-font: "cubano";
$heading-font: "cubano";
$body-font: "freight-micro-pro";
$accent-font: "freight-micro-pro";
$ui-font: "cubano";
$code-font: "ubuntu-mono";

//Layout
$max-width: 82em;

//Borders
$border-hairline: 1px;
$border-med: 3px;
$border-thick: 8px;
$border-super: 15px;
$border-type: solid;

/*_______________________________________________

PALETTE
  $ocean-blue #0070ff;
  $ocean-blue-dark #0053bd;
  $aqua #00d6ff;
  $sky-blue #009bff;
  $sky-blue-dark #001f33;
  $lime #8aff00;
  $lime-light: #afff52;
  $lime-dark #6ecc00;
  $white white;
  $white-translucent rgba(255, 255, 255, 0.6);
  $black black;
  
  $error : #f00;
  $valid : #089e00;

  $brand-facebook: #03539e;
  $brand-twitter: #35ccff;
  $brand-linkedin: #217bc1;

TYPOGRAPHY
  $base-font-size 18px;
  $base-line-height 24px;

  $headline-font "cubano";
  $heading-font "cubano";
  $body-font "freight-micro-pro";
  $accent-font "freight-micro-pro";
  $ui-font "cubano";
  $code-font "ubuntu-mono";


BORDERS
  $border-hairline 1px;
  $border-med 3px;
  $border-thick 8px;
  $border-super 15px;
  $border-type solid;
________________________________________________*/
```

In this way, you have your proper Sass variables and a reference in case you have to abandon Sass and update the compiled CSS directly. Ideally, you'd want to be in a situation where you can work with Sass and never have to touch the compiled CSS (throwing them out of sync), but the ideal situation is not quite reality.

## Final Thoughts

I think the best way to think of CSS preprocessors are as productivity tools. Writing efficient Sass doesn't mean neglecting the practices of writing efficient CSS. Don't be lazy (in the bad way, not the developer way): monitor your output, use your preprocessor's functionality only if it results in leaner output, and account for the quirks of CSS before wielding the power of your tool. Don't let your comfort with a tool supplant what you've been taught without it. Use a preprocessor, or don't use one. Just remember that writing good code is your responsibility. Don't defer it to anyone or anything else.
