const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/inotebook'

const connectToMongo = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected successfully to database'))
    .catch((err) => console.error(err));
}

module.exports = connectToMongo