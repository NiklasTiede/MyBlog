+++
title = "Publishing at PyPI - 8/9"
description = "A description"
tags = [
    "scripting",
    "python",
    "packaging",
]
date = "2021-02-23"
archives = "2021"
categories = [
    "Python",
    "Scripting",
    "Packaging",
]
menu = "main"
+++

Heya fellows,

This is part 8 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/8-Publishing-at-PyPI)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [**Publishing at PyPI**](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

Ok, now people can download our project from github and use it. But in our daily work we use the Python Packaging Index to install things. So how do we release our package on PyPI? First we have to decide which versioning scheme we will use. Semantic versioning ([semver.org](https://semver.org/)) and calendar versioning ([calver.org](https://calver.org/)) are commonly used. We decide to use semantic versioning in the following. Github allows us to make images of our project (tags). Often the tagging corresponds with the package release on PyPI. So let's first create a tag:

```
$ git add .
$ git commit -m "v1.0.0"
$ git tag !$
$ git push origin "v1.0.0"
```

Tags are a great opportunity to see a project in reverse at every stage of its development. Next we will generate a source distribution (.tar.gz) and a wheel distribution (.whl).

```
$ pip install wheel

$ python setup.py sdist bdist_wheel
```

The generated files can be found within the `dist` directory. Now we have to register at [PyPI](https://pypi.org/) before we can upload our project. For testing purposes it's convenient to upload the project to [TestPyPI](https://test.pypi.org/) first. So, let's do that.

```
$ pip install twine

$ twine upload --repository testpypi dist/*
```

Now let's test installing `tihttp`.

```
$ pip install -i https://test.pypi.org/pypi/ --extra-index-url https://pypi.org/simple tihttp
```

Our tools works perfectly fine!

```
$ tihttp -H google.com
```

---

And now that we are sure that everything works, it's time to upload things to PyPI.

```
$ twine upload --repository pypi dist/*

$ pip install tihttp
```

<div>
    <p align="center"><a href="/posts/7-documentation"><< section 7</a> | <a href="/posts/9-publishing-at-anaconda">section 9 >></a> </p>
</div>
