const moment = require('moment');

const prettyDate = (date) => {
    return moment(date).format('MMMM Do YYYY');
}

module.exports = prettyDate;