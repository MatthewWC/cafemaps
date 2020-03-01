exports.serverStatus = function(req, res){
  res.status(200).send({ status: 'up' })
}