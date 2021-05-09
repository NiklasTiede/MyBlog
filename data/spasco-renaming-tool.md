+++
title = "How I Built a Renaming Tool with Python's Argparse Module"
description = "An API scraping/serving data about Githubs trending repositories/developers."
tags = [
    "python",
    "cli",
]
date = "2021-04-28"
archives = "2021"
categories = [
    "Python",
    "cli",
]
menu = "main"
+++

Heya fellows,

Today I wanna share with you some lectures I learned as I coded <a href="https://github.com/NiklasTiede/Spasco" target=”_blank” >Spasco</a>, a command line tool for renaming files and directories. 

<p align="center">
<img width="400px" src="/img/spasco_readme_screenshot.png">
</p>

I never used boolean logic really well, but here I used it to trigger 

 knew how a Argumentsparser parses the arguments.

boolean logic for triggering flags
argparsers Argumentparser and subparsers

# Contents
- [Core Functionality]() 
- [Boolean Logic and Argument Parsing]()
- [Making Spasco Configurable]()
- [Colorizing Terminal Output with ANSI Escape Sequences]()
- [Adding Tests, Linting and a nice README]()
- [Conclusion]()

---


Doe to the simple logic I used functional programming opposed to a OOP style.

- functional style, not OOP


what I learned:
- how to write command line interfaces with Argparse module

- using boolean logic to trigger flags logic


- how to use configuration .ini file; how to use logging
- fnmatch.fnmatch
- path renaming function
- recurse dirs/files

- alternatives for renaming files/dirs on linux

- how to write argparse code for
- coloruizing output with ansi escape seq

takeaway:;
its quite simple to build a command line interface. so in the future, when building a library, or tool you can easily put a command line interface on top of it! for things like changing settings






When I changed my operating system to linux a year ago

I used whitespaces within folder/file names. But when switching to linux i this is not good pravtice due to the command line.
AT our luck the autocomplete capabilities add \ before the whitespaces to prevent being recognized as 2 args. but still, this seemed to me a nice task to create a tool which converts all files containg whites


So, lets build such a command line tool using Pythons standard library `argparse`!

- show some aspects of argparse
- how to store settings permamently within an app: .init files
- github action workflow, how to publish easily to pypi.org
-> interessantes reinbringen!

use examples for publishing



Spasco: How I built a Renaming Tool with Python's Argparse Module
How to Build a Command Line Interface with Python's Argparse Module
