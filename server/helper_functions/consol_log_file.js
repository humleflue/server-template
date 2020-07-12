/* eslint no-console: 0 */

const fs = require(`fs`);
const path = require(`path`);

const Time = require(`./Time`);

// Modifies the console, such that it logs into the server/logs dir
module.exports = () => {
  const time = new Time(new Date());
  const logDir = path.join(__dirname, `..`, `logs`);

  const logStdout = process.stdout;
  const logFile = (log) => {
    fs.appendFile(path.join(logDir, `${time.dashUSDate}.log`), log, (error) => {
      if (error) {
        throw error;
      }
    });
  };

  console.log = (log) => {
    logFile(`${log}\n`);
    logStdout.write(`${log}\n`);
  };
  console.error = console.log;
};
