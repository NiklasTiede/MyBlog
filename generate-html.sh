#!/bin/bash

# $ ./generate-html
# CNAME will be moved into newly generated docs-folder and 
# content can be committed/pushed to github

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
HUGO=/home/linuxbrew/.linuxbrew/bin/hugo

mv "$SCRIPTPATH/docs/CNAME" "$SCRIPTPATH"
rm -r "$SCRIPTPATH/docs"
$HUGO
mv "$SCRIPTPATH/CNAME" "$SCRIPTPATH/docs/"

echo 'HTML has been generated!'
