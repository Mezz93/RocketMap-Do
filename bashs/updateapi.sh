#!/bin/sh
cd ..
git pull
sleep 1
pip uninstall pgoapi
sleep 1
pip install --upgrade -r requirements.txt