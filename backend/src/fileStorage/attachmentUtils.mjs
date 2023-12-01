import AWS from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';

const s3BucketName = process.env.IMAGES_S3_BUCKET;
const urlExpirationData = +process.env.SIGNED_URL_EXPIRATION;

export class attachmentUtils {

    // attach image url
    buildAttachmentUrl(todoId) {
        return `https://${s3BucketName}.s3.amazonaws.com/${todoId}`;
    }

    getUploadUrl(todoId) {

        // s3
        const s3 = new AWSXRay.captureAWS(AWS).S3({ signatureVersion: 'v4' });

        return s3.getSignedUrl('putObject', {
            Bucket: s3BucketName,
            Key: todoId,
            Expires: urlExpirationData
        });
    }
}
