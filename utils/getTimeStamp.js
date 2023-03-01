const moment = require("moment")

module.exports = function(date){
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
}