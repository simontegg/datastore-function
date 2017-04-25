const Datastore = require('@google-cloud/datastore')
const datastore = Datastore()
const { each } = require('lodash')

exports.store = function (req, res) {
  const isValid = (req.body.data && req.body.data[0].href)

  if (req.method = 'POST' && isValid) {
    return handlePost(req.body.data, (err) => {
      if (err) return res.send(err)
      res.send('saved')
    })
  }

  return res.send('no data')
}

function handlePost (products, callback) {
  each(products, product => {
    const key = datastore.key(['Product', product.href])

    datastore.save({ key, data: product }, err => {
      if (err) callback(err)
    })
  })

  console.log({products})
  callback(null)
}
