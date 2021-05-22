const moment = require('moment')

const MongooseFormatDate = 'YYYY-MM-DD'

const dateValidation = (date) => {
  return moment(date, MongooseFormatDate, true).isValid()
}

const toMongooseDate = (date) => new Date(date.valueOf())

module.exports = {
  dateValidation,
  MongooseFormatDate,
  toMongooseDate,
}
