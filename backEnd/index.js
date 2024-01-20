const connectToMongo = require('./Db');
var cors = require('cors')
const express = require('express')

connectToMongo();
const app = express()
const port = 4000 

app.use(cors())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api/auth',require('./router/auth'))
app.use('/api/notes',require('./router/notes'))
app.get("/",(req,res)=>{
  res.send("BOOm in home")
})

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})


