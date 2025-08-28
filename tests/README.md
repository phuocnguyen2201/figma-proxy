# Testing Guide for Figma Proxy API

This directory contains comprehensive tests for the Figma Proxy API using Jest and Supertest.

## Test Structure

```
tests/
├── README.md           # This file
├── index.test.js       # Main test file for the API
├── setup.js            # Test environment setup
└── run-tests.js        # Test runner script
```

## Prerequisites

Install the required dependencies:

```bash
npm install
```

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

### Using the Test Runner Script

```bash
# Run all tests
node tests/run-tests.js

# Run specific test types
node tests/run-tests.js unit
node tests/run-tests.js integration
node tests/run-tests.js coverage
node tests/run-tests.js watch
```

## Test Coverage

The tests cover:

- **CORS Handling**: OPTIONS requests and proper headers
- **API Endpoints**: POST requests with various payloads
- **Error Handling**: API failures and malformed responses
- **Edge Cases**: Missing environment variables, different HTTP methods
- **Integration**: Complete request flow testing

## Test Configuration

### Jest Configuration (`jest.config.js`)

- Test environment: Node.js
- Coverage collection enabled
- Test timeout: 10 seconds
- Clear mocks between tests

### Test Setup (`tests/setup.js`)

- Global test utilities
- Mock console methods
- Environment variable setup
- Global test helpers

## Test Utilities

The test setup provides several utility functions:

```javascript
// Create mock Lambda events
const event = testUtils.createMockEvent('POST', { test: 'data' });

// Create mock API responses
const response = testUtils.createMockResponse(200, { success: true });

// Wait for async operations
await testUtils.wait(100);
```

## Mocking

### Fetch API Mocking

The tests mock the global `fetch` function to avoid external API calls:

```javascript
// Mock successful response
fetch.mockResolvedValueOnce({
  json: jest.fn().mockResolvedValue(mockResponse)
});

// Mock error response
fetch.mockRejectedValueOnce(new Error('API Error'));
```

### Environment Variables

Test environment variables are set in the test setup:

```javascript
process.env.GOOGLE_GEMINI_API_KEY = 'test-api-key';
process.env.GOOGLE_GEMINI_API_URL = 'https://test-api-url.com';
```

## Continuous Integration

The GitHub Actions workflow (`aws-prod.yaml`) includes:

1. **Test Job**: Runs all tests before deployment
2. **Deploy Job**: Deploys to AWS Lambda (only if tests pass)
3. **Post-Deployment Testing**: Tests the deployed API
4. **Health Checks**: Verifies function state and configuration

## Adding New Tests

### Unit Tests

```javascript
describe('New Feature', () => {
  it('should handle new functionality', async () => {
    // Test implementation
    const result = await handler(mockEvent);
    expect(result.statusCode).toBe(200);
  });
});
```

### Integration Tests

```javascript
describe('Integration Tests', () => {
  it('should work end-to-end', async () => {
    // Test complete flow
    const result = await handler(completeEvent);
    expect(result).toMatchObject(expectedResponse);
  });
});
```

## Best Practices

1. **Clear Test Names**: Use descriptive test names that explain the expected behavior
2. **Mock External Dependencies**: Avoid real API calls in tests
3. **Test Edge Cases**: Include tests for error conditions and boundary values
4. **Clean Setup**: Use `beforeEach` to reset mocks and state
5. **Meaningful Assertions**: Test both positive and negative scenarios

## Troubleshooting

### Common Issues

1. **Tests Failing**: Check that all dependencies are installed
2. **Mock Issues**: Ensure mocks are properly reset between tests
3. **Environment Variables**: Verify test environment setup
4. **Async Tests**: Use proper async/await patterns

### Debug Mode

Run tests with verbose output:

```bash
npm test -- --verbose
```

### Coverage Issues

If coverage reports are incomplete:

```bash
npm run test:coverage -- --collectCoverageFrom="api/**/*.js"
```

## Contributing

When adding new features:

1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain good test coverage
4. Update this documentation if needed
