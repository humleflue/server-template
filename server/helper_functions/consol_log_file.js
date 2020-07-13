/* eslint no-console: 0 */

const fs   = require(`fs`);
const path = require(`path`);

const Time = require(`./Time`);

// Modifies the console, such that it logs into the server/logs dir
module.exports = () => {
  const logDir = path.join(__dirname, `..`, `logs`);
  const logStdout = process.stdout;
  const logFile = (log) => {
    const time = new Time();
    fs.appendFile(path.join(logDir, `${time.dashUSDate}.log`), log, (error) => {
      if (error) {
        throw error;
      }
    });
  };

  console.log = (log) => {
    const time = new Time();
    const logWithTimeStamp = `${time.slashDate} ${time.colonTime} - ${log}\n`;
    logFile(logWithTimeStamp);
    logStdout.write(logWithTimeStamp);
  };
  console.error = console.log;
};
