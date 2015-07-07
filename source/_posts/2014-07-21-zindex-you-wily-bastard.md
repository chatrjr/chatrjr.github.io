---
layout: post
redirect_from: "/2014/07/zindex-you-wily-bastard/"
title: "Z-Index, You Wily Bastard"
id: 010
language: scss
categories: web
date: 2014-07-21
tags:
    - CSS
    - sass lib
    - z-index
    - methodology
description: "Assauge your z-index woes and learn stack context organization in this post."
excerpt: "Assauge your z-index woes and learn stack context organization in this post. I even throw in Zindex, a Sass library inspired by Jackie Balzer, to help you banish \"z-index: 99999\" for good."
---

<!-- toc -->

<div class="post-body__note">
I recommend you read <a href ="http://www.smashingmagazine.com/2014/06/12/sassy-z-index-management-for-complex-layouts/" title="Sassy Z-Index Management for Complex Layouts">Jackie Balzer's excellent article</a> about z-index and stacking context management. I'll explain best as I can, but it helps to have her ideas in mind.

Also, this is one of my longer posts.
</div>


## The Problem

Z-index has proven itself to be one the trickier aspects of CSS even among the **many** tricky parts of it. Stacking context can get hairy if you lose track of it. Layer collisions are all too common and irritating in their frequency. Before I show you my solution, we need to dive a little deeper into the main issues.

### Losing the Stack Context

This is the well from which many z-index woes spring, full-formed and terrible.

As Jackie mentions in her post, it most often plagues complex layouts where you have to keep track of the way multiple elements stack. It isn't as simple as monitoring z-index, though. This is even further complicated---as CSS often is---by teams. Without a way to track the stack context, you will collide with already occupied indexes like Green Lantern collides with this skyscraper.

<figure>
  <img src="/post-images/hal-jordan-catching-a-beating.gif" alt="Hal Jordan catching a beating.">
  <figcaption>Aaand there's your layout.</figcaption>
</figure>

### Collision

If two elements occupy the same z-index, the one that appears later in the document flow will take precedence. Have a look at the following markup.

```markup
<div class="ctx-a">
  <div class="title">
    <h1 class="title-main">1 & 3 Collide Z-indexes</h1>
    <p class="title-sub">3 overtakes 1 because it renders later in the document.</p>
  </div>
  <div class="layers-a">
    <div class="layer a-layer-1">Layer 1</div>
    <div class="layer a-layer-2">Layer 2</div>
    <div class="layer a-layer-3">Layer 3</div>
    <div class="layer a-layer-4">Layer 4</div>
  </div>
</div>
```

It's pretty straightforward, but this is the part that's important. Say we have four classes to manage z-index on four different levels. Let's also have an element already occupying an index.

```css
.zindex-level-4 {
  z-index: 4;
}

.zindex-level-3, 
.a-layer-1 {
  z-index: 3;
}

.zindex-level-2 {
  z-index: 2;
}

.zindex-level-1 {
  z-index: 1;
}
```

Now let's say someone, maybe even you or me, forgets that these classes exist and hard codes the value into a selector.

```css
.a-layer-3 {
  z-index: 3; /* What happens now? */
}
```

This will cause the element that renders later in the document to overtake its sibling. I'll say this again: **source order matters**.

![Z-index collision between two elements.](/post-images/z-index-collision.png)

Here's a test case where we switch the source so Layer 1 comes after Layer 3. Now it's Layer 1 that holds the rendering advantage.

![Z-index collision between two elements.](/post-images/z-index-collision_source-order.png)

How do you keep z-index collisions from further complicating this irritating CSS property? Reading the spec helps, but [this article from Philip Walton][PW] is a great place to start on the subtle ways the stack is affected that have nothing to do with z-index.

### Organization Issues

The "z-index: 99999" hack is to z-index what `!important` is to specificity: it's the nuclear option. The **last resort** when we're frustrated. The remedy is awareness of our habits and knowledge of how things work under the browser hood. We know we want to avoid index collision, because it makes things harder when we get tripped up by the other hidden qualities of the the stack context. 

## The Potential Solution

The answer is that we need better z-index organization, but how? One way is to set aside classes to manage z-index, but that can potentially lead to bloat. [Chris Coyier already has an idea to use grouping][CC] as they do in games programming, and it's a pretty sound solution.

Human error is unavoidable, so a solution will never be perfect. Our best bet is minimize the chance of error.

### Stepping

