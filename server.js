const app = require('./src/app')
const { port } = require("./src/config/mysql.config")

app.listen(port, () => {
    console.log("Server is listening on port::", port)
})