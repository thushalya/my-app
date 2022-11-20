const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6pngmu',
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    baseUrl: "http://localhost:3000",
  },
  
});
