// npm install cron
var CronJob = require('cron').CronJob;
var queryFromDBandUpload = require('controllers/accrualFileController').queryFromDBandUpload;
var job = new CronJob(
    '0 0 0 * * *',
    queryFromDBandUpload,
);
// job.start() - See note below when to use this