So what is stepping? It's simply setting your z-indexes at an interval to reduce the chance of colliding with occupied indexes. What I do in my usual workflow is set up classes for a different level of the stacking context and step over indexes by an interval of 2--5, something to allow breathing room without pushing the big, red button.

```css
.zindex-sublevel-4 {
  z-index: -8;
}

.zindex-sublevel-3 {
  z-index: -6;
}

.zindex-sublevel-2 {
  z-index: -4;
}

.zindex-sublevel-1 {
  z-index: -2;
}

.zindex-level-1 {
  z-index: 2;
}

.zindex-level-2 {
  z-index: 4;
}

.zindex-level-3 {
  z-index: 6;
}

.zindex-level-4 {
  z-index: 8;
}
```

I cover the upper and lower levels by a range of (usually) 4 levels. Most of time, I barely break double digits let alone drop "z-index: 99999." That said, I'm just a lone developer who usually builds simple things. Systems and methodology aren't difficult to maintain when you don't have to deal with anyone's idiosyncrasies but your own.

That's why I spent the weekend trying to develop a solution that **might** scale with teams and works as a shortcut for my usual methods. For this, I turned to the magic of Sass.

## This is Zindex

Zindex uses the stepping method, and my budding understanding of how the stack context works, to serve as a relatively painless tool for managing z-index. I'm not entirely sure it counts as a library, because it's so damn tiny.

### zindex-set-stack-for

This function creates a map from a `$root` (usually the parent element) and establishes indexes to be applied to it. The `$depth-limit` sets how deep you want the indexes to go, while `$step` is your z-index interval.

```
@function zindex-set-stack-for($root, $depth-limit, $step) {
  $root-id: (context: $root);
  $map: ();
  // Negative z-index
  @for $enum from $depth-limit through 1 {
    @if $root == body {
      $map: map-merge($map ,("zindex-sublevel-#{$enum}": -($step * $enum)));
    } @else {
      $map: map-merge($map ,("#{$root}-sublevel-#{$enum}": -($step * $enum)));
    }
  }
  // Positive z-index
  @for $enum from 1 through $depth-limit {
    @if $root == body {
      $map: map-merge($map ,("zindex-level-#{$enum}": $step * $enum));
    } @else {
      $map: map-merge($map ,("#{$root}-level-#{$enum}": $step * $enum));
    }
  }
  $map: map-merge($root-id, $map);
  @return $map;
}
```

Internally, it generates a map from your context using your `$root` as its namespace unless you pass in `body`. If you do, then the function will create a generic namespace on the assumption that your context is document-wide.

### zindex-generate-stack

This mixin takes a `$zindex-map` (though you could pass in a map directly) and outputs the range of z-indexes. By default, it creates classes unless you set `$placehold` to `true`. Then it will create the range as a set of placeholders you can extend into your elements.

```
@mixin zindex-generate-stack($zindex-map, $placehold: false) {
  @each $level, $depth in $zindex-map {
    @if $level  == context {
      /*=====================\
      |  #{map-get($zindex-map, $level)} z-index map 
      \*====================*/
    } @else {
      @if $placehold {
        %#{$level} {
          z-index: $depth;
        }
      } @else {
        .#{$level} {
          z-index: $depth;
        }
      }
    }
  }
}
```

## Using Zindex

Let's wrap this up with a quick primer on using Zindex. There's an [example file bundled with the repo][ZR], and if that's not enough, check out my test cases.

<div class="post-src">
  Zindex Test Cases: <a href="http://codepen.io/chatrjr/pen/JrLIt">http://codepen.io/chatrjr/pen/JrLIt</a>
</div>

### Basic Use Case

The demo is closer to real-world use cases, so we'll work from that. Assume we have the following markup.

```markup
<div class="ctx-b">
  <div class="title">
    <h2 class="title-main">2 & 4 Z-index Set</h1>
    <p class="title-sub">Confirm that 2 has a greater z-index than 4.</p>
  </div>
  <div class="layers-b">
    <div class="layer b-layer-1">Layer 1</div>
    <div class="layer b-layer-2">Layer 2</div>
    <div class="layer b-layer-3">Layer 3</div>
    <div class="layer b-layer-4">Layer 4</div>
  </div>
</div>
```

Now, we set up a stack with Zindex. Let's set a variable and create a stack context with a `$root` of layers-b, a `$depth` of 4, and step over 3 indexes at a time. Here's how it's set in the demo.

