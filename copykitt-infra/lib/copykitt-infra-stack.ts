import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ApiGateway } from 'aws-cdk-lib/aws-events-targets';
// load .env from two levels up (project root)
dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });


// a stack is where you have a list of all the aws resources you use in the project
export class CopykittInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1️⃣ Make sure the key is present
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is required but was not found in .env');
    }

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
    code: lambda.Code.fromAsset("copykitt-infra/lambda_base_layer/layer.zip"),
    compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
    compatibleArchitectures: [ lambda.Architecture.ARM_64 ], 
    })

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      architecture: lambda.Architecture.ARM_64,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../app')),
      handler: 'copykitt_api.handler',
      layers: [layer],
      environment: {
        OPENAI_API_KEY: openaiApiKey,
      },
    });

    const copykittApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "Copykitt Tutorial Api",

    });

    copykittApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda)
    });
  }
}

// cdk bootstrap command:
// cdk bootstrap aws://376129847485/us-east-2

// cdk deploy command
//cdk deploy --app "npx ts-node copykitt-infra/bin/copykitt-infra.ts"

//public facing url
//https://7h2itud59f.execute-api.us-east-2.amazonaws.com/prod/