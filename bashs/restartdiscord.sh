#!/bin/sh
cd
screen -X -S DiscordAlarm quit
/usr/bin/screen -AmdS DiscordAlarm /opt/python/bin/python /root/PokeAlarm/start_pokealarm.py -cf /root/PokeAlarm/config/config_new.ini
sleep 2