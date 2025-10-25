import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4300',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results', // Location to save the JSON reports
      overwrite: false, // Do not overwrite existing reports (we will merge them)
      html: false, // Do not generate HTML yet (we will use mochawesome-merge)
      json: true, // Generate JSON files
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
