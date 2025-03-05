import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { FatalError } from '../../domain/errors/FatalError';

const secretsClient = new SecretsManagerClient({
  region: process.env.AWS_SEOUL_REGION,
});

/**
 * Production 환경에서 AWS Secrets Manager에서 데이터베이스 비밀번호를 가져옵니다.
 * @returns DataBase Password
 */
export async function getDatabasePassword(): Promise<string | undefined> {
  try {
    // 운영 환경이 아닌 경우 환경변수에서 비밀번호 가져오기
    if (process.env.NODE_ENV !== 'production') {
      return process.env.DATABASE_PASSWORD;
    }

    const command = new GetSecretValueCommand({
      SecretId: process.env.DATABASE_SECRET_NAME,
    });

    // AWS Secrets Manager에서 비밀번호 가져오기
    const response = await secretsClient.send(command);
    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString);
      return secret.password;
    }
  } catch (error) {
    throw new FatalError(error);
  }
}
