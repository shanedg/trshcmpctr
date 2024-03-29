import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import config from './config.json' assert { type: 'json' };

const {
  accessKeyId,
  // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/locking-api-versions.html
  s3ApiVersion = '2006-03-01',
  s3BucketName = 'trshcmpctr.com',
  s3Region = 'us-east-1',
  secretAccessKey,
} = config;

const s3Client = new S3Client({
  apiVersion: s3ApiVersion,
  region: s3Region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Download an object from bucket
 * @param {string} path
 */
export const getObject = async path => await s3Client.send(new GetObjectCommand({
  Bucket: s3BucketName,
  Key: path,
}));

/**
 * Upload an object to bucket
 * @param {string} path
 * @param {string | Uint8Array | Buffer | Readable} body Object contents
 */
export const putObject = async (path, body) => await s3Client.send(new PutObjectCommand({
  Body: body,
  Bucket: s3BucketName,
  Key: path,
}));
