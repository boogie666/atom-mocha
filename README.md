# atom-mocha package

[![Join the chat at https://gitter.im/boogie666/atom-mocha](https://badges.gitter.im/boogie666/atom-mocha.svg)](https://gitter.im/boogie666/atom-mocha?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Dependency Status](https://david-dm.org/boogie666/atom-mocha.svg)](https://david-dm.org/boogie666/atom-mocha)

[![devDependency Status](https://david-dm.org/boogie666/atom-mocha/dev-status.svg)](https://david-dm.org/boogie666/atom-mocha#info=devDependencies)


Me: atom-mocha is a plugin for running tests with mocha, from atom.

You: I kinda' figured that out, thx Captain Obvious.

Me: But how you ask?!?!?!

You: No I didn't.

Me: Good questions.

Here's a nice gif of how it works.

![atom-mocha usage](https://raw.githubusercontent.com/boogie666/atom-mocha/master/screenshots/atom-mocha.gif)

Me: What cool tech is in here, I hear you ask?!?!

You: ehm..

Me: My my, what a curious fellow you seem to be?!

This plugin is written a bit differently then others, I like to think.
Sure the main entry point has to be made with Atom's API.
But everything else is [React](https://facebook.github.io/react/) + [Redux](http://rackt.org/redux/index.html).

A nice benefit of using benefit of using Redux is that it need immutability.
So all state in this package is immutable and changes atomically (see what I did there :P )


Another different thing from other atom mocha plugins (at least that I've noticed)
is that atom-mocha does not even try to use 'your' local version of mocha.
It bundles it in. Although this might change in the future.

You see the problem with using a local version of mocha is that atom-mocha might
not work as expected, and there would be no way to assure it does.
By bundling the a version of mocha with this package atom-mocha can ensure that it
can run properly.


# Features

You: Ok ok... that's all well and good but can you tell what this thing can do?

Me: Ofc. Here's a small list a features.

- Can run tests from just about anywhere
    - context menu on .js files (Run Test)
    - context menu on folder (Run Tests)
    - ALT  + SHIFT + T (Run Test - Current File)
    - CTRL + SHIFT + R (Re-run last test)
- Navigate to source from stack trace (click on the trace item)
- Tree view of tests
- Nice little stats view (in the top right corner) with elapsed time and number of passed/failed/pending tests


# Installation

You: hmm, not bad. But how do I install it?

Me: Glad you asked.

~~For now installation is a bit trickier then regular packages, since its not published.~~

~~cd <somewhere where you want to have the package>~~
~~git clone https://github.com/boogie666/atom-mocha.git~~
~~cd atom-mocha~~
~~apm install~~

~~And you should be good.~~

~~Me: I hope to get the package published soon, just as soon as I figure out how :)~~

It's the regular way now :)

# Contributing

You: Can I help?

Me: Sure.


Fork and submit pull requests.
I'd be more then happy to have people contribute to this nifty little tool i've been working on :)
