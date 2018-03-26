#!/bin/bash

echo " print params path  ".$1." browsername ".$2 ." devicename ".$3

./node_modules/.bin/wdio ./wdio.conf.pcloudy.js --suite=sanity --path=$1 --browserName=$2 --deviceName=$3  --rid=$4 --interface=$5  --apitoken=$6
