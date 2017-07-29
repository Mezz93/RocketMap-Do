#!/bin/sh
cd 
""" wefwef"""
screen -X -S DiscordAlarmTest quit
/usr/bin/screen -AmdS DiscordAlarmTest /opt/python/bin/python /root/PokeAlarm/start_pokealarm.py -cf /root/PokeAlarm/config/config_test.ini
sleep 2