import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Change this to '/<REPO_NAME>/' to match the GitHub repository name.
const REPO_NAME = 'physicsSubPlans';

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [react()],
  test: {
    globals: true,
  },
});
