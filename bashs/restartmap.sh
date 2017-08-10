#!/bin/sh
cd
screen -X -S DoMap quit
cd /root/RocketMap/
/usr/bin/screen -AmdS DoMap /opt/python/bin/python /root/RocketMap/runserver.py -novc -os -sn DortmundMap -l "51.5131377,7.4647469" -cf /root/RocketMap/config/config.ini -pd 168
sleep 2