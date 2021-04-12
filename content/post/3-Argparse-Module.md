+++
title = "Argparse Module - 3/9"
description = "A description"
tags = [
    "python",
    "cli",
]
date = "2021-02-01"
archives = "2021"
categories = [
    "Python",
    "CLI",
]
menu = "main"
+++

Heya fellows,

This is part 3 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/3-Argparse-Module)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [**Argparse Module**](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

One of the big benefits of using argparse is that it generates a usage help (a `--help` flag) automatically. It's common practice to separate the events which are triggered by flags from the creation of the argumentparser. Here's a argparse template I often use.

```python
import argparse

def main(argv=None):

    parser = build_parser()
    args = parser.parse_args(argv)

    if args.arg_name:
        pass

    return 0

def build_parser():
    parser = argparse.ArgumentParser()

    # positional/optional arguments:
    parser.add_argument()

    return parser

def run_main():
    try:
        sys.exit(main())
    except Exception as e:
        sys.stderr.write(e)
        sys.exit(1)

if __name__ == '__main__':
    run_main()
```

If you're wondering where the arguments from outside are passed into the script: the default value of the `argv` identifier is None. Argparse knows then internally that it has to use the arguments from outside.

When converting our script into an argparse tool we can throw all the logic away which informs the user about incorrect usage. All this is now done by `argparse`! We wrap argparse around our script:

```python
#!/usr/bin/python

import argparse
import requests
import collections
import sys


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)

    url = ''

    if args.URL:
        url = args.URL

    if ('http://' or 'https://' or 'http://www.' or 'https://www.') not in url:
        if url[:4] == 'www.':
            url = url[4:]
        url = 'http://' + url

    try:
        resp = requests.get(url)
    except requests.exceptions.RequestException as e:
        print(f'Response Failed.')
        return 1

    header = dict(collections.OrderedDict(resp.headers))
    body = resp.text

    for section in sorted(header.items()):
        print(f"{section[0]}: {section[1]}")
    print()
    print(body)
    return 0


def build_parser():
    parser = argparse.ArgumentParser(
        prog='tihttp',
        description='A tiny HTTP client for sending GET requests.'
    )

    parser.add_argument('URL',action='store',)

    return parser


def run_main():
    try:
        sys.exit(main())
    except Exception as e:
        sys.stderr.write(e)
        sys.exit(1)


if __name__ == '__main__':
    run_main()
```

Adding the `-H`, `-B` flags and the boolean logic returns a more sophisticated version of our script:

```python
#!/usr/bin/python

import argparse
import requests
import collections
import sys


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)

    url = ''

    if args.URL:
        url = args.URL

    if ('http://' or 'https://' or 'http://www.' or 'https://www.') not in url:
        if url[:4] == 'www.':
            url = url[4:]
        url = 'http://' + url

    try:
        resp = requests.get(url)
    except requests.exceptions.RequestException as e:
        print(f'Response Failed.')
        return 1

    header = dict(collections.OrderedDict(resp.headers))
    body = resp.text

    if args.body and not args.header:
        print(body)
        return 0

    if args.header and not args.body:
        for section in sorted(header.items()):
            print(f"{section[0]}: {section[1]}")
        return 0

    if (args.header and args.body) or (not args.header and not args.body):
        for section in sorted(header.items()):
            print(f"{section[0]}: {section[1]}")
        print()
        print(body)
        return 0

    return 1


def build_parser():
    parser = argparse.ArgumentParser(
        prog='tihttp',
        description=f'A tiny HTTP client for sending GET requests.'
    )

    # positional arguments:
    parser.add_argument(
    'URL',
    action='store',
    )

    # optional arguments:
    parser.add_argument(
    '-H',
    '--header-only',
    dest='header',
    action='store_true',
    help='Prints only the header of the Response.')

    parser.add_argument(
    '-B',
    '--body-only',
    dest='body',
    action='store_true',
    help='Prints only the body of the Response.')
    return parser


def run_main():
    try:
        sys.exit(main())
    except Exception as e:
        sys.stderr.write(e)
        sys.exit(1)


if __name__ == '__main__':
    run_main()
```

Adding the help flag returns now a nicely formatted usage help!

```
$ tihttp --help

usage: tihttp [-h] [-H] [-B] URL

A tiny HTTP client for sending GET and POST requests.

positional arguments:
  URL

optional arguments:
  -h, --help         show this help message and exit
  -H, --header-only  Prints only the header of the Response.
  -B, --body-only    Prints only the body of the Response.
```

<div>
    <p align="center"><a href="/posts/2-sys-module"><< section 2</a> | <a href="/posts/4-distribution-via-installation-script">section 4 >></a> </p>
</div>
