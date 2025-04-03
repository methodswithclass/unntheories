import { Construct } from "constructs";
import { aws_cognito as cognito } from "aws-cdk-lib";
import { MStackProps, MNested, MFunction } from "./patterns";

export class CognitoStack extends MNested {
  readonly userPoolId: string;
  readonly appClientId: string;

  constructor(scope: Construct, id: string, props?: MStackProps) {
    super(scope, id, props);

    const { userPoolId, appClientId } = this.createUserPool("userpool");

    this.userPoolId = userPoolId;
    this.appClientId = appClientId;
  }

  createUserPool(name: string) {
    const { env, subdomain, domain } = this.mEnvironment;

    const appUrl = `https://${subdomain}.${domain}`;

    const urls = [appUrl];

    if (env === "dev") {
      urls.push("http://localhost:3000");
    }

    const userPoolName = this.getName(name);

    const template = `Here is {username} and temporary password is {####}`;

    const userPool = new cognito.UserPool(this, `${userPoolName}-id`, {
      userPoolName,
      featurePlan: cognito.FeaturePlan.ESSENTIALS,
      customAttributes: {
        userBid: new cognito.StringAttribute({ minLen: 10, mutable: false }),
      },
      userInvitation: {
        emailSubject: "Temporary Password",
        emailBody: template,
        smsMessage: template,
      },
    });

    const appClient = userPool.addClient(`${userPoolName}-client-id`, {
      userPoolClientName: `${userPoolName}-client`,
      oAuth: {
        callbackUrls: urls,
        logoutUrls: urls,
      },
    });

    return {
      userPoolId: userPool.userPoolId,
      appClientId: appClient.userPoolClientId,
    };
  }
}
