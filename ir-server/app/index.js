#!/bin/env node

const Constants = require(__dirname + '/libs/constants');
const constants = new Constants();
const Ir = require(__dirname + '/libs/ir.js');
const ir = new Ir();
const express = require('express');
const compression = require('compression');
const bodyParser = require("body-parser");
const app = express();

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

app.post(`/v${constants.VERSION}/ir`, (req, res) => {
  if (req.body.name) {
    ir.readCmd(constants.RX_DEVICE, req.body.name).then((cmd) => {
      res.status(200).send({
        name: req.body.name,
        cmd: cmd
      });
    }).catch((err) => {
      res.status(500).send(err.message);
    });
  } else {
    res.status(400).send("Missing target command name");
  }
});

app.put(`/v${constants.VERSION}/ir`, (req, res) => {
  if (req.body.name) {
    ir.writeCmd(constants.TX_DEVICE, req.body.name).then(() => {
      res.status(200).send("OK");
    }).catch((err) => {
      res.status(500).send(err.message);
    });
  } else {
    res.status(400).send("Missing target command name");
  }
});

app.get(`/v${constants.VERSION}/irs`, (req, res) => {
  ir.listCmdFiles().then((list) => {
    res.status(200).send(list);
  }).catch((err) => {
    res.status(500).send(err.message);
  });
});

app.get(`/v${constants.VERSION}/ir`, (req, res) => {
  if (req.body.name) {
    ir.readCmdFile(req.body.name).then((cmd) => {
      res.status(200).send({
        name: req.body.name,
        cmd: cmd
      });
    }).catch((err) => {
      res.status(500).send(err.message);
    });
  } else {
    res.status(400).send("Missing target command name");
  }
});

app.delete(`/v${constants.VERSION}/ir`, (req, res) => {
  if (req.body.name) {
    ir.deleteCmdFile(req.body.name).then(() => {
      res.status(200).send("OK");
    }).catch((err) => {
      res.status(500).send(err.message);
    });
  } else {
    res.status(400).send("Missing target command name");
  }
});

app.listen(constants.PORT, constants.HOST, () => {
  console.log(`server listening on port ${constants.PORT} with host set to ${constants.HOST}`);
});