```
$stack-ctx-b: zindex-set-stack-for(layers-b, 4, 3);
```

The map is created, but we can't do anything with it until we pass it to the mixin to generate our classes.

```
@include zindex-generate-stack($stack-ctx-b);
```

Now we have our classes, attached to a convenient namespace, that we can use as we see fit.

```css
/*=====================\
|  layers-b z-index map 
\*====================*/
.layers-b-sublevel-4 {
  z-index: -12;
}

.layers-b-sublevel-3 {
  z-index: -9;
}

.layers-b-sublevel-2 {
  z-index: -6;
}

.layers-b-sublevel-1 {
  z-index: -3;
}

.layers-b-level-1 {
  z-index: 3;
}

.layers-b-level-2 {
  z-index: 6;
}

.layers-b-level-3, .b-layer-4 {
  z-index: 9;
}

.layers-b-level-4, .b-layer-2 {
  z-index: 12;
}
```

Finally, we can extend our classes to the elements whose z-index we want to change. Which you see I've already done.

```
.b-layer-2 {
  @extend .layers-b-level-4;
  &:after {
    content: "z-index: 12";
  }
}

.b-layer-4 {
  @extend .layers-b-level-3;
  &:after {
    content: "z-index: 9";
  }
}
```

And this is our result.

![Zindex Demo: Layers B](/post-images/zindex-demo-layers-b.png)

The advantage here is that you can use these classes to avoid setting hard values. The namespace also means you'll remember which context you're working within and won't have to guess. If Zindex was made for one thing, it's better organization.

### Manipulating Child Elements

The demo also shows how you can work with elements that have children. Specifically by setting one context on the parents, and another on the children, we can minimize any headaches that might come of setting their z-indexes. Let's say we're working with this markup.

```markup
<div class="ctx-d">
  <div class="title">
    <h2 class="title-main">Set Context on Parents 1 & 4</h1>
    <p class="title-sub">Change it on children 3 & 4.</p>
  </div>
  <div class="layers-d">
    <div class="layer d-layer-1">Layer 1
      <div class="layer child-d-layer-1">Child Layer 1</div>
    </div>
    <div class="layer d-layer-2">Layer 2
      <div class="layer child-d-layer-2">Child Layer 2</div>
    </div>
    <div class="layer d-layer-3">Layer 3
      <div class="layer child-d-layer-3">Child Layer 3</div>
    </div>
    <div class="layer d-layer-4">Layer 4
      <div class="layer child-d-layer-4">Child Layer 4</div>
    </div>
  </div>
</div>
```

Using Zindex, we would set the parent and child contexts like this. By giving the child a step interval of 6, we make it even more unlikely we'll see a collision.

```
$stack-ctx-d: zindex-set-stack-for(layers-d, 4, 5);
$stack-ctx-d-child: zindex-set-stack-for(layers-d-child, 4, 6);
```

This time, I ended up generating the stack with placeholders. A parent and child stack might be too much for the class method.

```
// Placeholder method 
@include zindex-generate-stack($stack-ctx-d, true);
@include zindex-generate-stack($stack-ctx-d-child, true);
```

For the demo, I changed the z-indexes of 1 and 4 based on the parent context. Then, the indexes of child elements 3 and 4.

```
.d-layer-1 {
  @extend %layers-d-level-4;
  &:after {
    content: "z-index: 20";
  }
}

.d-layer-4 {
  @extend %layers-d-level-2;
  &:after {
    content: "z-index: 10";
  }
}

.child-d-layer-3 {
  @extend %layers-d-child-level-4;
  &:after {
    content: "z-index: 24";
  }
}
```

The result: we end up with child element 3 stacked highest, then parent element 1 carrying its child with it, and finally parent element 4 below them.

![Zindex Demo: Layers D](/post-images/zindex-demo-layers-d.png)

I'll admit a weekend was probably too long to spend fighting one CSS property, but if this little tool helps someone throw out "z-index: 99999" for good, it's completely worth it.

## Conclusion

<figure>
  <img src="/post-images/vegeta.jpg" alt="Vegeta: Prince of Saiyans">
  <figcaption>No more z-index values over 9000</figcaption>
</figure>

[PW]: http://philipwalton.com/articles/what-no-one-told-you-about-z-index/ "What No One Told You About Z-Index"
[CC]: http://css-tricks.com/handling-z-index/ "Handling z-index"
[ZR]: https://github.com/chatrjr/sass-zindex/blob/master/zindex-example.scss