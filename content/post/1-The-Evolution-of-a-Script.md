+++
title = "The Evolution of a Script - 1/9"
description = "A script for http requests is written."
tags = [
    "scripting",
    "python",
]
date = "2021-01-21"
archives = "2021"
categories = [
    "Python",
    "Scripting",
]
menu = "main"
+++

Heya fellows,

This is part 1 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/1-Simple-Script)).

#### Contents

1. [**A Simple Script**](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

When I started out my Journey of learning to code I went through dozens of tutorials, I rewrote many algorithms and played with several kinds of topics. During this time I was pretty busy learning Python's basic syntax, its standard libraries and other third party packages. "You have to know which tools you can use before you're able to create new tools" I said to myself. So I kept myself busy with learning about computer science basics and discovering frameworks, libraries and commands line apps.

<!-- ![cute tortoise](/img/tortoise.jpg) -->

It took me 8 month before I started to discover Github. What a phenomenal mistake of mine! Github has such a great community, people create so much admirable work, it's so interesting to discover/use or play with other peoples projects! It took me some time to understand Python's packaging (I really underestimated the packaging part!). So in the following I would like to take you with me on a journey of writing and releasing a tiny command line app. We will see how a simple script grows and goes through different stages of its development cycle. Some scripts of mine grow, some are just executed as plain script files. I collect these within a folder on my machine (see: [Collection of Python Scripts](https://github.com/NiklasTiede/Python-Scripts-Collection)).

Exploring the web through the command line is a fascinating experience. We will use the `requests` library to create a little [HTTPie](https://github.com/httpie/httpie) clone. HTTP clients are used to test how an API behaves when sending GET and POST requests to it.

# 1. A Simple Script

First we will create a simple script which can perform GET requests. I keep all my scripts within a `MyScripts` folder. Then I create a project folder, and a virtual environment using `pipenv`.

```
$ cd ~/MyScripts
$ mkdir tinyHTTPie
$ cd tinyHTTPie

$ pipenv --python 3.7
$ pipenv shell
```

Then we have to create our project file and install dependencies:

```
$ touch tihttp.py
$ pip install requests
```

Lets write our script. We want to print the header of the response. I used the `OrderedDict` object imported from the `collections` library to sort the keys of the dictionary.

```python
import requests
import collections

resp = requests.get('https://the-coding-lab.com/')

header = dict(collections.OrderedDict(resp.headers))
body = resp.text

for section in sorted(header.items()):
    print(f"{section[0]}: {section[1]}")
```

When we execute the script...

```
$ python tihttp.py
```

...the metadata of the request are returned successfully.

```console
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Age: 124
Cache-Control: max-age=600
Connection: keep-alive
Content-Encoding: gzip
Content-Length: 5764
Content-Type: text/html; charset=utf-8
Date: Tue, 16 Feb 2021 14:39:59 GMT
...
```

But when you realize that a script of yours is pretty useful, you might think "How could I turn this script into an easy-to-use command?". At first, you have to add a shebang line to stick the scripts virtual environment to it permanently. The `which python` command or `pipenv --py` will return the path to the Python interpreter of the virtual environment. It will look like:

```
/home/niklas/.local/share/virtualenvs/tinyHTTPie-iqhOkNUA/bin/python ~/tinyHTTPie/tihttp.py
```

Now this path has to be added to the head of the script as a shebang line. We can do this from the command line.

```
$ pybin=$(pipenv --py)
$ echo -e "#\!${pybin}\n\n$(cat tihttp.py)" > tihttp.py
```

The head of the file should look like this:

```python
#!/home/niklas/.local/share/virtualenvs/tiny-HTTPie-clone-iqhOkNUA/bin/python

import requests
...
```

To make the script executable we have to give permissions. Then we can just type the path to the script and it will be interpreted by the specified Python interpreter.

```
$ chmod +x tiny_HTTPie_clone.py
$ ./tihttp.py
```

Giving the path an alias will make it easier for us to remember/use our tool. To allow us to use the alias in every new shell session, we add it to the `.bashrc` file (or wherever you're storing your aliases).

```
$ echo "\nalias tihttp='~/MyScripts/tiny_HTTPie_clone.py'" >> ~/.bashrc
$ source ~/.bashrc
```

Now you can call your script in each new shell session no matter where you are on the filesystem.

```
$ tihttp
```

But there is still a problem: every time our tools sends a GET request to a website we have to change the URL by opening the file, changing the URL, saving and executing it. Would it not be nicer to add the URL as argument to our `tihttp` command? Python's `sys` module from the standard library comes here to our rescue!

<div>
<p align="center"> <a href="/2021/2-sys-module">section 2 >></a> </p>
</div>
