const fs = require('fs');
const PDFParser = require('pdf-parse');

const dataBuffer = fs.readFileSync('Curriculo - Victor Senisse.pdf');

PDFParser(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(function (error) {
    console.error('Error:', error);
});
