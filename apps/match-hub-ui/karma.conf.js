// Karma configuration file, see link for more information
// https://karma-runner.github.io/latest/config/configuration-file.html

const path = require('path'); // Path is needed for the coverage report directory

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      // Only standard and coverage plugins remain
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage', // Retaining for HTML coverage artifact generation
      '@angular-devkit/build-angular/plugins/karma'
    ],
    client: {
      jasmine: {
        // you can add jasmine setup options here
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated results message
    },

    // Coverage Reporter Configuration
    coverageReporter: {
      // UPDATED: Directing the coverage report to a new, clean 'reports/coverage-results' directory
      dir: path.join(__dirname, 'coverage2'),
      subdir: '.',
      reporters: [
        { type: 'html' }, // Generates the web-viewable report (index.html)
        { type: 'text-summary' }
      ]
    },

    // REPORTERS: Only progress and coverage remain.
    reporters: ['progress', 'coverage'],

    // REMOVED: All junitReporter configuration is gone.

    port: 9876,
    colors: true,
    // Retaining LOG_DEBUG to see full details during the run
    logLevel: config.LOG_DEBUG,
    autoWatch: false, // Set to false when running headless
    browsers: ['ChromeHeadless'], // Ensures the CI-friendly browser is used by default
    singleRun: true, // Crucial for CI environments
    restartOnFileChange: false
  });
};
