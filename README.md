# Figma Proxy API

This project provides a simple API proxy to interact with the Google Gemini API, specifically to generate random color patterns for use in Figma or other design tools.

## Features
- Exposes an HTTP endpoint that returns an array of 4 random color hex codes.
- Handles CORS for easy integration with web frontends.
- Proxies requests to the Google Gemini API using your API key and endpoint.
- Comprehensive test suite with Jest and Babel for ES6 module support.

## Setup

### Environment Variables
Create a `.env` file in the root directory and add the following:

```
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
GOOGLE_GEMINI_API_URL=https://your-gemini-api-endpoint.com/v1/some-endpoint
```

### Dependencies
Install the required dependencies:

```bash
npm install
```

## Testing

This project includes a comprehensive test suite built with Jest and Babel for ES6 module support.

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test patterns
npm run test:unit
npm run test:integration

# Run tests manually
npm run test:run
```

### Test Coverage

The test suite provides comprehensive coverage of the API functionality:

- **API Handler Tests**: Tests the main handler function
- **Response Validation**: Verifies correct status codes and response format
- **Hex Code Validation**: Ensures exactly 4 valid hex color codes are returned
- **Error Handling**: Tests error scenarios and edge cases

### Test Structure

```
tests/
├── index.test.js          # Main API handler tests
├── setup.js               # Test environment setup
└── run-tests.js          # Manual test runner
```

### Test Configuration

- **Jest Configuration**: `jest.config.js` - Configured for ES6 modules
- **Babel Configuration**: `babel.config.js` - ES6 syntax support
- **Coverage Reports**: Generated in HTML and LCOV formats

### Running Tests

Tests are automatically run when you execute `npm test`. The test suite:

1. Mocks the `fetch` API to simulate Google Gemini API responses
2. Tests successful API responses with different hex code formats
3. Validates response structure and content
4. Ensures proper error handling

## Usage

The main API endpoint is implemented in `api/index.js`.

- **Endpoint:** `/api/proxy`
- **Method:** `POST`
- **Response:**
  ```json
  {
    "colors": "[\"#A8D5BA\", \"#F4B393\", \"#D6D2C4\", \"#3F72AF\"]"
  }
  ```

### Example Request

```bash
curl -X POST https://your-domain.com/api/proxy
```

## How it Works
- The endpoint sends a request to the Google Gemini API, asking for 4 random color hex codes.
- The response is parsed and returned as a JSON object with a `colors` field.
- CORS headers are set to allow requests from any origin (can be restricted as needed).

## Customization
- You can modify the prompt in `api/index.js` to change the type or number of colors returned.
- Adjust CORS settings in the same file if you need to restrict access.

## Development

### Adding New Tests

To add new tests, create test files in the `tests/` directory following the naming convention `*.test.js`. The test suite automatically discovers and runs all test files.

### Test Best Practices

- Use descriptive test names that explain the expected behavior
- Mock external dependencies (like the Gemini API) for reliable testing
- Test both success and error scenarios
- Maintain high test coverage for critical functionality

### Continuous Integration

The test suite is designed to run in CI/CD pipelines. Ensure all tests pass before deploying:

```bash
npm test
npm run test:coverage
```
