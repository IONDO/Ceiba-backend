const moment = require('moment');

const convertDate = (date) => {
    return moment.utc(date, 'DD/MM/YYYY').format()
}

module.exports = { 
    convertDate,
}