#!/bin/bash

set -e

inp=$1

o=${inp%.html}
echo $inp $o

mkdir $o
cd $o

cp ../$inp .
cat $inp | grep '<script' | grep src | sed 's@.* src="\([^"]*\).*@\1@g' \
| while read i ; do
    cp ../$i .
done
