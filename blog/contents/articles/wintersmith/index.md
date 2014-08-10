---
title: "Wintersmith: A Static Site Generator"
date: 2013-12-22
---
Static site generators have become really popular recently, so much so that one [Hacker News](https://news.ycombinator.com/item?id=5388973) comment called it "the next 'hello world' when learning a new language". Rather than using Wordpress or some other blog-creating site, I decided to try a static site generator and see how far I could get with my limited web-development knowledge.

## Wintersmith
I came across [Wintersmith](http://wintersmith.io), which is written with [Node.js](http://nodejs.org) in [CoffeeScript](http://coffeescript.org), both of which are languages that I've recently had an interest in. Also, posts are written in Markdown, which I also have a recently-discovered love of. It has a very nice plug-in system, and uses [Jade](http://jade-lang.com) for templating. 

Even with minimal exposure to Node, Jade, and web development in general, Wintersmith is quite easy to set up:

`npm install wintersmith -g`

And then to create a website: 

`wintersmith new <path>`

This creates a basic website skeleton:

* **contents**, a folder that holds each post and it's images in a separate file
* **templates**, a folder that holds the `.jade` files that are used to build the site
* **config.json**, a file that holds configuration information and local variables

All of which is quite intuitive and easy to use. Another incredibly convenient feature of Wintersmith is it's previewing feature:

`wintersmith preview`

Wintersmith uses Node to create a local http server which allows you to see any changes to your site instantly just by looking at `127.0.0.1:8080` in your browser. As a lifetime Windows user, it was a new experience to be able to change some config file or stylesheet and see it instantly updated with a refresh. 

Setting up Wintersmith was actually a great learning experience for me, from fixing a bug in Jade, a language that I've never previously heard of before (the github repo uses `!!! 5` rather than `doctype html`, the former of which is deprecated) to just messing around with the stylesheet and seeing the changes through the whole site. It also helped me brush up a lot on my CSS and HTML skills as well as giving me great exposure to Jade. 

Finally, the results are just amazing. The site loads quickly and looks beautiful. I'm looking forward to improving the site and adding more as time goes on. Wintersmith is intuitive and easy to set up, while being fast and extensible. I would highly recommend it. You can find the source for my blog on [GitHub](http://www.github.com/victorvation/blog.victorszeto.com/).