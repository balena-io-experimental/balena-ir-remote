#!/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const readdir = util.promisify(require('fs').readdir);
const unlink = util.promisify(require('fs').unlink);
const debug = require('debug')('ir');
module.exports = class IR {

  async readCmdFile(name) {
    return await readFile(`/data/${name}`, 'utf8');
  }

  async listCmdFiles(name) {
    return await readdir(`/data/`);
  }

  async deleteCmdFile(name) {
    return await unlink(`/data/${name}`);
  }

  async readCmd(device, name) {
    const cmd = `ir-ctl -r/data/${name} -d ${device} -1`;
    debug(`listening for cmd to be named ${name} with command ${cmd}`);
    await exec(cmd);
    return await this.readCmdFile(name);
  }

  async writeCmd(device, name) {
    const cmd = `ir-ctl -d ${device} -s /data/${name}`;
    debug(`writing cmd ${name} with command ${cmd}`);
    return await exec(cmd);
  }

};
