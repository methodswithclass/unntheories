import { Construct } from 'constructs';
import { aws_iam as iam, aws_apigateway as apigateway } from 'aws-cdk-lib';
import { MStackProps, MNested, MFunction } from './patterns';

export class ApiStack extends MNested {
  readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    const { api } = this.createApi('api');

    this.api = api;
  }

  createApi(name: string) {
    const { tableShortName } = this.mEnvironment;

    const apiName = this.getName(name);
    const tableName = this.getName(tableShortName);

    const apiPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          principals: [new iam.AnyPrincipal()],
          actions: ['execute-api:Invoke'],
          resources: [`execute-api:/*`],
        }),
      ],
    });

    const listLambdaPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:dynamodb:us-east-1:654627066109:table/${tableName}`],
      actions: ['dynamodb:Query'],
    });

    const listLambda = new MFunction(this, `${this.getName('listBlogs')}-fn`, {
      mEnvironment: {
        ...this.mEnvironment,
        name: 'listBlogs',
        options: {
          policies: [listLambdaPolicy],
        },
      },
    });

    const blogApi = new apigateway.RestApi(this, apiName, {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      endpointTypes: [apigateway.EndpointType.REGIONAL],
      policy: apiPolicy,
    });
    const apiResource = blogApi.root.addResource('api');
    const itemsResource = apiResource.addResource('blogs');
    const itemResource = itemsResource.addResource('{blog}');

    itemsResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(listLambda.function)
    );

    // const postLambdaPolicy = new iam.PolicyStatement({
    //   effect: iam.Effect.ALLOW,
    //   resources: [`arn:aws:dynamodb:us-east-1:654627066109:table/${tableName}`],
    //   actions: ['dynamodb:PutItem'],
    // });

    // const postLambda = new MFunction(this, `${this.getName('postBlog')}-fn`, {
    //   mEnvironment: {
    //     ...this.mEnvironment,
    //     name: 'postBlog',
    //     options: {
    //       policies: [postLambdaPolicy],
    //     },
    //   },
    // });

    // itemResource.addMethod(
    //   'POST',
    //   new apigateway.LambdaIntegration(postLambda.function)
    // );

    return { api: blogApi };
  }
}
