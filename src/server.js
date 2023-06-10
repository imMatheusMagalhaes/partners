const express = require('express');
const PORT = 3123
const app = express();

const startServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.debug(`Server Started at ${PORT}\n`)
    })
}

module.exports = startServer;
