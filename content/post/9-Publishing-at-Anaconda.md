+++
title = "Publishing at Anaconda and Automation the Process - 9/9"
description = "Publishing a Python at at Anaconda and automate the packaging process"
tags = [
    "scripting",
    "python",
    "packaging",
    "bash",
]
date = "2021-02-25"
archives = "2021"
categories = [
    "Python",
    "Scripting",
    "Packaging",
    "Bash",
]
menu = "main"
+++

Heya fellows,

This is part 9 of the multi-part series "The Evolution of a Script". The code of this post can be found on Github (see [here](https://github.com/NiklasTiede/tinyHTTPie/tree/9-Publishing-at-Anaconda)).

#### Contents

1. [A Simple Script](/2021/1-the-evolution-of-a-script)
2. [Sys Module](/2021/2-sys-module)
3. [Argparse Module](/2021/3-argparse-module/)
4. [Distribution via Installation Script](/2021/4-distribution-via-installation-script)
5. [Distribution via Setup File](/2021/5-distribution-via-setup-file)
6. [Testing and Continuous Integration](/2021/6-testing-and-continous-integration)
7. [Documentation](/2021/7-documentation)
8. [Publishing at PyPI](/2021/8-publishing-at-pypi)
9. [**Publishing at Anaconda**](/2021/9-publishing-at-anaconda)

When a `setup.py` file was already created, it's pretty simple to go a step further and create an [Anaconda](https://anaconda.org) package. Anaconda packages store the necessary metadata within a `meta.yaml` file but when a `setup.py` file was already created its data can be easily imported by jinja2 templating.

```yaml
{% set data = load_setup_py_data() %}

package:
  name: 'tihttp'
  version: {{ data['version'] }}

source:
  path: ..

build:
  number: 0
  entry_points:
    {% for entry_point in data['entry_points']['console_scripts'] %}
    - {{ entry_point }}
    {% endfor %}
  script: python -m pip install --no-deps --ignore-installed .

requirements:
  build:
    - python
    - pip
    - setuptools

  run:
    - python
    {% for dep in data['install_requires'] %}
    - {{ dep.lower() }}
    {% endfor %}

test:
  imports:
    - {{ data['name'] }}
  source_files:
    - tests
  requires:
    {% for test_dep in data['extras_require']['dev'] %}
    - {{ test_dep.lower() }}
    {% endfor %}
  commands:
    - pytest tests

about:
  home: {{ data['url'] }}
  license: {{ data['license'] }}
  summary: {{ data['description'] }}
  doc_source_url: {{ data['url'] + '/blob/master/README.md' }}
```

Now we can build the package.

```
$ conda build .
```

The generated file `tihttp-0.1.0-py37_0.tar.bz2` can be found within the `anaconda3/conda-build/linux-64` directory. To upload the package to the anaconda repository we have to register and then we can use the `anaconda upload` command. The package was uploaded to your channel and is now ready for distribution! 😙

```
$ anaconda upload home/niklas/anaconda3/conda-build/linux-64/tihttp-0.1.0-py37_0.tar.bz2

$ conda install -c niklastiede tihttp
```

But building and uploading packages for different Python interpreter versions and different operating systems is tedious. This work can be automated by a bash script:

```bash
#!/bin/bash

export PATH=~/anaconda3/bin:$PATH
pkg='tihttp'
array=( 3.6 3.7 3.8 3.9 )


# delete old built packages
if [[ -d $HOME/conda-bld/ ]]; then
    rm -r $HOME/conda-bld/
fi
for i in $HOME/anaconda3/conda-bld/linux-64/$pkg*; do
    echo $i
    rm $i
done
echo "Deleting old conda packages done!"


# building conda packages
for i in "${array[@]}"
do
    echo $i
	conda build --py $i .
done
echo "Building conda packages done!"


# converting conda packages to other platforms
platforms=( osx-64 linux-32 linux-64 win-32 win-64 )
for file in $HOME/anaconda3/conda-bld/linux-64/$pkg*; do
    echo $file
    conda convert --platform all $file  -o $HOME/conda-bld/
    for platform in "${platforms[@]}"
    do
        conda convert --platform $platform $file  -o $HOME/conda-bld/
    done
done
echo "converting packages to other platforms done!"


# uploading packages
find $HOME/conda-bld/**/$pkg*.tar.bz2 | while read file
do
    anaconda upload $file
done
echo "Uploading conda packages done!"
```

Instead of automating the build process locally we could instead use this nice github action [Publish Conda](https://github.com/marketplace/actions/publish-conda)! Here's the code snippet for the workflow:

```yaml
name: publish_conda

on:
  release:
    types: [published]
    
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: publish-to-conda
      uses: fcakyon/conda-publish-action@v1.3
      with:
        subdir: 'conda'
        anacondatoken: ${{ secrets.ANACONDA_TOKEN }}
        platforms: 'win osx linux'
```

The world of anaconda does a great service to the data science community and I hope that this post decreases the barrier for publishing things at anaconda. 😄 I wish you all a great time!

<div>
    <p align="center"><a href="/2021/8-publishing-at-pypi"><< section 8</a> | </p>
</div>
