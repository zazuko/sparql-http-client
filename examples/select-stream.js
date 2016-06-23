var fetch = require('isomorphic-fetch')
var SparqlHttp = require('../')

SparqlHttp.fetch = fetch

var endpoint = new SparqlHttp({endpointUrl: 'http://dbpedia.org/sparql'})
var query = 'SELECT ?height WHERE { <http://dbpedia.org/resource/Eiffel_Tower> <http://dbpedia.org/property/height> ?height }'

endpoint.selectQuery(query).then(function (res) {
  var stream = res.body
  var content = ''

  stream.on('data', function (result) {
    content += result.toString()
  })

  stream.on('end', function () {
    // parse and stringify the content for pretty print
    console.log(JSON.stringify(JSON.parse(content), null, ' '))
  })

  stream.on('error', function (err) {
    console.error(err)
  })
}).catch(function (err) {
  console.error(err)
})
