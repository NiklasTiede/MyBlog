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

In this post I wanna talk about a few dimensions of how to document a project in the python world. This makes it easier for the user or fellow developers to understand the project as a whole or separate parts of it. We will start at the lowest level and move toward higher abstraction levels.


# Clean, Self-Descriptive Code

The lowest level of documentation is the code itself. The goal is to create readable and reusable software.  This can be achieved by adhering to a few principles:

- Meaningful, pronounceable and consistent **naming** of variables/functions/classes.
- **Single-responsibility principle**: Each function fulfills only 1 purpose, same applies for classes/modules on a higher abstraction level.
- Use **static typing** for bigger projects, enforce type checking with [mypy](https://github.com/python/mypy). Dynamic languages like Python make object identification difficult.
- Avoid reinventing the wheel and make good use of **Python's standard library**. A good developer uses existing code strategically to his advantage.
- Stick to a consistent style, I like [**Googles styleguide**](https://google.github.io/styleguide/pyguide.html) for Python.
- Is the code elegant and pleasing? **Listen to your intuition**, your subconscious will point to the right things.


# Docstrings, Comments and Git Commit Messages


```python
>>> import math
>>> math.__doc__
'This module is always available.  It provides access to the'
'mathematical functions defined by the C standard.'
```

Docstrings are string literals which occur as first statement in a function, class, method or module definition. The docstrings become the `__doc__` special attribute of that object. They're used to explain the general purpose of an object whereas comments explain smaller parts of the code. Comments are used to explain non-obvious portions of the code. Docstrings are surrounded by `"""triple quotes"""` and divided into one-line or multi-line docstrings whereas comments starts with `#` at the beginning.

```python
def my_function():
    """This is a docstring"""
    return None

# docstring of the function
my_function.__doc__

# displays documentation of the function
help(my_function)
```

There are many docstring formats available. Most commonly used are NumPy, PyDoc and Googles docstring style. It's a good idea to stick with a format which supports the Python documentation generator [Sphinx](https://github.com/sphinx-doc/sphinx). This generates a part of your documentation automatically from your docstrings. The last section of this post will show how to generate and host documentation with Sphinx and [readthedocs](https://github.com/readthedocs/readthedocs.org).

A convenient VSCode extension is the [Python Docstring Generator](https://github.com/NilsJPWerner/autoDocstring) to facilitate the creation of docstrings.

```python
def multiply(x: int, y: int) -> int:
    """[summary]

    Args:
        x (int): [description]
        y (int): [description]

    Returns:
        int: [description]
    """
    return x * y
```

It detects parameters automatically and you just have to fill out the marked fields. It uses the Google style by default.

---

Another source of documentation is available if the project has a Git history. A good git history gives you information about the reason for each code change. You can supercharge the git capabilities of VSCode by [GitLens](https://github.com/eamodio/vscode-gitlens) and you will see each commit message next to the code it was committed to.

<p align="center">
<img width="690px" src="/img/gitlens_example.png">
</p>

Furthermore, I like to use [gitmoji](https://github.com/carloscuesta/gitmoji) to make the reading of my commit messages visually more appealing and force myself to commit only code changes which fall into one category of the gitmojis.

# README Files

A nicely written README is the first document the visitor of a project will see. Here's a screenshot of [THELOUNGE](https://github.com/thelounge/thelounge), an IRC client for self-hosting:


<p align="center">
<img width="500px" src="/img/beautiful_readme_example.png">
</p>

What a beautiful README! What does it make so good? 
- It has a visually **appealing and memorable logo** which is compatible with Github's light and dark theme by using a transparent `.png` picture.
- A **concise self-description**.
- **Badges** from [shields.io](https://shields.io/) which visualize the quality of the project.
- Links to **documentation**.
- An **example**, here screenshot of the application when running.
- A **list of** contained **features**.

Often README files also contain instructions for the installation or a tutorial on how to use it. The READMEs file format is `.md` (markdown) or `.rst` (reStructuredText). Sometimes it's also a good idea to provide examples to the user for certain, common use cases. Projects with a data scientific background tend to use jupyter notebooks (`.ipynb`) to demonstrate the capabilities of the project. Other projects use plain python files for demonstration purposes.

# Sphinx Documentation

For smaller projects the `README.md` can be sufficient whereas projects like libraries benefit from a more extensive hosted technical documentation. I will show you here how simple it is to create your own freely hosted documentation with [Sphinx](https://github.com/sphinx-doc/sphinx), [readthedocs](https://readthedocs.org/) and [Github Pages](https://pages.github.com/)!

OK, let's create some documentation! `Sphinx` is the tool that will help us to simplify this process.

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

If we open the `index.html` file with the browser via live server we can see how it will look like. But its appearance is pretty puristic yet. Therefore we use the popular `RTD` theme to give it a professional look. We install the theme...

```
$ pip install sphinx_rtd_theme
```

...and customize the `conf.py` file. We add the following lines:

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

Now it looks way better! Ok, next we wanna write some more content. The documentation should be written in the reStructuredText (.rst) syntax. Here's a nice [cheat sheet](https://github.com/ralsina/rst-cheatsheet/blob/master/rst-cheatsheet.rst). A `.rst` previewer in your IDE will speed up things. I've added some documentation about tinyHTTPie, see [index.rst](https://github.com/NiklasTiede/tinyHTTPie/blob/7-Documentation/docs/source/index.rst), [install.rst](https://github.com/NiklasTiede/tinyHTTPie/blob/7-Documentation/docs/source/install.rst) and [tutorial.rst](https://github.com/NiklasTiede/tinyHTTPie/blob/7-Documentation/docs/source/tutorial.rst). The last step is to publish our documentation. We have to register at [readthedocs.org](https://readthedocs.org/) and let it hook our repository.

Voilà! A nice [documentation](https://tinyhttpie.readthedocs.io/en/latest/) was created! I hope you see how easy it is to setup such a good-looking documentation and that documentation has so many interesting aspects we're typically not aware of! 😃

<div>
    <p align="center"><a href="/2021/6-testing-and-continous-integration"><< section 6</a> | <a href="/2021/8-publishing-at-pypi">section 8 >></a> </p>
</div>
