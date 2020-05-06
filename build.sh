#!/bin/bash

fullfileDev="/opt/docs/dist/v1/kasimir.full.js"
fullfileMin="/opt/docs/dist/v1/kasimir.full-min.js"

repos=(kasimir-tpl kasimir-http-request kasimir-form)


echo "" > $fullfileDev
echo "" > $fullfileMin

for cur in ${repos[*]}; do
    echo "updateing $cur...";
    if [ ! -e /opt/libs/$cur ]; then
        git clone git@github.com:kasimirjs/$cur.git /opt/libs/$cur
    else
        git  -C /opt/libs/$cur pull
    fi;

    cp /opt/libs/$cur/dist/* /opt/docs/dist/v1
    cat /opt/libs/$cur/dist/$cur.js >> $fullfileDev
    echo "" >> $fullfileDev
    cat /opt/libs/$cur/dist/$cur-min.js >> $fullfileMin

done



