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

We have seen that it's tedious and unclear how to distribute a project with a bash script. So I'll show you in this post the way to go: using a `setup.py` file! At first, we have to create a `setup.py` file, put it into the root directory and then we can use `pip install .` to install our project locally. This installs the project into the active virtual environment. 

But how does a `setup.py` file looks like? Here's a template containing the most important key-value pairs:

```python
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

The `package_dir` and `packages` values are necessary when a source layout is used, so that `setup.py` knows where to look for the packages. We used here a source layout to show these key-values and how they affect the `entry_points` section. The `entry_points` section tells pip where the command line tool is invoked from. 

<p align="center">
<img alt="script entrypoint" width="420px" src="/img/script_entrypoint.png">
</p>

The command (in this case `tihttp`) is mapped to the starting point of the command line tool (here the `run_main()` function). Now `tihttp` can be installed and the command should return a proper help interface.

```
$ pip install .

$ tihttp --help
```

Another big advantage of this setup is that pip allows to install packages in editable mode:

```
$ pip install -e .
```

Your project is then installed into your currently activated virtual environment and every change to the code immediately affects this installed dependency. This allows to continue developing while testing the package comfortably. Furthermore, the `setup.py` file allows to download and install your project directly from github.

```
$ pip install https://github.com/NiklasTiede/tinyHTTPie/archive/5-Distributing-by-Setup-File.zip
```

Direct installations from github can take time especially for projects which are bigger (large git history) and use non-Python languages. Therefore PyPI and Anaconda are usually the preferred places to go for installing packages.

I want to note that many developers in the python community store project metadata and settings used for linting/testing within a `setup.cfg` file instead of a `setup.py` file but this is a topic for another post.

<div>
    <p align="center"><a href="/2021/4-distribution-via-installation-script"><< section 4</a> | <a href="/2021/6-testing-and-continous-integration">section 6 >></a> </p>
</div>
