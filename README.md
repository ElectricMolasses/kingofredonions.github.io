# bar-chart-project
LHL Stretch Project


## About
Bar chart generator that takes an array of numbers, as well as a js object to gen.

## Examples

![Example 1](/samples/FirstExample.png)
![Example 2](/samples/SecondExample.png)

## User-end API

#### function drawBarChart(data, options, element)
Primary function used to create a bar chart.  
* Data is an array of values for the bars, sub-arrays allow stacked bars.
* Options is a js Object that has a wide array of options for bar chart creation.  More detail on what options are available listed in features.
* Element is the html element you wish to append the bar chart to.

#### function editTitleText(text)
Simple function that takes text and edits the title of the bar chart dynamically, can be set after initial creation.

## Features

* Custom Width/Height.
* Background colour.
* Title text, colour, and size.
* Bar colours.
* Bar label colours.
* Spacing between bars.
* Top/Center/Bottom label alignment.
* Stacked/overlapping bars with the same customization options as standard bars.
* Custom tick intervals along the left side of the chart.
* Custom colours for said ticks.
* Additional optional labels that sit under bars along the bottom of the chart.

## Issues and Bugs

Severly lacking in default values for unused options.

Title functionality that takes up some of the user defined height instead of adding to it, as well as resizing to fit font regardless of size.

Right now if you set the title with two bar charts on the page, it will change both.

Animation is causing bar shadow to pop over the labels, and then disappear once animation completes.

Large values relative to the height property will push through the ceiling of the graph.

Ticks don't seem to show for high values, divs likely being collapsed into 0 height elements.

## Roadmap

Certain functions need to be split into smaller pieces for readability/debugging.  Notably the drawStackedBar function.

Should add functionality to parse strings into the object provided they're JSON.  Unsure whether or not js can do that itself at the moment.

Rework relativeHeight function to work more appropriately with large values.

Rework tick function to work with large values.

Better animation choices for graph, as well as allowing user choice with options object, rather than hard coding them into CSS.

## Resources

Guidance for Doc comments.
https://gomakethings.com/whats-the-best-way-to-document-javascript/

Flexbox guide to assist with spacing/layout
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

Quick search to figure out how to include JQuery
https://code.jquery.com/

JQuery to append to pages
https://www.w3schools.com/jquery/jquery_dom_add.asp

CSS Box Model Reference
https://www.w3schools.com/css/css_boxmodel.asp

Quick Google search to add elements with JQuery, snippet source:
https://www.tutorialrepublic.com/faq/how-to-add-element-to-dom-in-jquery.php

Check if width has a native function or only .css with
https://api.jquery.com/width/

Search to round element corners
https://www.w3schools.com/css/css3_borders.asp

CSS animations lookup
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations

Box shadow lookup
https://www.w3schools.com/cssref/css3_pr_box-shadow.asp

Quick lookup when I realized addId does not exist
https://stackoverflow.com/questions/2176986/jquery-add-id-instead-of-class?rq=1
