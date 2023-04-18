const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const util = require('util');

morgan.token('message', (req, res) => {
    console.log(req);
})


const configMorgan = (app) => {
    var log_file = rfs.createStream(`D:/rate-race-node/src/app.log`, {
        size: '10M', // rotate every 10 MegaBytes written
        interval: '1d', // rotate daily
        compress: 'gzip' // compress rotated files
    });
    var log_stdout = process.stdout;

    console.log = function (d) {
        log_file.write(util.format(d) + '\n');
        log_stdout.write(util.format(d) + '\n');
    };

    console.log = function (d) {
        log_file.write(util.format(d) + '\n');
        log_stdout.write(util.format(d) + '\n');
    };

    morgan.format('myFormat', ':method :url :status :res[content-length] - :response-time ms :date ');
    app.use(morgan('myFormat'));
    app.use(morgan('myFormat', {
        stream: log_file
    }));
}

module.exports = configMorgan;