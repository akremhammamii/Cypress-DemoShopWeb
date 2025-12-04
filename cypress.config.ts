import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
  e2e: {
    baseUrl: 'https://demowebshop.tricentis.com',
    specPattern: 'cypress/e2e/**/*.{cy.ts,feature}',
    supportFile: 'cypress/support/e2e.ts',
    async setupNodeEvents(on, config) {
      // IMPORTANT: Allure writer MUST be called BEFORE Cucumber preprocessor
      // to avoid event handler conflicts
      allureWriter(on, config)
      
      // Cucumber preprocessor (must be after Allure)
      await addCucumberPreprocessorPlugin(on, config)
      
      // Esbuild bundler for Cucumber
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )
      
      // Custom task for logging
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      return config
    },
    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0
    }
  },
  downloadsFolder: 'downloads',
  env: {
    allure: true,
    allureResultsPath: 'allure-results',
    allureReuseAfterSpec: true
  }
})
