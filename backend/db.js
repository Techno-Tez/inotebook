const mongoose = require('mongoose')
const url = 'mongodb+srv://pateltejas2005:patelbrothers%402005@cluster0.gf7ifp2.mongodb.net/inotebook?retryWrites=true&w=majority'

const connectToMongo = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected successfully to database'))
    .catch((err) => console.error(err));
}

module.exports = connectToMongo