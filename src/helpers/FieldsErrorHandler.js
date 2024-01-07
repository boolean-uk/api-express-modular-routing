const ErrorConstructor = require('./ErrorConstructor')

const FieldsErrorHandler = (fields) => {
  fields.forEach((field) => {
    if (!field) {
      throw ErrorConstructor('Missing fields in request body', 400)
    }
  })

  return fields
}

module.exports = FieldsErrorHandler
