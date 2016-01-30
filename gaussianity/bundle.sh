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
cat $inp | grep '<link rel' | grep src | sed 's@.* href="\([^"]*\).*@\1@g' \
| while read i ; do
    cp ../$i .
done

sed -i -e 's@\(.*script.* src="\)[^"]*/\([^"]*".*\)@\1\2@g' $inp
sed -i -e 's@\(.*link rel=.* href="\)[^"]*/\([^"]*".*\)@\1\2@g' $inp
