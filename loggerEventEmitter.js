const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger();

// register a listener
logger.on('messageLogged', (arg) => {
    console.log("Listener called", arg);
});

var message = "this is a test message";

logger.log(message);