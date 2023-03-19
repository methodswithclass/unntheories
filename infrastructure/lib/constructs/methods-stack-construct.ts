import { Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { MStackProps } from '../patterns/interface-patterns';

export class MStack extends Stack {
  readonly mEnvironment: any;

  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    this.mEnvironment = props?.mEnvironment;
  }
}
