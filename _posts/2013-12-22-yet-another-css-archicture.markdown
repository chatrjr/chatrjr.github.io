---
layout: post
title: "YACSSA (Yet Another CSS Architecture)"
author: Chatman Richmond Jr.
id: 010
date: 2013-12-22
description: "This time, I'll share the way I've been structuring my CSS. Because we absolutely need another of those articles. :P"
excerpt: "This time, I'll share the way I've been structuring my CSS. Because we absolutely need another of those articles. :P This is YACSSA. Enjoy."
---

## Credit Where Credit is Due

First off, I wouldn't have thought of this without [Robin Rendle's article on Smashing Magazine](http://coding.smashingmagazine.com/2013/08/02/other-interface-atomic-design-sass/). Additionally, I have to credit [Brad Frost's Atomic Design methodology](http://bradfrostweb.com/blog/post/atomic-web-design/), Yandex's BEM class syntax as well as Harry Roberts for [making it digestible](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), and [Nicole Sullivan's OOCSS](https://github.com/stubbornella/oocss/wiki) along with [Jonathan Snook's SMACSS](http://smacss.com/). They made me think differently about structure, CSS, and transformed the way I build on the web. You should definitely check out those links.

## What is YACSSA?

<abbr title="Yet Another CSS Architecture">YACSSA</abbr> is a mashup of the lessons I took from the above approaches. I call it YACSSA because there are already a lot of ways to structure CSS, and I'm just adding to the pool. There's nothing especially new here, the core of YACSSA is in its file structure. It's made of a few set directories with their own job. To illustrate how YACSSA works, I'm going to use this very blog's CSS.

## Benefits of YACSSA

This architecture has a few benefits that apply no matter the size of your site, and a few that would mostly help larger ones.

### Reusable

Like most developers, I'm pretty lazy. Since YACSSA works by defining general to specific styling à la SMACSS with Atomic Design's file structure, there are quite a few constructs you can use across projects.

### Scalable

YACSSA is designed to help inform a site's growth from small to large, if need be. Styling can be added at the same pace as new components and sections of your site. The architecture is made to be used long term. It's way too much to set up for one-off projects.

### Adaptive

YACSSA should be made your own. The parts of its anatomy are optional. Even the directory names are optional. Just be wary of getting too clever. Like Atomic Design, it isn't meant to prescribe a single way to do things.

### Modular

YACSSA is fragmented by design. It's made to let you add and remove parts at will. This means you can add the styles that apply to a certain template and __only__ that template. This will cut the size of your CSS tremendously and prevent unused styling.

## Anatomy of YACSSA

As I said, I'm going to explain the idea behind YACSSA through this site's CSS. Let's look at the whole directory tree first, and then break it down.

```bash
..
├── main.css
├── post.css
└── scss
    ├── components
    │   ├── _blog.scss
    │   ├── _pagination.scss
    │   └── _post.scss
    ├── configuration
    │   ├── _grid.scss
    │   ├── _mixins.scss
    │   ├── _syntax.scss
    │   └── _variables.scss
    ├── main.scss
    ├── materials
    │   ├── _links.scss
    │   ├── _main.scss
    │   ├── _media.scss
    │   └── _text.scss
    ├── post.scss
    ├── structures
    │   ├── _article.scss
    │   ├── _blogreel.scss
    │   ├── _footer.scss
    │   └── _header.scss
    └── utilities
        ├── _layout.scss
        ├── _normalize.scss
        └── _tweaks.scss

6 directories, 22 files
```

The first thing you'll notice is a shitton of partials. These are globbed into Sass files that compile into the CSS that is actually called. Now, let's have a look at those directories.

### Configuration

```bash
configuration
├── _grid.scss
├── _mixins.scss
├── _syntax.scss
└── _variables.scss

0 directories, 4 files
```

The `configuration` directory contains all of the general properties and third-party styling that your site relies on. You define your variables, mixins, custom syntax for pygments (if you're using Jekyll), Prism.js or whatever. This site also uses the Singularity grid system, so I've also included that. This directory holds the __uniform settings for your project__.

### Utilities

```bash
utilities
├── _layout.scss
├── _normalize.scss
└── _tweaks.scss

0 directories, 3 files
```

The `utilities` directory contains the basic plumbing of your site. That is, layout and structure, resets (though you could put that in configuration, too), other general classes, and hotfixes that come up during a project's lifetime. Unlike configuration, these files aren't likely to be removed or changed across pages.

### Materials

```bash
materials
├── _links.scss
├── _main.scss
├── _media.scss
└── _text.scss

0 directories, 4 files
```

The most general styling for your project goes in the `materials` directory. Here's where your defaults for text, media (images and video, __not__ the media object), link styling, etc. would go. Basically, any CSS that __uses tag selectors goes here__.

### Components

```bash
components
├── _blog.scss
├── _pagination.scss
└── _post.scss

0 directories, 3 files
```

Components are the bread and butter of many modern CSS architecture frameworks, and this one is no different (though it also isn't a framework). These are the modules that may be needed across pages. They are your post listings, image galleries, carousels, buttons, and comments. The pieces of __semantic content you mix and match across pages__ are components. It might help to paste the markup in a comment to help new developers.

### Structures

```bash
structures
├── _article.scss
├── _blogreel.scss
├── _footer.scss
└── _header.scss

0 directories, 4 files
```

The `structures` directory is for styling the sections of your pages that glue your components together and categorize them. That is, your headers, footers, sidebars, and wrapping classes. Basically, if you have a structure that __wraps or groups components__, the CSS would go here.

### Augments?

Missing from this project is the `augments` directory, because I didn't need it. This directory is responsible for all of your JavaScript specific classes, states, and animations: __enhancements that you apply programmatically__.

## Page Files

These are what will be delivered to the browser. They have a table of contents, and then the import statements for all the other parts, going from general to specific. Here are the Sass files for the main and post templates for example.

```scss
/**
 * Expletive Deleted - Main
 * Author: Chatman Richmond Jr.
 * Copyright: 2013
 * Version: 2.0.0
 *--------------------------------------------------------------
 *
 * TABLE OF CONTENTS
 *    CONFIGURATION ===================== Configurable guidelines
 *      VARIABLES
 *      MIXINS
 *      GRID........................Singularity
 *    UTILITIES ========================= Basic plumbing
 *      NORMALIZE...................Consistent default styling
 *      TWEAKS......................Clearfixes, hidden text, etc.
 *      LAYOUT......................Grid structure
 *    MATERIALS ========================= Global styling
 *      MAIN
 *      TEXT
 *      LINKS
 *      MEDIA
 *    COMPONENTS ======================== Modules, unique
 *      BLOG
 *      PAGINATION
 *    STRUCTURES ======================== Main site fixtures
 *      HEADER
 *      BLOGREEL
 *      FOOTER
 **/

////////////////////
// $CONFIGURATION //
////////////////////

@import 'configuration/variables';
@import 'configuration/mixins';
@import 'configuration/grid';

/*==================*\
   $UTILITIES
\*==================*/

@import 'utilities/normalize';
@import 'utilities/layout';

/*==================*\
   $MATERIALS
\*==================*/

@import 'materials/main';
@import 'materials/text';
@import 'materials/links';
@import 'materials/media';

/*==================*\
   $COMPONENTS
\*==================*/

@import 'components/blog';
@import 'components/pagination';

/*==================*\
   $STRUCTURES
\*==================*/

@import 'structures/header';
@import 'structures/blogreel';
@import 'structures/footer';
```

```scss
/**
 * Expletive Deleted - Post
 * Author: Chatman Richmond Jr.
 * Copyright: 2013
 * Version: 2.0.0
 *--------------------------------------------------------------
 *
 * TABLE OF CONTENTS
 *    CONFIGURATION ===================== Configurable guidelines
 *      VARIABLES
 *      MIXINS
 *      GRID........................Singularity
 *      SYNTAX......................Pygments syntax highlighter
 *    UTILITIES ========================= Basic plumbing
 *      NORMALIZE...................Consistent default styling
 *      TWEAKS......................Clearfixes, hidden text, etc.
 *      LAYOUT......................Grid structure
 *    MATERIALS ========================= Global styling
 *      MAIN
 *      TEXT
 *      LINKS
 *      MEDIA
 *    COMPONENTS ======================== Modules, unique
 *      POST
 *    STRUCTURES ======================== Main site fixtures
 *      HEADER
 *      ARTICLE
 *      FOOTER
 **/

////////////////////
// $CONFIGURATION //
////////////////////

@import 'configuration/variables';
@import 'configuration/mixins';
@import 'configuration/grid';
@import 'configuration/syntax';

/*==================*\
   $UTILITIES
\*==================*/

@import 'utilities/normalize';
@import 'utilities/layout';

/*==================*\
   $MATERIALS
\*==================*/

@import 'materials/main';
@import 'materials/text';
@import 'materials/links';
@import 'materials/media';

/*==================*\
   $COMPONENTS
\*==================*/

@import 'components/post';

/*==================*\
   $STRUCTURES
\*==================*/

@import 'structures/header';
@import 'structures/article';
@import 'structures/footer';
```

Notice that they only import the files they actually need which, again, prevents unused CSS and keeps the file size down.

## Conclusion

The way YACSSA is designed means that it will benefit those who use content management systems, or otherwise conditionally load stylesheets the most. The architecture is made to grow with your project and make it easy for others and yourself to maintain it. I hope you got something from reading this, whether you decide to use it or not.

[Hit me up on Twitter](http://twitter.com/ChatRJr) if you want to talk about it some more, especially if you noticed an oversight on my part.