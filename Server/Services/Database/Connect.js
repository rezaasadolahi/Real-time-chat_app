const { connect } = require("mongoose")



const mongoConnect = async () => {
  try {
    connect(process.env.MONGO_URI, () => console.log('MongoDB Connected'))
  }
  catch (error) {
    console.log(error)
  }
}


module.exports = mongoConnect