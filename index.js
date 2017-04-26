const Datastore = require('@google-cloud/datastore')
const datastore = Datastore()
const { each, merge } = require('lodash')

exports.store = function (req, res) {
  const isValid = (req.body.data && req.body.data[0].href)

  if (req.method = 'POST' && isValid) {
    return handlePost(req.body.data, (err) => {
      if (err) return res.send(err)
      res.send('saved')
    })
  } else {
    return res.send('no data')
  }
}

function handlePost (products, callback) {
  let count = 0
  const date = Date.now()

  each(products, product => {
    const key = datastore.key({
      namespace: 'food-data',
      path: ['Product', product.href]
    })


    const p = merge(product, { date })

    datastore.save({ key, data: p }, err => {
      console.log({err})
      if (err) callback(err)

      count ++

      if (count === products.length) callback(null)
    })
  })

  console.log({products})
}
