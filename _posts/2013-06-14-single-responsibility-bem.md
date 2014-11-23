---
layout: post
title: SRBEM (Single Responsibility BEM)
id: 002
date: 2013-06-14
category: web
tags:
    - BEM
    - OOCSS
    - CSS architecture
src: "http://codepen.io/chatrjr/pen/GJIxr"
description: "Modular CSS is making waves in the community (excuse the cliche). I ended up gravitating toward the BEM class syntax for Object-Oriented CSS. In this post, I attempt to make it more complicated."
excerpt: "Modular CSS is making waves in the community (excuse the cliche). I ended up gravitating toward the BEM class syntax for Object-Oriented CSS. In this post, I attempt to make it more complicated."
---

You may already be familiar with Yandex's BEM method of authoring CSS. If not, it looks a little like the following code.

```language-markup
<div class="block">
    <div class="block__element"></div>
    <div class="block__element"></div>
    <div class="block__element block__element--modifier"></div>
    <div class="block__element"></div>
</div>
```

## Breaking BEM

BEM-style CSS has three major parts:

  * The `.block` is your containing element, your module. It's a component with its own structure and purpose. Within the context of Atomic Design, it would be your molecule.
  * Elements are the internal parts of your block, responsible for holding the structure together and defining its purpose. An example would be `.widget` as your block and `.widget__content` as an element. In the context of Atomic Design, they're your atoms.
  * Modifiers are special classes that you add when you want to modify your block. Let's say you want to make your `.widget__title` bigger. You could do that through a modifier. Example: `.widget__title--emphasize`.

As you can see, there is quite a lot of repeating involved, and that drives me nuts. Even with a tool like Emmet, it can extremely tedious to repeat the block when using BEM-style CSS. However, I think I've found a fix that I will demonstrate through the always awesome Codepen. I think it will be rather effective in reducing the redundancy in BEM-style CSS. Also, it's pretty sweet.

## Single Responsibility BEM

If you're a developer of any kind--software or web, you'll have heard of the Single Responsibility Principle. For those who don't know:

