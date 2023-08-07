#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { BlogStack } from '../lib/main-stack';
import { MStackProps } from '../lib/patterns';

const app = new App();

const env = app.node.tryGetContext('env');
const appName = app.node.tryGetContext('appName');
const subdomain = app.node.tryGetContext('subdomain');
const domain = app.node.tryGetContext('domain');
const certArn = app.node.tryGetContext('certArn');

const mEnvironment = {
  env,
  appName,
  subdomain,
  domain,
  certArn,
};

new BlogStack(app, `${env}-${appName}-stack`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  mEnvironment,
} as MStackProps);
