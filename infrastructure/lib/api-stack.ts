import { Construct } from "constructs";
import {
  aws_iam as iam,
  aws_apigateway as apigateway,
  Duration,
} from "aws-cdk-lib";
import { MStackProps, MNested, MFunction } from "./patterns";

export class ApiStack extends MNested {
  readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    const { api } = this.createApi("api");

    this.api = api;
  }

  createApi(name: string) {
    const { tableShortName, userPoolId, appClientId } = this.mEnvironment;

    const apiName = this.getName(name);
    const tableName = this.getName(tableShortName);

    const apiPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [new iam.AnyPrincipal()],
          actions: ["execute-api:Invoke"],
          resources: [`execute-api:/*`],
        }),
      ],
    });

    const processLambdaPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:dynamodb:us-east-1:654627066109:table/${tableName}`],
      actions: ["dynamodb:Query", "dynamodb:PutItem"],
    });

    const processLambda = new MFunction(this, `${this.getName("process")}-fn`, {
      mEnvironment: {
        ...this.mEnvironment,
        name: "process",
        options: {
          policies: [processLambdaPolicy],
        },
      },
    });

    const processAuthLambda = new MFunction(
      this,
      `${this.getName("process-auth")}-fn`,
      {
        mEnvironment: {
          ...this.mEnvironment,
          name: "process-auth",
          options: {
            policies: [processLambdaPolicy],
            environment: {
              userPoolId,
              appClientId,
            },
          },
        },
      }
    );

    const authLambda = new MFunction(
      this,
      `${this.getName("auth-lambda")}-fn`,
      {
        mEnvironment: {
          ...this.mEnvironment,
          name: "authorizer",
          options: {
            environment: {
              userPoolId,
              appClientId,
            },
          },
        },
      }
    );

    const authorizer = new apigateway.RequestAuthorizer(
      this,
      `${this.getName("authorizer")}`,
      {
        handler: authLambda.function,
        identitySources: [apigateway.IdentitySource.header("authorization")],
        resultsCacheTtl: Duration.seconds(0),
      }
    );

    const api = new apigateway.RestApi(this, apiName, {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      endpointTypes: [apigateway.EndpointType.REGIONAL],
      policy: apiPolicy,
    });
    const apiResource = api.root.addResource("api");
    const processResource = apiResource.addResource("process");
    const processAuthResource = apiResource.addResource("process-auth");

    processResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(processLambda.function)
    );

    processAuthResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(processAuthLambda.function),
      {
        authorizer: authorizer,
      }
    );

    return { api };
  }
}
