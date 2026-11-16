'use strict';

module.exports = {
  default: {
    paths: ['features'],
    require: [
      'features/support/**/*.js',
      'features/step_definitions/**/*.js',
    ],
    format: [
      'progress-bar',
      'summary',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'junit:reports/cucumber-report.xml',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    parallel: Number(process.env.CUCUMBER_PARALLEL || 1),
  },
};
