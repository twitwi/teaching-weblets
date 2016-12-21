
inkscape --export-png=image.png --export-id=baseimage data.svg
inkscape --export-png=filter.png --export-id=basefilter data.svg


convolutionImageUsingImageMagick() {
    fsize=$(file filter.png | sed 's@.* \([0-9][0-9]*\) x \([0-9][0-9]*\).*@\1x\2:@g')
    fcontent=$(python3 <<EOF
from scipy import misc
im=misc.imread("filter.png")[:,:,0]
def im2coefs(im):
   return " ".join([
      ",".join([
         str((v/255 - 0.5)) for v in list(r)
      ]) for r in list(im)
    ])

print(im2coefs(im))
EOF
           )

    convert image.png -bias 50% -define convolve:scale=\! -morphology Convolve "$fsize $fcontent" -background white -alpha remove ,,.png

}


convolutionPythonToJS() {
    printf "rawConvData = " > conv.js
python3 <<EOF
from scipy import misc
from scipy import signal
import numpy as np
import json

im = misc.imread("image.png")[:,:,0]
fi = misc.imread("filter.png")[:,:,0]
fi = fi / fi.max()
fi = fi - fi.mean()
fi = fi / np.product(fi.shape)

o = signal.convolve2d(im[:,:],
                      fi[::-1,::-1],
                      mode='same')
#[:,:,0]
#print(o)

with open('conv.js', 'a') as outfile:
    data = { "values": o.tolist(),
             "min": o.min(),
             "max": o.max(),
             "mean": o.mean()
           }
    json.dump(data, outfile)

EOF
}

convolutionPythonToJS
