const Datastore = require('@google-cloud/datastore')
const datastore = Datastore()
const { map } = require('lodash')

exports.store = function (req, res) {
  if (req.method = 'POST' && req.body.data) {
    return handlePost(req.body.data, (err) => {
      if (err) return res.send(err)
      res.send('saved')
    })
  }

  return res.send('no data')
}

function handlePost (data, callback) {
  console.log({data})
  callback(null)
}
