import { Construct } from "constructs";
import { MStack, MStackProps } from "./patterns";
import { ApiStack } from "./api-stack";
import { CloudfrontStack } from "./cloudfront-stack";
import { CognitoStack } from "./cognito-stack";
import { aws_dynamodb as dynamodb, RemovalPolicy } from "aws-cdk-lib";

export class BlogStack extends MStack {
  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    const tableShortName = "table";

    const cognitoStack = new CognitoStack(this, this.getName("cognito-stack"), {
      mEnvironment: {
        ...this.mEnvironment,
      },
    });

    const { userPoolId, appClientId } = cognitoStack;

    const apiStack = new ApiStack(this, this.getName("api-stack"), {
      mEnvironment: {
        ...this.mEnvironment,
        tableShortName,
        userPoolId,
        appClientId,
      },
    });

    const { api } = apiStack;

    const cloudfrontStack = new CloudfrontStack(
      this,
      this.getName("cloudfront-stack"),
      {
        mEnvironment: {
          ...this.mEnvironment,
          api,
        },
      }
    );

    apiStack.addDependency(cognitoStack);
    cloudfrontStack.addDependency(apiStack);

    this.createTable(tableShortName);
  }

  createTable(name: string) {
    const tableName = this.getName(name);

    const table = new dynamodb.Table(this, `${tableName}-id`, {
      tableName,
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    return table;
  }
}
