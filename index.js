const express = require('express')
const app = express()

app.get('/names', (req, res) => {
    res.send('tell me what');
})

app.listen(5000, () => {
    console.log('Server is running!')
})