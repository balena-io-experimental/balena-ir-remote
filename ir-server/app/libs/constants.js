#!/bin/env node

module.exports = class Constants {
  constructor() {
    this.TX_DEVICE = "/dev/lirc0";
    this.RX_DEVICE = "/dev/lirc1";
    this.VERSION = 1;
    this.HOST= process.env.MARIONETTE_SERVICE_HOST || '0.0.0.0';
    this.PORT = parseInt(process.env.MARIONETTE_SERVICE_PORT || 80, 10);
  }
};
