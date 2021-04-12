+++
title = "Distribution via Setup File - 5/9"
description = "A description"
tags = [
    "python",
    "packaging",
]
date = "2021-02-11"
archives = "2021"
categories = [
    "Python",
    "Packaging",
]
menu = "main"
+++

Heya fellows,

This is part 5 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/5-Distributing-by-Setup-File)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [**Distribution via Setup File**](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

We have to write a `setup.py` file and then we can use `pip install` easily our script. We have to be in the directory of the `setup.py` file and type:

```
$ pip install .
```

This installs the tool into the active virtual environment. But how does a `setup.py` file looks like? Here's a template containing the most important key-value pairs:

```python
import pathlib
import setuptools

setuptools.setup(
    name="tihttp",
    version="0.1.0",

    package_dir={"": "src"},
    packages=setuptools.find_packages(where="src"),

    install_requires=[
        "requests>=2.21",
    ],

    entry_points={
        "console_scripts":
        ["tihttp=tihttp.main:run_main"]
        },
)
```

The `package_dir` and `packages` values are necessary when a source layout is used, so that `setup.py` knows where to look for the packages. We used here a source layout to show these key-values and how `entry_points` change when used.

![script entrypoint](/img/script_entrypoint.png)

The entry point is where the command line tool is invoked from. `tihttp` can be easily installed locally by typing:

```
$ pip install .
```

Another big advantage of this setup is that pip allows to install a package in editable mode

```
$ pip install -e .
```

This allows to continue developing while testing the tool easily.

What do the other keys do?
platforms restricts

<div>
    <p align="center"><a href="/posts/4-distribution-via-installation-script"><< section 4</a> | <a href="/posts/6-testing-and-continous-integration">section 6 >></a> </p>
</div>
