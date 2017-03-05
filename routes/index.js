const express = require('express');
const fs = require('fs');
const moment = require('moment');

const router = express.Router();

const root = 'public/daily_reports';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const report = req.body.daily_report;
  if (name === '' || report === '') {
    const message = 'name or daily report is empty';
    res.status(501).json({ success: 0, message });
  }
  const date = moment(req.body.date).format('YYYYMMDD');

  const date_path = root + '/' + date;

  if (!fs.existsSync(date_path)) {
    fs.mkdirSync(date_path);
  }
  fs.writeFile(date_path + '/' + name + '.txt', report, (err) => {
    if (err) {
      const message = 'failed to save';
      res.status(501).json({ success: 0, message });
      return;
    }
    res.status(200).json({ success: 1 });
  });
});

module.exports = router;
