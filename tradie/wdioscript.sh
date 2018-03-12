#!/bin/bash

./node_modules/.bin/wdio ./wdio.conf.pcloudy.js --suite=sanity --path=$1 --browserName=$2 --deviceName=$3 --platformName=$4
