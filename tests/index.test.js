const { handler } = require('../api/index.js');

// Mock fetch globally
global.fetch = jest.fn();

describe('API Handler Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    fetch.mockClear();
  });

  describe('POST request', () => {
    it('should return 200 status and 4 random hex codes', async () => {
      const mockResponse = {
        candidates: [{
          content: {
            parts: [{
              text: '["#A8D5BA", "#F4B393", "#D6D2C4", "#3F72AF"]'
            }]
          }
        }]
      };

      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({ test: 'data' })
      };

      const result = await handler(event);

      // Test 1: Verify status code is 200
      expect(result.statusCode).toBe(200);

      // Test 2: Verify response contains 4 hex codes
      const responseBody = JSON.parse(result.body);
      expect(responseBody).toHaveProperty('colors');
      
      // Parse the colors string to extract hex codes
      const colorsString = responseBody.colors;
      const hexCodes = colorsString.match(/#[0-9A-Fa-f]{6}/g);
      
      // Verify exactly 4 hex codes are returned
      expect(hexCodes).toHaveLength(4);
      
      // Verify each hex code is valid (6 characters after #)
      hexCodes.forEach(hexCode => {
        expect(hexCode).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('should handle different hex code formats', async () => {
      const mockResponse = {
        candidates: [{
          content: {
            parts: [{
              text: '["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]'
            }]
          }
        }]
      };

      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockResponse)
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({ prompt: 'test' })
      };

      const result = await handler(event);

      // Test status code
      expect(result.statusCode).toBe(200);

      // Test hex codes
      const responseBody = JSON.parse(result.body);
      const colorsString = responseBody.colors;
      const hexCodes = colorsString.match(/#[0-9A-Fa-f]{6}/g);
      
      expect(hexCodes).toHaveLength(4);
      expect(hexCodes).toEqual(['#FF0000', '#00FF00', '#0000FF', '#FFFF00']);
    });
  });
});
