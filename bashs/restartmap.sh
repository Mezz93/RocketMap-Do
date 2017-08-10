#!/bin/sh
cd
screen -X -S DoMap quit
cd /root/RocketMap-Do-Dev/
/usr/bin/screen -AmdS DoMap /opt/python/bin/python /root/RocketMap-Do-Dev/runserver.py -novc -os -sn DortmundMap -l "51.5131377,7.4647469" -cf /root/RMDocs/config/config.ini -pd 168
sleep 2