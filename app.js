const express = require('express')
const app = express()

const port = process.env.PORT || 3000

require('./db/mongoose')

app.use(express.json())

const useRouter = require('./routers/agents')
app.use(useRouter)

app.listen(port, () => {
    console.log('The App runs successfully on port ' + port)
})