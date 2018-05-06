/*  This is the setup for the staging and production server,
    i.e not for development.
*/
/* eslint-disable */
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));

app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
    console.log(`Open http://localhost:${port}/ 🚀`);
});
