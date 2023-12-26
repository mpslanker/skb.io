+++
title = 'Creative Coding'
date = '2023-12-26T22:05:12Z'
authors = ['mslanker']
description = ''
draft = false
+++

I have always been interested in art.  When I was younger I took my sketchbook and pencils everywhere I went.
So, it is no surprise that I am still fascinated by art, especially computer generated art.

Now I have been aware of the creatve coding community and generative art for a while now but I never really tried my hand at it.  Sure, I dabbled here and there but the math often felt beyond me and often I would sit and stare at a blank text editor at a complete loss.

Recently that has all changed.  I stumbled upon a tool called [Ronin](https://github.com/hundredrabbits/Ronin).  That links to the GitHub page.  If you'd like to try this tool click here: [Ronin demo](https://hundredrabbits.github.io/Ronin).  While I am not a huge fan of the Lisp programming language, I was able to pick it up enough to play around.  (I also got greatly annoyed but the text editor and ended up ripping it out and replacing it the [monaco editor](https://github.com/microsoft/monaco-editor) but that is a story for another post.)  It was a lot of fun just tinkering and trying different values and equations to see what appeared on the screen.  The near instant visual feedback was refreshing and it inspired me to dust off my Processing book and download their latest Processing IDE.  It just so happens that along the way I ran across something called "[strange attractors](https://en.wikipedia.org/wiki/Attractor#Strange_attractor)".  I hadn't heard of them before but they looked really cool and so I did a little bit of reading and set about trying to create one in Processing.  It took me a while to get something working.  After all, I had to start out by learning how to get pixels on the screen.  Thankfully Processing is designed to make this easy regardless of your experience level with programming.

After a few hours of typeing and swearing I finally managed to get something on the screen that looked like these attractors that I was seeing.  I had started with the Lorenz attractor as it was the first one I had come across and seemed simple enough.  Afterward I quickly moved on to the Aizawa attractor and eventually got it working as well.  Along the way I had to learn more about 3D graphics and rendering.  I also had to figure out how to add a camera component to enable moving the object about and even rotating it to see different angles.  You can see my results here: [Aizawa attractor](https://github.com/slaro/p5js-aizawa-attractor).  Granted mine are nowhere near as pretty and as impressive as [jcponce's](https://www.dynamicmath.xyz/strange-attractors/) or Chaotic [Atmosphere's](https://chaoticatmospheres.com/mathrules-strange-attractors) but I was happy that I had made significant progress in a single night.

I fully plan to go on and explore how to integrate particle effects as seen in jcponce's version.  However, I took my time to reimplement these in Python and then again in p5.js (the JavaScript variant of Processing) to not only help cement my understand but latter helps make it easier to put them on the web.

I will hopefully have created a few more before too long and will be sure to update this article with the links.
