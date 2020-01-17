const { s3 } = require('./s3')
const fs = require('fs')

exports.imageUpload = async function(req, res) {
  console.log(req.file)
  
  // build request
  const s3Params = {
    Bucket: 'amplifys3storageimages-default',
    Key: req.file.originalname,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read',
    Body: req.file.buffer
  }
    
  //send request to s3
  s3.upload(s3Params, function(error, data){
    if(error){
      throw error
    }
    res.end(data.Location)
  }) 
}