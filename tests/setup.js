// Test setup file for Jest
// This file runs before each test file

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment the lines below if you want to suppress console output during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Set test environment variables
process.env.NODE_ENV = 'test';

// Global test utilities
global.testUtils = {
  // Helper to create mock Lambda events
  createMockEvent: (httpMethod = 'POST', body = {}) => ({
    httpMethod,
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {},
    queryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {},
    resource: '',
    path: '',
    isBase64Encoded: false
  }),
  
  // Helper to create mock API Gateway responses
  createMockResponse: (statusCode = 200, body = {}, headers = {}) => ({
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      ...headers
    },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  }),
  
  // Helper to wait for async operations
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};

// Suppress unhandled promise rejections in tests
process.on('unhandledRejection', (reason, promise) => {
  console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Cleanup after all tests
afterAll(() => {
  // Clean up any remaining timers or intervals
  jest.clearAllTimers();
});
