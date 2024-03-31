const exress = require('express')
const path = require('path')
const app = exress()
const PORT = 4000
const server = app.listen(PORT, () => console.log('chat server on port 4000'))

app.use(exress.static(path.join(__dirname, 'public')))