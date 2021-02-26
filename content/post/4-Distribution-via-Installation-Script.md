+++
title = "Distribution via Installation Script - 4/9"
description = "A description"
tags = [
    "scripting",
    "bash",
]
date = "2021-02-06"
archives = "2021"
categories = [
    "Scripting",
    "Bash"
]
menu = "main"
+++

Heya fellows,

This is part 4 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/4-Distributing-by-Installscript)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [**Distribution via Installation Script**](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [Publishing at Anaconda](/2021/9-publishing-at-anaconda)

We created a useful tool, but wouldn't it be nice if we could make it accessible to others? So let's share it! At first, we have to make a snapshot of our virtual environment.

```
$ pip freeze > requirements.txt
```

Thereafter we create a new Git repository and push it to Github!

```
$ echo "# tinyHTTPie" >> README.md
$ git init
$ git add .
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin https://github.com/NiklasTiede/tinyHTTPie.git
$ git push -u origin main
```

Now others will be able to download our project using the `clone` command:

```
$ git clone https://github.com/NiklasTiede/tinyHTTPie.git
```

Now they have to rebuild it by recreating the virtual environment, extracting the Python interpreter path, adding a shebang line to the script and an alias to `.bashrc`. Quite laborious. A bash script automates this process!

I store all my scripts within a `MyScripts` folder so the bash script will create it.

```bash
if [[ ! -d ~/MyScripts ]]; then
    mkdir ~/MyScripts
    folder1=~/MyScripts
    echo "${folder1} was generated."
fi
if [[ ! -d ~/MyScripts/tinyHTTPie ]]; then
    mkdir ~/MyScripts/tinyHTTPie
    folder2=~/MyScripts/tinyHTTPie
    echo "${folder2} was generated."
fi
```

Then the `tihttp.p`y and `requirements.txt` will be copied.

```bash
PWD=$(pwd)
REQUIREMENTS="$PWD/requirements.txt"
SCRIPT="$PWD/tihttp.py"
TARGET=~/MyScripts/tinyHTTPie

cp "$REQUIREMENTS" "$TARGET"
cp "$SCRIPT" "$TARGET"
cd ~/MyScripts/tinyhttp
```

The Python interpreter version is checked.

```bash
PYVER=$(python --version)
CURRENT_PY_VERSION=${PYVER:7:11}
testvercomp ${CURRENT_PY_VERSION} 3.0.0 '>'
if [[ $(echo $CURRENT_PY_VERSION | grep '2.'*) ]]; then
    echo "first digit is 2, you're python version is too low"
elif [[ $(echo $CURRENT_PY_VERSION | grep '3.'*) ]]; then
    echo "first digit is 3, you're python versions fulfills the requirements!"
fi
```

`pipenv` will be installed if it is not yet installed.

```bash
if [[ ! $(pipenv) ]]; then
    echo "pipenv not existent, so installing via pip..."
    pip install pipenv
    echo "...pipenv was installed?"
fi
```

THe virtual environment will be rebuilt.

```bash
pipenv install -r requirements.txt
```

The shebang line is added.

```bash
pybin=$(pipenv --py)
echo -e "#\!${pybin}\n\n$(cat tinyhttp.py.py)" > tinyhttp.py
```

The shebang is checked.

```bash
EXIS_HEADLINE=$(head -n 1 tinyhttp.py)
EXP_HEADLINE="#!${pybin}"
if [[ $EXIS_HEADLINE == $EXP_HEADLINE && ${#EXIS_HEADLINE} == ${#EXP_HEADLINE} ]]; then
    echo "shebang line was added correctly!"
elif [[ $EXIS_HEADLINE != $EXP_HEADLINE || ${#EXIS_HEADLINE} != ${#EXP_HEADLINE} ]]; then
    echo "shebang was NOT added correctly!"
fi
```

File permissions are given.

```bash
chmod +x ~/MyScripts/tiniHTTP/tiny_HTTPie_clone.py
```

The script adds the alias to the configuration file.

```bash
SHELL=$(printenv SHELL)
MYSHELL=${SHELL:5:10}
ALIASFILE=~/.bashrc

if [[ $MYSHELL  == "zsh" ]]; then
    echo "You're default shell is ZSH."
    if [[ -e ~/.aliases ]]; then
        ALIASFILE=~/.aliases
        echo "You're storing your files within the .aliases file."
    elif [[ -e ~/.zshrc ]]; then
        ALIASFILE=~/.zshrc
        echo "You're storing your files within the .zshrc file."
    fi
elif [[ $MYSHELL  == "bash" ]]; then
    echo "You're default shell is BASH."
    if [[ -e ~/.aliases ]]; then
        ALIASFILE=~/.aliases
        echo "You're storing your files within the .aliases file."
    elif [[ -e ~/.bashrc ]]; then
        ALIASFILE=~/.bashrc
        echo "You're storing your files within the .bashrc file."
    fi
fi
```

And thats it! Puh, pretty much work and it's still pretty prone to errors (adding the script to the PATH instead of using an alias would make things less error prone). But there's a better solution to distribute packages in a standardized way: writing a `setup.py` file!

<div>
    <p align="center"><a href="/posts/3-argparse-module/"><< section 3</a> | <a href="/posts/5-distribution-via-setup-file">section 5 >></a> </p>
</div>
