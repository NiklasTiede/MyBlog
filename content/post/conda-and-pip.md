+++
title = "Managing Environments with Conda and pip"
description = "Some basics about anaconda, a scientific package manager for python"
tags = [
    "python",
    "packaging",
]
date = "2021-04-25"
archives = "2021"
categories = [
    "Python",
    "Packaging",
]
menu = "main"
+++

Heya fellows,

When dealing with dependencies the Python world offers several tools to manage these. It's important to deal with Python as well as non-Python packages, to handle different Python versions and to ensure a good isolation. Tools like `pipenv` and `poetry` are pretty popular for these purposes but `conda` has proven to be the tool of choice within the scientific community over the years. 💪

![hello](/img/conda.png)

`Conda` im combination with `pip` is what I like to use on  a daily basis. Conda handles non-Python code especially well and therefore libraries like `RDKit` (cheminformatics library) are only available in the conda ecosystem. It's a great resource for data scientific work. 

Here I wanna show you some basic commands of `conda` and `pip` I'm using to manage my dependencies.

---------

<!-- # Contents
1. [Creating Environments and Installing Packages](#1-creating-environments-and-installing-packages)
2. [Adding Channels to Configuration](#2-adding-channels-to-configuration)
3. [Managing Multiple Environments](#3-managing-multiple-environments)
4. [Sharing Environments](#4-sharing-environments) -->

At first you have to install Anaconda on your system if it's not already installed. In the following we will install pandas, matplotlib and jupyter lab so we have a nice environment for data scientific work.

# Creating Environments and Installing Packages

At first we create our new environment:

```
$ conda create -n my-new-environment python=3.8
```

Here we name the environment `my-new-environment` and use Python version 3.8. Conda will collect package metadata and create our new environment. By activating our new environment...

```
$ conda activate my-new-environment
```

...we leave condas base environment and enter our newly created environment. Then we can install the dependencies we need.

```
$ conda install matplotlib pandas 
```

Jupyter lab is offered via the `conda-forge` channel, a popular, well-maintained channel, not via the `default` channel. That's why we have to provide the channels name:

```
$ conda install -c conda-forge jupyterlab
```

Or we add the channel right away to condas configuration so that the `conda-forge` repo is searched on top of the `default` channel when installing packages. Conda-forge is a pretty popular and well-maintained channel and therefore we will add it here permanently.

```
$ conda config --add channels conda-forge
```

You can see that conda-forge was added to your `~./condarc` file.

```yaml
ssl_verify: true
channels:
  - conda-forge
  - defaults
```

Some of condas commands are similar those of `pip`. To list the packages within your current environment we type:

```
$ conda list
```

If you want to search through all anaconda repositories for a package, then use this command:

```
$ anaconda search <package_name>
```

# Managing Multiple Environments

But how do we deal with multiple environments? Let's clone the environment we created in the first place:

```
$ conda create --clone my-new-environment --name my-clone
```

When typing `conda env list` we see the two environments we created are next to the base environment. 

```
$ conda env list

# conda environments:
#
base                   /home/niklas/anaconda3
my-new-environment     /home/niklas/anaconda3/envs/my-new-environment
my-clone               /home/niklas/anaconda3/envs/my-clone
```

We can switch the environment by just activating the new environment. 

```
$ conda activate my-clone
```

To check which environment is currently active we can type `conda info`. BTW: Frameworks like Oh-My-Zsh show the active environment within the terminal which makes life easier.

Ok, now lets clean up things and delete the cloned environment.

```
$ conda deactivate 
$ conda env remove --name my-clone
```

Conda caches all installed packages within the 'pkgs' directory, so from time to time I clean it up to free up space.

```
$ conda clean -h
```

# Sharing Environments

Developers are no one-man armies. We share our work to other developers/engineers and they should be able to reproduce our work. Conda is able to export the environments dependencies as a yaml file and recreate the environment from this file. 

```
$ conda env export --name my-new-environment > environment.yaml
```

Now all dependencies can be found in the `environment.yaml` file. This file can be used by someone else to recreate the environment. When no `--file` flag value is provided `conda` searches for a `environment.yaml` file in the current working directory and tries to recreate the environment from this file. 

```
$ conda env create              
$ conda env create --file environment-dev.yaml   
```

But don't feel forced to only use conda packages when managing dependencies with conda! I also use conda when managing projects where I install only dependencies from pypi.org. Just as reminder here are the commands for storing/recreating `pip` dependencies.

```
$ pip freeze > requirements.txt   
$ pip install -r requirements.txt
```

Conda makes switching between different environments so easy and you have always access to conda packages. Unfortunately, condas speed for creating environments and installing conda packages is not outstanding but nonetheless it's good enough that I prefer it over other dependancy manager 🙂. If you want to see how to upload a project to Anaconda, take a look into my article '<a href="/2021/9-publishing-at-anaconda/" target=”_blank” >Publishing at Anaconda</a>'.

Ok that's it, I hope you I could arouse your curiosity for Anaconda. Thanks for your attention and have a nice day! 🙂

---------

All conda commands I'm using can be found in my <a href="https://github.com/NiklasTiede/CheatSheet-Linux#anaconda" target=”_blank” >Linux Cheat Sheet</a>.