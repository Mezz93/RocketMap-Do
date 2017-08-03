#!/bin/sh
cd
screen -X -S DoMap quit
sleep 1
cd /root/RocketMap-Do/
/usr/bin/screen -AmdS DoMap /opt/python/bin/python /root/RocketMap-Do/runserver.py -novc -os -sn DortmundMap -l "51.5131377,7.4647469" -cf /root/RMDocs/config/config.ini -pd 168