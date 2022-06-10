const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config({ path: './config.env' })
const cors = require('cors')
//* Services
const schema = require('./Services/Graphql/schema')
const mongoConnect = require('./Services/Database/Connect')



const app = express()
app.use(cors())
mongoConnect()


app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}/graphql`))