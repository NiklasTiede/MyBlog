+++
title = "Testing and CI - 6/9"
description = "A description"
tags = [
    "scripting",
    "python",
    "testing",
]
date = "2021-02-16"
archives = "2021"
categories = [
    "Python",
    "Scripting",
    "Testing",
]
menu = "main"
+++

Heya fellows,

This is part 6 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/6-Testing-and-CI)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [**Testing and Continuous Integration**](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

When projects grow a good test suite ensures
that new features added don't cause the application to break. It improves the maintainability of the project. The complexity of small projects is very low and a testing is not necessary yet. But for the sake of this tutorial we will write a small test suite to demonstrate testing and continuous integration. We will use `pytest`.

The tests will be stored within a separate folder. Here's the structure of the project.

```
├── LICENSE
├── README.md
├── setup.py
├── tihttp.py
├── tests
│  ├── __init__.py
│  └── test_tihttp.py
```

We place a `test_tihttp.py` within the `tests` folder. It contains out test suite.

```python
from tihttp import main

def test_GET_body(capsys):
    main(["-B", "http://jsonplaceholder.typicode.com/todos?userId=1"])
    captured = capsys.readouterr()
    result = captured.out
    with open("tests/jsonplaceholder.json", "r") as f:
        output = f.read()
    assert result == output
```

We compare the expected output with a request against an API. The API will return a similar response so it's will give us a feedback if our application is working or if it was broken. We place a .json files into the same folder which is used for comparison. We will let `pytest` execute the test:

```
$ pip install pytest
$ pytest
```

Our test passes. Next we add pytest to our extra requirements in the `setup.py` file.

```python
extras_require={
    'dev': [
        'pytest', # pip install tihttp[dev]
    ],
},
```

This gives us the possibility to install extra dependencies (testing, linting tools etc.) easily by adding a `[dev]` to the package name.

```
$ pip install .[dev]
$ pip install tihttp[dev]
```

We tested all of this with python 3.7.3. But how does our application behave when executed on a different interpreter version? So let's test it against different Python versions! We use tox. It lets us run tests in multiple virtualenvs.

```
$ pip install tox
```

Tox needs a recipe to know which virtualenv/commands to create/execute. This recipe the `tox.ini` file.

```ini
[tox]
envlist = py36,py37,py38,py39

[testenv]
deps =
    pytest
commands =
    pytest
```

If some of the Python interpreters are missing on your system, install them from the deadsnakes archive:

```
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt install python3.5 python3.6 python3.7 python3.8 python3.9
```

Now let's test across different interpreters!

```
$ tox
```

If you wanna test against a specific environment or execute only one test, then type:

```
$ tox -e py38
$ tox -e py38 -- test/main_test.py   # executes only single test
```

Ok, we did the test locally, but when working in a team using continuous integration is pretty convenient. We set a `integrate.yaml` file up within a `.github/workflows` directory to tell github actions what jobs to execute. The following github actions file will test across different platforms and Python versions.

```yaml
name: Python package

on: [push]

jobs:
  run:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        python-version: [3.6, 3.7, 3.8, 3.9]
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      - name: Cache pip
        uses: actions/cache@v2
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
          restore-keys: |
            ${{ runner.os }}-pip-
            ${{ runner.os }}-
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install flake8 pytest pytest-cov
          pip install -r requirements.txt
      - name: Lint with flake8
        run: |
          # stop the build if there are Python syntax errors or undefined names
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          # exit-zero treats all errors as warnings. The GitHub editor is 127 chars wide
          flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
      - name: Test with pytest
        run: |
          pytest
```

Don't be intimidated by the length of this job. It's just illustrating how powerful continuous integration is.

<div>
    <p align="center"><a href="/posts/5-distribution-via-setup-file"><< section 5</a> | <a href="/posts/7-documentation">section 7 >></a> </p>
</div>
