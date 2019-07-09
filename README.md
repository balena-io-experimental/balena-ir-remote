# balena-ir-remote

A simple application for controlling your AC with a RaspberryPi ( or a balenaFin, if you wanna go fancy or even cellular :P )

## the setup

* a RaspberryPi
* an IR receiver ( 5V tolerant, digital interface ) VCC -> 5V, GND -> GND, OUT -> GPIO23
* an IR transmitter ( 5V tolerant, digital interface ) VCC -> 5V, GND -> GND, SIG -> GPIO23

the following configuration variable set: **RESIN_HOST_CONFIG_dtoverlay** = `lirc-rpi,gpio_in_pin=23,gpio_out_pin=22`

## setting up

This project is still a WIP and does not allow for runtime configuration of your IR commands.
Once you have your device up and running, use the webterminal to access a `ir-service` shell and then:

1. run `mode2 -m --driver default --device /dev/lirc0`
2. point the remote to the IR receiver and press the button you want to clone. you will get something like this:
```
root@90ceda1:/usr/src/app# mode2 -m --driver default --device /dev/lirc0
Using driver default on device /dev/lirc0
Trying device: /dev/lirc0
Using device: /dev/lirc0
Warning: Running as root.
 16777215

     3399     1768      392     1336      422     1304
      422      452      424      442      432      431
      396     1335      423      449      423      448
      391     1332      423     1303      397      474
      422     1302      423      443      395      478
      430     1296      394     1333      423      446
      430     1297      395     1336      423      445
      430      441      424     1307      430      437
      428      442      425     1300      424      441
      398      479      421      446      422      444
      396      472      418      461      419      452
      388      477      417      458      419      445
      423      445      428      440      428      439
      396      477      423      441      430      438
      395      474      395     1337      421      447
      432      435      396     1336      432      437
      432      439      423      442      423     1306
      425      446      420      443      395      473
      418      457      423      445      396      475
      419     1311      425     1301      424     1305
      423      443      422      449      395      475
      426      442      396      472      423      447
      424     1306      424      444      424      446
      423      446      424      445      396      472
      396      475      395      473      395      473
      396      473      395      474      425      442
      423      449      392      475      419      455
      424      443      423      441      419      452
      423      443      425      444      424      446
      425      442      396      476      423      445
      395      473      402      472      424      442
      423      445      393      476      424      444
      424      447      424      442      424      440
      396      473      395      473      423      448
      422      445      396      473      423      447
      424      445      395      474      423     1302
      426      443      424      450      419      449
      420     1301      426      444      425
```
3. copy the column-ordered part and create a new remote configuration from `ir/remotes/template.conf` for that command, repeat until you have mapped all the commands you want to handle
4. push your updated app (with the remote config file you added)
5. you can now trigger your commands with a POST request to `<DEVICE IP OR PUBLIC URL>/cmd/$REMOTE_NAME_FROM_YOUR_CONFIG/$REMOTE_COMMAND_NAME_FROM_YOUR_CONFIG/$BALENA_SUPERVISOR_API_KEY` You can get `$BALENA_SUPERVISOR_API_KEY` by running `echo $BALENA_SUPERVISOR_API_KEY` within an `ir-service` webterminal shell.
