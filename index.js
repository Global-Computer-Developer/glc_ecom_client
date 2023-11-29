const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('/names', (req, res) => {
    res.send('Global Computer BD');
})

app.listen(5000, () => {
    console.log('Server is running!')
})