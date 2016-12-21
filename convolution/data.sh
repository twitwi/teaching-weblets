
inkscape --export-png=image.png --export-id=baseimage data.svg
inkscape --export-png=filter.png --export-id=basefilter data.svg



fsize=$(file filter.png | sed 's@.* \([0-9][0-9]*\) x \([0-9][0-9]*\).*@\1x\2:@g')
fcontent=$(python3 -c 'from scipy import misc;im=misc.imread("filter.png")[:,:,0];print(" ".join([ ",".join([ str((v/255 - 0.5)) for v in list(r) ]) for r in list(im) ] ))')

convert image.png -bias 50% -define convolve:scale=\! -morphology Convolve "$fsize $fcontent" -background white -alpha remove ,,.png
