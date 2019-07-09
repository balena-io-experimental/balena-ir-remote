#!/usr/bin/env bash

mkdir -p /var/run/lirc && lircd

node index.js
