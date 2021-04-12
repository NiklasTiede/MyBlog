+++
title = "Documentation - 7/9"
description = "A description"
tags = [
    "python",
    "packaging",
]
date = "2021-02-19"
archives = "2021"
categories = [
    "Python",
    "Packaging",
]
menu = "main"
+++

Heya fellows,

This is part 7 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/7-Documentation)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [**Documentation**](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

Documentation can be supplied in different formats. Command line tools have a usage help (`--help`). For smaller projects the `README.md` can be sufficient enough whereas projects like libraries benefit from a more extensive hosted technical documentation (see [readthedocs](https://readthedocs.org/)).

Let's create some documentation! `sphinx` is a tool that will help us to simplify this process.

```
$ pip install sphinx

$ mkdir docs
$ cd docs
```

Sphinx will ask us a couple of questions:

```
$ sphinx-quickstart

> Separate source and build directories (y/n) [n]: y
> Project name: tinyHTTPie
> Author name(s): Niklas Tiede
> Project release []: 0.1.0
> Project language [en]: enter
```

To create the documentation we have to use the `make html` command within the `docs` directory. This creates the HTML of our documentation.

```
$ cd ..
$ make html
```

If we open the `index.html` file in the browser we can see how our documentation will look like. But its appearance is pretty puristic. Therefore we use an often used theme to let it look nicer.

```
$ pip install sphinx_rtd_theme
```

Now we have to customize the `conf.py` file. We add the following lines:

```python
import sphinx_rtd_theme

extensions = ["sphinx_rtd_theme",]
pygments_style = "sphinx"
version = '0.1.0'
html_theme = 'sphinx_rtd_theme'
```

And render again.

```
$ make html
```

Now it looks way better! Ok, next we wanna write some more content. The documentation should be written in the reStructuredText (.rst) syntax. Here's a nice [cheat sheet](https://github.com/ralsina/rst-cheatsheet/blob/master/rst-cheatsheet.rst). A previewer will speed up things. I've added some documentation about tinyHTTPie, see [index.rst](https://github.com/NiklasTiede/tinyHTTPie/blob/7-Documentation/docs/source/index.rst), [install.rst](https://github.com/NiklasTiede/tinyHTTPie/blob/7-Documentation/docs/source/install.rst) and [tutorial.rst](https://github.com/NiklasTiede/tinyHTTPie/blob/7-Documentation/docs/source/tutorial.rst). The last step is to publish our documentation. We have to register at [readthedocs.org](https://readthedocs.org/) and let it hook our repository.

Voilà! A nice [tinyHTTPie documentation](https://tinyhttpie.readthedocs.io/en/latest/) was created! I hope you see how easy it is to setup such a good-looking documentation.

<div>
    <p align="center"><a href="/posts/6-testing-and-continous-integration"><< section 6</a> | <a href="/posts/8-publishing-at-pypi">section 8 >></a> </p>
</div>
