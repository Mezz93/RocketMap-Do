#!/usr/bin/python
# -*- coding: utf-8 -*-

"""check-captcha.py: Example script to solve ingame captcha manually"""

from pgoapi import PGoApi
from pgoapi.utilities import f2i
from pgoapi import utilities as util
from pgoapi.exceptions import AuthException
import pprint
from pprint import pprint
import time

def check_captcha(username, password, auth):
    #print('Accepting Terms of Service for {}'.format(username))
    api = PGoApi()
    api.set_position(51.5030922, 7.466812, 0.0)
    api.login(auth, username, password)
    time.sleep(2)
    
    response_dict = api.check_challenge()
    pprint(response_dict)
    
    if(len(response_dict['responses']['CHECK_CHALLENGE']['challenge_url']) > 1):
        token = raw_input("What did you get back from the str var?")
        token = token.strip()

        r2 = api.verify_challenge(token=token)
        pprint(r2)
    else:
        print("Account is ok")

check_captcha('NAME', 'PASSWORD', 'ptc')
