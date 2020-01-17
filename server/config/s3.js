const aws = require('aws-sdk')

// aws instance
exports.s3 = new aws.S3({
  signatureVersion: 'v4',
  region: 'us-east-1',
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEYID
})
