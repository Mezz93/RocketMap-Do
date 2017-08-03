#!/bin/sh
cd /root/RocketMap-Do/
/usr/bin/screen -AmdS D0 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund00 -l "51.52426646049366,7.4731889192371455" -st 30 -w 135 -ac /root/RMDocs/config/accounts_0.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_01.csv
sleep 60
/usr/bin/screen -AmdS D1 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund01 -l "51.57991708908199,7.4740652549910465" -st 30 -w 115 -ac /root/RMDocs/config/accounts_1.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_02.csv
sleep 60
/usr/bin/screen -AmdS D2 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund02 -l "51.55159462006183,7.551135593860181" -st 30 -w 115 -ac /root/RMDocs/config/accounts_2.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_03.csv
sleep 60
/usr/bin/screen -AmdS D3 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund03 -l "51.49594398495757,7.550260873479033" -st 30 -w 115 -ac /root/RMDocs/config/accounts_3.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_04.csv
sleep 60
/usr/bin/screen -AmdS D4 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund04 -l "51.46856482368192,7.472458272444442" -st 30 -w 115 -ac /root/RMDocs/config/accounts_4.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_05.csv
sleep 60
/usr/bin/screen -AmdS D5 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund05 -l "51.496836281592664,7.395482161619611" -st 30 -w 115 -ac /root/RMDocs/config/accounts_5.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_06.csv
sleep 60
/usr/bin/screen -AmdS D6 /opt/python/bin/python /root/RocketMap-Do/runserver.py -ns -speed -sn Dortmund06 -l "51.55248691018421,7.396357968842381" -st 30 -w 115 -ac /root/RMDocs/config/accounts_6.csv -cf /root/RMDocs/config/config-ivwp.ini --disable-clean --high-lvl-accounts /root/RMDocs/config/Level30/highlvl_07.csv
sleep 1