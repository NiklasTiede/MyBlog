+++
title = "Sys Module - 2/9"
description = "Pythons sys module is used to create a tiny command line app."
tags = [
    "python",
    "cli",
]
date = "2021-01-26"
archives = "2021"
categories = [
    "Python",
    "CLI"
]
menu = "main"
+++

Heya fellows,

This is part 2 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/2-Sys-Module)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [**Sys Module**](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

The sys modules `sys.argv` is a list that gives us access to all command line arguments passed to the Python script. This gives us the ability to make our script more flexible. We can now change the URL we would like to request by passing an argument to the script. The first element of sys.argv (`sys.argv[0]`) is the scripts name.

```python
#!/usr/bin/python

import requests
import collections
import sys

url = sys.argv[1]

r = requests.get(url)

header = dict(collections.OrderedDict(resp.headers))
body = resp.text

for section in sorted(header.items()):
    print(f"{section[0]}: {section[1]}")
```

To test our changes we type:

```
$ tihttp https://the-coding-lab.com/
```

Success! Our tools feels now way more like a real command line app!

Ok, next let's make our tool more user friendly by improving error handling. We're used to enter a URL without schema, but every browser uses the HTTP method as its default scheme. So this is what we would like to implement for our tool.

```python
#!/usr/bin/python

import requests
import collections

url = sys.argv[1]

if ('http://' or 'https://' or 'http://www.' or 'https://www.') not in url:
    if url[:4] == 'www.':
        url = url[4:]
    url = 'http://' + url

resp = requests.get(url)

header = dict(collections.OrderedDict(resp.headers))
body = resp.text

for section in sorted(header.items()):
    print(f"{section[0]}: {section[1]}")
```

Ok. But even if the URL was typed correctly several errors when communicating with the server can happen. The status code (3 digit number) returned will give us more information about why the error occurred. The first digit represents the class. The responses are grouped in 5 classes.

| Status Code | Description           | Class                |
| ----------- | --------------------- | -------------------- |
| 200         | Success               | Successful Responses |
| 301         | Moved Permanently     | Redirects            |
| 302         | Moved Temporarily     | Redirects            |
| 304         | Not modified          | Redirects            |
| 400         | Bad request           | Client Error         |
| 401         | Unauthorized          | Client Error         |
| 403         | Forbidden             | Client Error         |
| 404         | Not found             | Client Error         |
| 500         | Internal Server Error | Server Error         |

These errors are handled using Python's exceptions.

```python
#!/usr/bin/python

import requests
import collections
import sys


input_url = sys.argv[1]

if 'http://www.' and 'https://www.' not in input_url:
    if input_url[:4] == 'www.':
        input_url = input_url[4:]
    input_url = 'http://www.' + input_url

try:
    r = requests.get(url)
except requests.exceptions.RequestException as e:
    print(f'Response Failed.')

header = dict(collections.OrderedDict(resp.headers))
body = resp.text

for section in sorted(header.items()):
    print(f"{section[0]}: {section[1]}")
```

So good, so far. But what if a user of the tool types too many arguments or no URL at all accidentally? We have to advise our script to handle these use cases! Boolean logic solves this.

```python
#!/usr/bin/python

import requests
import collections
import sys

arg_array = sys.argv[1:]
input_url = ''
body_bool, header_bool = False, False

if len(arg_array) > 1:
    print('Too many arguments.')
    sys.exit(0)

if len(arg_array) == 1:
    input_url = arg_array[0]

if not input_url:
    print('No URL was given.')
    sys.exit(0)

if 'http://www.' and 'https://www.' not in input_url:
    if input_url[:4] == 'www.':
        input_url = input_url[4:]
    input_url = 'http://www.' + input_url

try:
    r = requests.get(input_url)
except requests.exceptions.RequestException as e:
    print(f'Response Failed.')
header = dict(collections.OrderedDict(resp.headers))
body = resp.text

for section in sorted(header.items()):
    print(f"{section[0]}: {section[1]}")
```

Now let's add some options. It would be nice if the user could decide if we he wants to print only the header or the body of the response. Usually command line tools use flags to give options. We will use a `-H` flag to display only the header and `-B` flag to display only the body.

```python
#!/usr/bin/python

import requests
import collections
import sys

arg_array, input_url = sys.argv[1:], ''
body_bool, header_bool = False, False

if '-b' in arg_array:
    arg_array.remove('-b')
    body_bool = True

if '-h' in arg_array:
    arg_array.remove('-h')
    header_bool = True

if len(arg_array) > 1:
    print('Too many arguments')
    sys.exit(0)

if len(arg_array) == 1:
    input_url = arg_array[0]

if not input_url:
    print('No URL was given')
    sys.exit(0)

if 'http://www.' and 'https://www.' not in input_url:
    if input_url[:4] == 'www.':
        input_url = input_url[4:]
    input_url = 'http://www.' + input_url

try:
    r = requests.get(input_url)
except requests.exceptions.RequestException as e:
    print(f'Response Failed.')
header = dict(collections.OrderedDict(resp.headers))
body = resp.text

if body_bool and not header_bool:
    print(body)

if header_bool and not body_bool:
    for section in sorted(header.items()):
        print(f"{section[0]}: {section[1]}")

if (body_bool and header_bool) or (not body_bool and not header_bool):
    for section in sorted(header.items()):
        print(f"{section[0]}: {section[1]}")
    print()
    print(body)
```

Some testing proves that we can use now two options:

```
$ tihttp -H https://the-coding-lab.com/
$ tihttp -B https://the-coding-lab.com/
```

We see that it can become quite tedious to add more functionality when limiting ourself to the` sys` module. It needs alot of boolean logic. But Python has a library only for creating command line interfaces: `argparse`!

<div>
    <p align="center"><a href="/2021/1-the-evolution-of-a-script"><< section 1</a> | <a href="/2021/3-argparse-module/">section 3 >></a> </p>
</div>
