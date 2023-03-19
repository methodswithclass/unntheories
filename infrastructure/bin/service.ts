#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { BlogStack } from '../lib/main-stack';
import { MStackProps } from '../lib/patterns/interface-patterns';

const app = new App();

const ENV = app.node.tryGetContext('ENV');

const mEnvironment = {
  ENV,
};

new BlogStack(app, `${ENV}-blog-stack`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  mEnvironment,
} as MStackProps);
