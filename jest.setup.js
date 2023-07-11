// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import {
  configure
} from '@testing-library/react'

configure({
  testIdAttribute: 'id',
  showOriginalStackTrace: true,
  asyncUtilTimeout: 3000
}) // if you have a different test attribute for elements on dom

// Observer for the userEvent
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))