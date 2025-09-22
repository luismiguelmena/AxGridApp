import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174",
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // plugins if needed
      return config;
    },
  },
  video: false,
  screenshotOnRunFailure: true,
});

