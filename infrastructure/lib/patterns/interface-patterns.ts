import { StackProps } from 'aws-cdk-lib';

export interface MStackProps extends StackProps {
  readonly mEnvironment: {
    [key: string]: any;
  };
}
