#!/usr/bin/env node
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const yargs = require('yargs');
const { exec } = require('child_process');
const { fork } = require('child_process');