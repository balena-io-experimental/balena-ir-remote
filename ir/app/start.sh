#!/usr/bin/env bash

if [ ! -f /data/cmd.json ]; then
    cp cmd.json /data/cmd.json
fi

mkdir -p /var/run/lirc && lircd

node index.js
