export NODE_DEVICEUDID=$(instruments -s | sed -n '/iPhone/,/Serial/p' | grep iPhone | grep -v Simulator | awk -F '[][]' '{print $2}')
export NODE_DEVICEIOS=$(instruments -s | sed -n '/iPhone/,/Serial/p' | grep iPhone | grep -v Simulator | awk -F '[()]' '{print $2}')
export NODE_DEVICENAME=$(instruments -s | sed -n '/iPhone/,/Serial/p' | grep iPhone | grep -v Simulator | awk -F '[()]' '{print $1}')
