---
layout: post
title: "Atomic Design Makes Me Feel Like a Chemist"
id: 001
date: 2013-06-05
tags:
    - atomic design
    - style tiles
    - front-end architecture
description: "Time to brush up on your chemistry with Atomic Design. This post introduces Brad Frost's methodology and Pattern Lab."
excerpt: "Time to brush up on your chemistry with Atomic Design. This post introduces Brad Frost's methodology and Pattern Lab. I explain why it's an awesome approach going forward."
---

UPDATE: This post existed on my old site, which I unceremoniously scrapped a few months ago. I'm sorry, I didn't think it was still in use. Hope you get something from it.

At this year's Beyond Tellerand conference, Brad Frost unveiled a new design system methodology: [Atomic Design](http://www.besquare.me/session/atomic-design/). You should probably watch that if you haven't already. Design systems allow us to build through a recurrent process that we can use across projects. They can be customized to fit a client's, or your own, needs. Design systems represented a shift in workflow as more designers stopped fighting the fluid nature of the web. Before we talk about Atomic Design, we need some background on existing systems.

## Design Systems in the Wild

### Style Tiles

[Style Tiles](http://styletil.es) were proposed by Samantha Warren as a new design deliverable and template that could show design direction without implying layout. It was to be used when moodboards were too vague and mockups too rigid. Of course, I had already embraced designing in the browser and made a very loose approximation of a Style Tile from a template I've used across projects. Very bare bones, but through CSS I could get the general look and feel across to those I asked for feedback. The advantage of building them within the browser allowed a direct translation of styles to the final site. I also lost my mind and made them responsive. You can see the one for this brand and my old one below.

![N&P Style Tile](/post-images/np-interactive-style-tile.png)

![OTC v4 Style Tile](/post-images/otc-v4-interactive-style-tile.png)

### Element Collages

[Element Collages](http://danielmall.com/articles/rif-element-collages/) were proposed by Daniel Mall as an expansion of Style Tiles. Rather than an abstraction of design, element collages are more focused. They're a collection of elements that will actually live on the site that convey the look, feel, and functionality through snapshots of them in use. They're meant to be a complement to Style Tiles (but they can stand alone), and they emphasize having conversations with clients rather than presenting to them. That is, not just telling them where everything is but why it's there. Element Collages can be great aids for that.

### Front-End Style Guides

Anna Debenham, whom I greatly respect, expanded on [the idea of having style guides for front-end developers](http://24ways.org/2011/front-end-style-guides/). This means a hub for developers to work from and test within the context it's going to be used: the web. The benefits are:

  * An easy reference to elements as they exist on a template.
  * A lovely playground for testing and applying different ideas.
  * A shared language among your team while building out the product.
  * An emphasis on building from components and reusable styles.

Of course, the client probably won't be able to make much of it, but it can be a great help to any designers or developers who come in to maintain the project after you.

## Enter Atomic Design

Atomic Design is a realization of designing from components. The methodology has five distinct parts and combines a few of the design systems we've talked about. These parts go from general to the most specific. All under the context of chemistry. We're going to go through pattern lab, a tool released to complement the Atomic Design methodology. [Pattern Lab](https://github.com/bradfrost/patternlab) is an intentionally incomplete hub for your projects. It has a ton of stuff already in it, but Brad wanted it to be easy to extend. It's not a framework, rather it's a launchpad for getting started with Atomic Design systems. It's non-prescriptive and doesn't come with much preset styling. As Brad said in the talk:

> Do that shit yourself.

Now let's dive into the code.

### Setting Up

First of all, take note of Pattern Lab's directory tree. This is rather important.

```language-bash
/var/www/patternlab
├── css
│   ├── scss
│   │   ├── base
│   │   │   ├── _animation.scss
│   │   │   ├── _forms.scss
│   │   │   ├── _global-classes.scss
│   │   │   ├── _headings.scss
│   │   │   ├── _links.scss
│   │   │   ├── _lists.scss
│   │   │   ├── _main.scss
│   │   │   ├── _media.scss
│   │   │   ├── _tables.scss
│   │   │   └── _text.scss
│   │   ├── generic
│   │   │   ├── _mixins.scss
│   │   │   ├── _reset.scss
│   │   │   └── _variables.scss
│   │   └── objects
│   │       ├── _accordion.scss
│   │       ├── _ads.scss
│   │       ├── _article.scss
│   │       ├── _blocks.scss
│   │       ├── _buttons.scss
│   │       ├── _carousels.scss
│   │       ├── _comments.scss
│   │       ├── _footer.scss
│   │       ├── _header.scss
│   │       ├── _icons.scss
│   │       ├── _layout.scss
│   │       ├── _lists.scss
│   │       ├── _main.scss
│   │       ├── _nav.scss
│   │       ├── _sections.scss
│   │       ├── _tabs.scss
│   │       ├── _text.scss
│   │       └── _tooltip.scss
│   ├── static.css
│   ├── style.css
│   └── style.scss
├── data
│   ├── annotations-ck.js
│   └── annotations.js
├── fonts
│   ├── icons.dev.svg
│   ├── icons.eot
│   ├── icons.svg
│   ├── icons.ttf
│   └── icons.woff
├── functions.php
├── images
│   ├── ajax-loader.gif
│   ├── fpo_16x9.png
│   ├── fpo_4x3.png
│   ├── fpo_avatar.png
│   ├── fpo_landscape.png
│   ├── fpo_portrait.png
│   ├── fpo_square.png
│   └── logo.png
├── index.php
├── js
│   ├── init-ck.js
│   ├── init.js
│   └── responsive-nav.min.js
├── patterns
│   ├── 00-Atoms
│   │   ├── 00-Global
│   │   │   ├── 00-Colors.php
│   │   │   ├── 01-Fonts.php
│   │   │   ├── 02-Animations.php
│   │   │   └── 03-Visibility.php
│   │   ├── 00-Text
│   │   │   ├── 00-Headings.php
│   │   │   ├── 00-Subheadings.php
│   │   │   ├── 00-With-Links-Headings.php
│   │   │   ├── 01-Headings-With-Small-Text.php
│   │   │   ├── 01-Paragraph.php
│   │   │   ├── 02-Blockquote.php
│   │   │   ├── 03-Inline-Text-Elements.php
│   │   │   ├── 04-Address.php
│   │   │   ├── 05-Preformatted-Text.php
│   │   │   ├── 06-Time.php
│   │   │   └── 07-HR.php
│   │   ├── 01-Lists
│   │   │   ├── 04-unordered-list.php
│   │   │   ├── 05-ordered-list.php
│   │   │   └── 06-definition-list.php
│   │   ├── 02-Images
│   │   │   ├── 00-logo.php
│   │   │   ├── 01-Landscape-16x9.php
│   │   │   ├── 02-Landscape-4x3.php
│   │   │   ├── 03-Square.php
│   │   │   ├── 07-Avatar.php
│   │   │   ├── 09-Loading-Icon.php
│   │   │   └── 10-Social-Icons.php
│   │   ├── 03-Forms
│   │   │   ├── 00-Text-Fields.php
│   │   │   ├── 01-Select-Menu.php
│   │   │   ├── 02-Checkboxes.php
│   │   │   ├── 03-Radio-Buttons.php
│   │   │   └── 04-HTML5-Inputs.php
│   │   ├── 04-Buttons
│   │   │   └── 00-Buttons.php
│   │   ├── 05-Table
│   │   │   └── 00-Table.php
│   │   ├── 06-Media
│   │   │   ├── 01-Video-Embed.php
│   │   │   └── 02-Audio.php
│   │   └── 07-Unsed
│   │       └── 00-Text
│   ├── 01-Molecules
│   │   ├── 00-Text
│   │   │   ├── 01-byline-author-only.php
│   │   │   ├── 02-byline-author-time.php
│   │   │   ├── 03-Caption.php
│   │   │   ├── 04-Blockquote-With-Citation.php
│   │   │   ├── 04-Pullquote.php
│   │   │   ├── 05-Heading-Group.php
│   │   │   ├── 06-Intro-Text.php
│   │   │   └── 07-Emphasis-Colors.php
│   │   ├── 01-Layout
│   │   │   ├── 00-1-up.php
│   │   │   ├── 01-2-up.php
│   │   │   ├── 02-3-up.php
│   │   │   └── 03-4-up.php
│   │   ├── 02-Blocks
│   │   │   ├── 00-Block-Hero.php
│   │   │   ├── 01-Block-Thumb-Headline.php
│   │   │   ├── 02-Block-Headline-Byline.php
│   │   │   ├── 04-Block-Inset.php
│   │   │   ├── 05-Block-Headline-Only.php
│   │   │   ├── 06-Block-Project.php
│   │   │   ├── 07-Block-Featured-Project.php
│   │   │   └── 08-Block-Large-Inset.php
│   │   ├── 03-Media
│   │   │   ├── 00-Image-With-Caption.php
│   │   │   └── 03-Map.php
│   │   ├── 04-Navigation
│   │   │   ├── 00-Primary-Nav.php
│   │   │   ├── 01-Footer-Nav.php
│   │   │   ├── 02-Pagination.php
│   │   │   └── 03-Tabs.php
│   │   ├── 05-Forms
│   │   │   ├── 00-Search.php
│   │   │   ├── 01-Newsletter-Form.php
│   │   │   └── 05-Comment-Form.php
│   │   └── 06-Components
│   │       ├── 00-Single-Comment.php
│   │       ├── 02-Accordion.php
│   │       └── 03-Social-Share.php
│   ├── 02-Organisms
│   │   ├── 00-Global
│   │   │   ├── 00-Header.php
│   │   │   └── 01-Footer.php
│   │   ├── 03-Article
│   │   │   └── 00-Article-Body.php
│   │   ├── 03-Comments
│   │   │   └── 00-Comment-Thread.php
│   │   ├── 04-Components
│   │   │   └── 00-Carousel-List.php
│   │   └── 05-Sections
│   │       ├── 00-Related-Posts.php
│   │       ├── 01-Recent-Tweets.php
│   │       └── 02-Latest-Posts.php
│   └── 03-Templates
│       ├── 00-Homepage.php
│       ├── 01-Blog.php
│       ├── 02-Article.php
│       └── 03-Portfolio.php
├── README.md
├── styleguide
│   ├── css
│   │   ├── annotations.css
│   │   ├── styleguide.css
│   │   └── styleguide.scss
│   └── js
│       ├── annotations-pattern.js
│       ├── annotations-viewer-ck.js
│       ├── annotations-viewer.js
│       ├── data-saver.js
│       ├── jquery.js
│       ├── styleguide-ck.js
│       └── styleguide.js
├── styleguide.php
└── view.php

39 directories, 145 files
```

Now let's have a look at `functions.php`. If you're planning on setting up Pattern Lab in your development environment (and you should play with it at least once), you may need to tweak this a little.

I guess the way my dev environment is configured made `$root` lack the trailing backslash, which is why I had to include it in the latter two variables before Pattern Lab would work properly. You may not have to do that, just be aware of it. If you don't know much PHP, don't worry. The most relevant part is this function:

```language-clike
<?php 

$root = $_SERVER['DOCUMENT_ROOT']; 

//This changes the root path of the project. It might live at the root or at a subdirectory like /styleguide
$absolutePath = '/patternlab/';

$patternsPath = $root.$absolutePath.'patterns/';

/************** 
Include Function 
Make including files easier. Simply declare the type of fragment you're looking for (atom, molecule, organism, or page) and the name of the file (with no extention)

Takes two variables:
Type: the type of pattern you're looking to include. Options are: atom, molecule, organism, or page
Name: the name of the file
    
************** */

function inc($type,$name) {
    global $patternsPath; 
    global $absolutePath;
    
    $filePath = $patternsPath;

    //Determine which directory to look in based on type: atom, molecule, organism or page
    if($type=='atom') {
        $filePath = $filePath.'00-Atoms';
    } elseif($type=='molecule') {
        $filePath = $filePath.'01-Molecules';
    } elseif($type=='organism') {
        $filePath = $filePath.'02-Organisms';
    } elseif($type=='page') {
        $filePath = $filePath.'03-Pages';
    } else {
        $filePath = $filePath;
    }
    
    
    //Iterate over the appropriate path
    $objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($filePath));
    foreach($objects as $objName => $object){
    
        $pos = stripos($objName, $name);
        
        if ($pos) {
            include($objName); //Include the fragment if the file is found
            break;
        } 
    }
}
```

Lines 22-32 look through the `patterns` directory for the components called through the `inc()` function based on type. It's called like this: `inc([type], [component]);`. Before we extend Pattern Lab with a few extras, we still have to go through what those parts mean. You know them if you watched Brad's talk or remember chemistry class, but we're going to go over them in a practical sense.

### 00-Atoms

Atoms are the building blocks of our universe. On the web they are individual HTML tags like `Link`. They can't be broken down any more without losing meaning. In the Atomic Design chain, they are a point of reference as well as the toolbox from which all other parts of the system are built. I suppose you can think of the collection of atoms as the primordial soup from which a webpage begins to grow.

### 01-Molecules

Molecules are essentially bonded atoms that create a new substance. On the web this can be an unordered list that has bonded with a element to become a menu. In playing around with Pattern Lab, I built two additional molecules. All you have to do is create a file in the category you think is most relevant. In my case that was `02-Blocks`. This is what's in `06-Block-Project.php`:

```language-markup
<div class="block block-project">
    <h2>New Project</h2>
    <p>A description of the project would go here, of course.</p>
</div>
```

I've bound an image, a heading, and a paragraph to a project molecule. I also created a featured project molecule from bonding them in a different way, such as this:

```languge-markup
<div class="block block-featured">
    <div class="b-text">
        <h2 class="headline">Featured Project</h2>
        <p class="excerpt">A description of the project would go here, of course.</p>
    </div>
</div>
```

### 02-Organisms

Organisms are created from a complex system of molecules bonding into even more complex structures through a continuous cycle of chemical reactions, such as the human body. In the context of the web, organism are molecules combined into meaningful structure, like a page header. In that case, you have a logo, navigation, and search form in most cases bonding. Other blocks might combine to create a footer, and different blocks combine to make other sections.

### 03-Templates

Notice how the chemistry terms end here. That's because we're getting into the parts that the client will see. In the `03-Templates` folder, I created `03-Portfolio.php`, and that looks like this:

```language-markup
<div class="g g-5up">
    <div class="gi"></div>
</div>
<div class="g g-3up">
    <div class="gi"></div>
    <div class="gi"></div>
    <div class="gi"></div>
    <div class="gi"></div>
    <div class="gi"></div>
    <div class="gi"></div>
</div>
```

![Portfolio Template](/post-images/pattern-lab-project-template.png)

From different components I built that portfolio template. The beauty of Pattern Lab is that you're not limited to what's in the box. The box is as large or small as you want to make it. I built this template in about 5 minutes thanks to the flexibility of Atomic Design. It's not very visually appealing when starting with Pattern Lab, but that's our job. The templates can be presented to the client for immediate feedback before they become pages.

### 04-Pages

Pages are self-explanatory: they are the templates given context. In other words, they're the website in all its glory. I had to create the folder myself in Pattern Lab, but that was likely the expectation. There's still a lot to play with here, and I'm going to dive into it over the weekend. Also, if you're curious, this is the result of my screwing around.

![Pattern Lab Page](/post-images/pattern-lab-project-page.jpg)

## The Potential of Atomic Design

Building from components is a lot like working with LEGO bricks. The very idea of Atomic Design takes this further than I could have ever thought. Just the little I was able to do with this in an afternoon has me excited about yet another design system. I hope my stupid little experiment with it inspires you to play with Pattern Lab and put it to good use. Brad Frost, Dave Olsen, and everyone involved in its creation are awesome. I can't wait to see what everyone does with it. What do you think about the potential here? Will you be using it? As always, let me know if I made a mistake.