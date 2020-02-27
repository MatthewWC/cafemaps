const { s3 } = require('./s3')
const fs = require('fs')
const { UnknownError } = require('../errors')

exports.imageUpload = async function(req, res) {
 try{
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
        return error
      }
      res.end(data.Location)
    }) 
  }
  catch(error){
    throw new UnknownError
  }
}