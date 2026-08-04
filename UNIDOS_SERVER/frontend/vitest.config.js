import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'

export default defineConfig({

   plugins:[react()],
   test: {
    projects: [
      {
        extends: true,
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            'tests/*.{test,spec}.js',
          ],
          name: 'unit',
          environment: 'node',
        },
      },
      {
        extends: true, 
        test: {
          // an example of file based convention,
          // you don't have to follow it
          include: [
            'tests/*.{test,spec}.jsx',
          ],
          name: 'browser',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
            ],
          },
        },
      },
    ],
  },
})