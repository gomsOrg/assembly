const mongoose = require('mongoose')
const dotenv = require('dotenv') // Module which reads the env. variables from .env file
const museumData = require('./dbModel')

dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// eslint-disable-next-line no-console
db.on('error', (error) => console.error(error))
db.once('open', () => '')

class MuseumRecords {
  // Query the DB based on the input fileds using the model
  async getVisitorsCount (month, year, ignoreMuseum) {
    // Find query based on year and month params
    // eslint-disable-next-line no-return-await
    return await museumData.find(
      {
        year,
        month
      }
    ).then(result => {
      return this.normalizeData(result, ignoreMuseum)
    })
      .catch(error => { // Error response
        return error
      })
  }
  // Normalise the response as per the client/ UI need
  async normalizeData (visitorsData, ignoreMuseum) {
    // Pre-formatted response structure for future use
    const finalResponse = {
      'attendance': {
        'month': '',
        'year': 0,
        'highest': {
          'museum': '',
          'visitors': 0
        },
        'lowest': {
          'museum': '',
          'visitors': 0
        },
        'total': 0
      }
    }
    const visitorsInfo = []
    let sumVisitors = 0
    // Condition to prform ignore and non-ignore cases
    visitorsData.forEach((value) => {
      const museumInfo = JSON.parse(JSON.stringify(value))
      if (museumInfo.museum === ignoreMuseum) {
        finalResponse.attendance.ignored = {
          'museum': museumInfo.museum,
          'visitors': museumInfo.visitors
        }
      } else {
        visitorsInfo.push(museumInfo)
        sumVisitors += museumInfo.visitors
      }
    })
    finalResponse.attendance.total = sumVisitors
    // Sort the visitors count in desc. order
    let sortedInfo = visitorsInfo.sort((a, b) => parseInt(b.visitors) - parseInt(a.visitors))
    // Normalising the final response to client/UI
    finalResponse.attendance.month = sortedInfo[0].month
    finalResponse.attendance.year = sortedInfo[0].year
    finalResponse.attendance.highest.museum = sortedInfo[0].museum
    finalResponse.attendance.highest.visitors = sortedInfo[0].visitors
    finalResponse.attendance.lowest.museum = sortedInfo[sortedInfo.length - 1].museum
    finalResponse.attendance.lowest.visitors = sortedInfo[sortedInfo.length - 1].visitors
    return finalResponse
  }
}

module.exports = MuseumRecords
