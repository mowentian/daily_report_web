/**
 * Created by mowentian on 2017/3/5.
 */

const express = require('express');
const fs = require('fs');
const moment = require('moment');

const router = express.Router();
const root = 'public/daily_reports';

const one_report = (name, report) => {
  return {
    name, report
  }
};

/* GET home page. */
router.get('/', (req, res, next) => {
  const reports = [];
  const today = moment().format('YYYYMMDD');
  const date_path = root + '/' + today;

  if (!fs.existsSync(date_path)) {
    res.render('summary', { reports: reports });
  }
 else {
    fs.readdir(date_path, (err, files) => {
      if (err) {
        const message = 'failed to read dir: ' + date_path;
        console.error(message);
        res.render('summary', { date: today, reports: reports });
      } else {
        console.log(files);
        for (let file of files) {
          console.log('read file: ' + file + ' to get report');
          const report = fs.readFileSync(date_path + '/' + file).toString();
          reports.push(one_report(file.split('.')[0], report));
        }
        console.log(reports);
        res.render('summary', { date: today, reports: reports });
      }
    });
  }
});

module.exports = router;
