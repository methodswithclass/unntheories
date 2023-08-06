import { Construct } from 'constructs';
import { MStack, MStackProps } from './patterns';
import { ApiStack } from './api-stack';
import { CloudfrontStack } from './cloudfront-stack';
import { aws_dynamodb as dynamodb, RemovalPolicy } from 'aws-cdk-lib';

export class BlogStack extends MStack {
  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    const tableShortName = 'table';

    const apiStack = new ApiStack(this, this.getName('api-stack'), {
      mEnvironment: {
        ...this.mEnvironment,
        tableShortName,
      },
    });

    const { api } = apiStack;

    const cloudfront = new CloudfrontStack(
      this,
      this.getName('cloudfront-stack'),
      {
        mEnvironment: {
          ...this.mEnvironment,
          api,
        },
      }
    );

    cloudfront.addDependency(apiStack);

    this.createTable(tableShortName);
  }

  createTable(name: string) {
    const tableName = this.getName(name);

    const table = new dynamodb.Table(this, `${tableName}-id`, {
      tableName,
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    return table;
  }
}
