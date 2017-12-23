#!/bin/bash

index=index.html
echo '<ul>'  > $index

for f in $(ls -1 *.svg | sort) ; do
  html=${f%.svg}.html
  cat ../coloring.html | sed 's@\(<object data="\)[^"]*@\1'$f'@g' > $html
  echo "<a href='$html'>${f%.svg}</a> <br/>" >> $index
done

echo '</ul>' >> $index
