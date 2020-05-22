# balena-ir

simple server application that allows to clone, save and arbitrarily execute IR commands.

## SETUP

* a RaspberryPi
* an IR receiver ( 5V tolerant, digital interface ) VCC -> 5V, GND -> GND, OUT -> GPIO23
* an IR transmitter ( 5V tolerant, digital interface ) VCC -> 5V, GND -> GND, SIG -> GPIO24
* the following configuration variable set in your balenaCloud application (`Define DT overlays` option under the _Device Configuration_ tab): **BALENA_HOST_CONFIG_dtoverlay** = `"gpio-ir,gpio_pin=23","gpio-ir-tx,gpio_pin=24"`
(you can use any other HAT GPIO pin since the `gpio-ir` overlay always exposes to userspace the same 2 devices `lirc0` and `lirc1`

## API

#### list saved commands

| METHOD | URL        | JSON BODY PARAMETERS     | SUCCESS                                           | ERROR                    |
|----|------------|---------------------|---------------------------------------------------|--------------------------|
| GET | /v1/irs |  | HTTP 200 `["on","off"]` | HTTP 500 `error message` |

#### read content of a saved commands

| METHOD | URL        | JSON BODY PARAMETERS     | SUCCESS                                           | ERROR                    |
|----|------------|---------------------|---------------------------------------------------|--------------------------|
| GET | /v1/ir | **name** `string` | HTTP 200 `{"name":"on","cmd": "+4525 -4519 +549 ..."}` | HTTP 500 `error message` |

#### delete a command

| METHOD | URL        | JSON BODY PARAMETERS     | SUCCESS                                           | ERROR                    |
|----|------------|---------------------|---------------------------------------------------|--------------------------|
| DELETE | /v1/ir | **name** `string` | HTTP 200 `OK` | HTTP 500 `error message` |

#### save a command

| METHOD | URL        | JSON BODY PARAMETERS     | SUCCESS                                           | ERROR                    |
|----|------------|---------------------|---------------------------------------------------|--------------------------|
| POST | /v1/ir | **name** `string` | HTTP 200 `{"name":"on","cmd": "+4525 -4519 +549 ..."}` | HTTP 500 `error message` |

#### execute a saved command

| METHOD | URL        | JSON BODY PARAMETERS     | SUCCESS                                           | ERROR                    |
|----|------------|---------------------|---------------------------------------------------|--------------------------|
| PUT | /v1/ir | **name** `string` | HTTP 200 `OK` | HTTP 500 `error message` |
