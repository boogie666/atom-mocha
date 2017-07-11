# atom-mocha package

[![Join the chat at https://gitter.im/boogie666/atom-mocha](https://badges.gitter.im/boogie666/atom-mocha.svg)](https://gitter.im/boogie666/atom-mocha?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Dependency Status](https://david-dm.org/boogie666/atom-mocha.svg)](https://david-dm.org/boogie666/atom-mocha)

[![devDependency Status](https://david-dm.org/boogie666/atom-mocha/dev-status.svg)](https://david-dm.org/boogie666/atom-mocha#info=devDependencies)

atom-mocha is an Atom package that allows you to run Mocha tests easily from within Atom. It has a sleek UI that displays the test results.

![atom-mocha usage](https://raw.githubusercontent.com/boogie666/atom-mocha/master/screenshots/atom-mocha.gif)

atom-mocha is a rather unique Atom package, as it uses [React](https://facebook.github.io/react/) + [Redux](http://rackt.org/redux/index.html) for the UI, which makes it render very quickly.

Unlike other Mocha packages for Atom, atom-mocha doesn't use your local version of Mocha. It uses a bundled version to ensure compatibility. Support for local versions of Mocha may come later.


# Features

- Tests can be run from almost anywhere, with convenient shortcuts
    - File context menu (\*.js) (Run Test)
    - Folder context menu (Run Tests)
    - ALT  + SHIFT + T (Run Test - Current File)
    - CTRL + SHIFT + R (Re-run last test)
- Test output UI
    - Allows you to jump from a particular test to the definition line in your test file.
    - Statistics view view with elapsed time and number of passed/failed/pending tests


# Contributing

Feel free to fork this project and submit pull requests.
I'd be more then happy to have people contribute to this nifty little tool I've been working on :)