> In object-oriented programming, the single responsibility principle states that every class should have a single responsibility, and that responsibility should be entirely encapsulated by the class. All its services should be narrowly aligned with that responsibility. -- [Wikipedia](http://en.wikipedia.org/wiki/Single_responsibility_principle)

It's also called Curly's Law. It just means that each class should do one thing and not interfere with anything outside of its purpose. I think you can see where we're going with this. The pen is below. The rest of the post will break it down under Single Responsibility BEM. This will take a while to explain, but I hope it will spark something as it did for me. Also note, that Sass makes this much easier to pull off, so that's what I'll be using.

> %post-body_src%
Single Responsibility BEM: [{{ page.src }}]({{ page.src }})

### Responsibility of the Block

The block's job, the module, is to encapsulate all of its elements for a single role. All of the elements are tied to a block, so there's no reason to make that explicit by repeating the block when there's a better way.

```language-scss
.block {
    @include transition(all 0.3s linear);
    background: $white-translucent;
    display: inline-block;
    padding: 0.8em;
    position: relative;
}
```

As you can see, the block is only referenced once and given some base styles. Our elements will live inside the block and have their own **contained** styling. The block will encapsulate its element and not expose them to anything outside of the block, which means you can move the module around as you want. The block basically gives your module its own scope.

### Responsibility of the Element

The elements in your block are what give it form and purpose. They're the content of your module, and that's all they need to be, so we're going to nest them within our block like so:

```language-scss
.block {
    @include transition(all 0.3s linear);
    background: $white-translucent;
    display: inline-block;
    padding: 0.8em;
    position: relative;
    .__headline {
      @include scale('ginormous');
      background: $ocean-blue-dark;
      border-radius: 0;
      color: $white;
      padding: 0.2em;
      text-align: center;
      width: 100%;
    }
    
    .__image {
      width: 100%;
    }
    
    .__content {
      @include scale('xl');
      @include adjust-leading-to(0.95);
      background: rgba($ocean-blue-dark, 0.8);
      color: $white;
      padding: 0.4em;
      position: absolute;
      bottom: 0;
      left: 0;
    }
}
```

You see we have three elements: `.__headline`, `.__image`, and `.__content`. We know they're contained by our block, and they have their own styling. We don't have to repeat `.block` as a prefix to recognize this within our Sass. Now it gets a little interesting. Before that, here's what our unmodified module looks like:

```markup
<section class="block">
  <h2 class="__headline">One Kitten</h2>
  <img src="http://placekitten.com/1200/580" class="__image"></img>
  <div class="__content">One kitten in the snow.</div>
</section>
```

Very simple, eh?

### Responsibility of the Modifier

The modifier's only responsibility is to augment the block or element we pass to it. It doesn't need to do anything else. We're taking advantage of the cascade, so our modifiers will be nested inside its context. As for defining modifiers, I came up with two different methods.

#### Method #1: Class Chaining to Tie the Modifier Directly to the Element

```language-scss
.__headline {
  @include scale('ginormous');
  background: $ocean-blue-dark;
  border-radius: 0;
  color: $white;
  padding: 0.2em;
  text-align: center;
  width: 100%;
  &._--shrinkHeadline {
    @include scale('xl');
  }
  & {
    @extend %_--shrinkHeadline;
  }
}
```

As you can see the modifier, `._--shrinkHeadline`, is nested in the `.__headline` element. The modifier is chained to the element is via Sass' [parent reference selector](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#referencing_parent_selectors). This means it will only affect elements with **both** classes. As the markup shows:

```langauge-markup
<section class="block">
  <h2 class="__headline _--shrinkHeadline">Three Kittens</h2>
  <img src="http://placekitten.com/500/305" class="__image"></img>
  <div class="__content">Three kittens with a mirror.</div>
</section>
```

#### Method #2: The `.augment` Class

When I first tried this method, it was almost like wizardry. The `.augment` is an umbrella class for our modifiers, and we use [placeholder selectors](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#placeholders) to modify its behavior before attaching it to a block or element. Here's how it works:

```language-scss
.augment%_--shrinkText {
    /* Referencing %_--shrinkText */
    @include scale('s');
    @include adjust-leading-to(0.98);
}

.augment%_--shrinkHeadline {
    /* Referencing %_--shrinkHeadline */
    @include scale('xl');
}

.augment%_--shiftHeadline {
  /* Referencing %_--shiftHeadline */
  @include scale('m');
  @include transition(all 0.3s linear);
  border-radius: 2em;
}

.augment%_--imageBorder {
    /* Referencing %_--imageBorder */
    border: 0.5em solid $sky-blue;
}
```

Modifiers are placed near the bottom of our file to leverage the cascade. And then we prefix every modifier with our `.augment` class. The way placeholder selectors work is that you give them an identifier like `%_--imageBorder`. They're like a class, except the CSS within the brackets is **the only thing compiled by Sass**. The identifier never shows up in the output, but our `.augment` class does. In the context of Object-Oriented Programming, this method is a lot like the Facade Pattern: it exposes a simple hook for not so simple actions, masking the underlying complexity for easy use through a single class. Now let's use one.

```language-scss
.__image {
  width: 100%;
  & {
    /* Referencing %_--imageBorder */
    @extend %_--imageBorder;
  }
}
```

We've attached the modifier by extending the `%_--imageBorder` placeholder to the parent selector. What this will do is expose the CSS of our placeholder and attach it to our element under the `.augment` class. Here's the output:

```language-css
/* line 258, style.scss */
.block .augment.__image {
  /* Referencing %_--imageBorder */
  border: 0.5em solid #009bff;
}
```

Our augmenting class in the output is tied to our modifier which is attached to the element it references. `.augment` exposes the modifier to its element and **only** its element. This means we can have its behavior change when it references a different modifier. Check it:

```language-scss
/* line 258, style.scss */
.block .augment.__content {
  /* Referencing %_--shrinkText */
  font-size: 1.3125em;
  line-height: 2em;
  line-height: 1.28625em;
}
```

Same class, **completely different behavior**. Now, how simple is it to use within our markup? This simple.

```language-markup
<section class="block griddler-slice-by4">
  <h2 class="__headline augment">Four Kittens</h2>
  <img src="http://placekitten.com/400/200" class="__image"></img>
  <div class="__content augment">Four kittens exploring.</div>
</section>
```

I had to lift my jaw from the floor.

## Caveats

As always, no method is perfect. Here are some roadblocks associated with this one which may or may not be a problem depending on your work environment.

  * All of this can be hard to pull off easily without Sass.
  * Both modifier methods rely on adjoining classes, which aren't exactly supported in IE6.
  * They may require some degree of education within your team
  * The `@extend` directive can't be used within media queries, last I checked.

Let me know what you think of this approach below. And as always, let me know if I missed something.