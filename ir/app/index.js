#!/bin/env node

const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');
const path = require('path');
const mime = require('mime');
const bodyParser = require("body-parser");
const {
  exec
} = require('child_process');
const app = express();
let currentCommand = {
  remote: "none",
  cmd: "none"
};

errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render('error', {
    error: err
  });
};
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(errorHandler);
app.use(serveStatic(__dirname + '/public', {
  'index': ['index.html']
}));
app.post('/cmd/:remote/:cmd/:apikey', (req, res) => {
  if (!req.params.apikey || req.params.apikey !== process.env.BALENA_SUPERVISOR_API_KEY) {
    return res.status(401).send('Unauthorized');
  }
  currentCommand.remote = req.params.remote;
  currentCommand.cmd = req.params.cmd;
  exec('irsend SEND_ONCE ' + req.params.remote + ' ' + req.params.cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).send('OK');
  });
});

app.get('/cmd', (req, res) => {
  res.status(200).send(currentCommand);
});

app.listen(80);

process.on('SIGINT', () => {
  process.exit();
});
