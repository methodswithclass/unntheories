import { Construct } from 'constructs';
import { MStackProps, MNested, MFunction } from './patterns';
import {
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as cfOrigins,
  aws_s3 as s3,
  aws_certificatemanager as certificatemanager,
  aws_route53 as route53,
  Duration,
  RemovalPolicy,
} from 'aws-cdk-lib';

export class CloudfrontStack extends MNested {
  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    this.createCloudfront();
  }

  createCloudfront() {
    const { env, subdomain, domain, certArn } = this.mEnvironment;

    const { Bucket, BucketAccessControl, BlockPublicAccess, HttpMethods } = s3;
    const { Distribution, OriginAccessIdentity } = cloudfront;
    const { S3Origin, RestApiOrigin } = cfOrigins;

    const cert = certificatemanager.Certificate.fromCertificateArn(
      this,
      'domainCert',
      certArn
    );

    const bucketName = this.getName('frontend');
    const distName = this.getName('dist');

    const allowedOrigins = [domain, `*.${domain}`, 'http://localhost:*'];

    const cors: s3.CorsRule = {
      allowedMethods: [HttpMethods.GET],
      allowedOrigins,
    };

    const bucket = new Bucket(this, `${bucketName}-id`, {
      bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.PRIVATE,
      cors: [cors],
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      this.getName('access-id')
    );
    bucket.grantRead(originAccessIdentity);

    const originRequestLambda = new MFunction(
      this,
      `${this.getName('origin-request')}-fn`,
      {
        mEnvironment: {
          ...this.mEnvironment,
          name: 'origin-request',
        },
      }
    );

    const domainNames = [`${subdomain}.${domain}`];

    if (env === 'prod') {
      domainNames.push(domain);
    }

    const dist = new Distribution(this, distName, {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, {
          originAccessIdentity,
          originId: this.getName('frontend-origin'),
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion: originRequestLambda.function.currentVersion,
          },
        ],
      },
      domainNames,
      certificate: cert,
    });

    const zone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: domain,
    });

    new route53.CnameRecord(this, this.getName('record'), {
      recordName: subdomain,
      zone,
      domainName: dist.distributionDomainName,
      ttl: Duration.seconds(60),
    });
  }
}
