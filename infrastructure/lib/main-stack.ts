import { Construct } from 'constructs';
import { MStackProps } from './patterns/interface-patterns';
import { MStack } from './constructs/methods-stack-construct';
import {
  aws_lambda as lambda,
  aws_apigateway as apigateway,
  aws_dynamodb as dynamodb,
} from 'aws-cdk-lib';
import * as path from 'path';

export class BlogStack extends MStack {
  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    const { ENV } = this.mEnvironment;

    const listBlogsLambdaName = `${ENV}-blog-list`;
    const getBlogLambdaName = `${ENV}-blog-get`;
    const postBlogLambdaName = `${ENV}-blog-post`;

    const blogApi = new apigateway.RestApi(this, 'api-blog', {});
    const itemsResource = blogApi.root.addResource('blogs');
    const itemResource = itemsResource.addResource('{blog}');

    const listLambda = new lambda.Function(this, listBlogsLambdaName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: listBlogsLambdaName,
      handler: `listBlogs.handler`,
      code: lambda.Code.fromAsset(
        path.resolve(__dirname, '../build/listBlogs')
      ),
      environment: {
        ENV,
      },
    });

    itemsResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(listLambda)
    );

    const getLambda = new lambda.Function(this, getBlogLambdaName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: getBlogLambdaName,
      handler: `getBlog.handler`,
      code: lambda.Code.fromAsset(path.resolve(__dirname, '../build/getBlog')),
      environment: {
        ENV,
      },
    });

    const postLambda = new lambda.Function(this, postBlogLambdaName, {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: postBlogLambdaName,
      handler: `postBlog.handler`,
      code: lambda.Code.fromAsset(path.resolve(__dirname, '../build/postBlog')),
      environment: {
        ENV,
      },
    });

    itemResource.addMethod('GET', new apigateway.LambdaIntegration(getLambda));
    itemResource.addMethod(
      'POST',
      new apigateway.LambdaIntegration(postLambda)
    );

    const tableName = `${ENV}-blogs-table`;

    new dynamodb.Table(this, tableName, {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });
  }
}
