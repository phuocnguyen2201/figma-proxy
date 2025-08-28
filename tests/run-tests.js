#!/usr/bin/env node

/**
 * Test runner script for the figma-proxy API
 * This script provides different ways to run tests
 */

const { spawn } = require('child_process');
const path = require('path');

// Test configurations
const testConfigs = {
  unit: {
    description: 'Run unit tests only',
    command: 'npm',
    args: ['test', '--', '--testPathPattern=unit']
  },
  integration: {
    description: 'Run integration tests only',
    command: 'npm',
    args: ['test', '--', '--testPathPattern=integration']
  },
  coverage: {
    description: 'Run tests with coverage report',
    command: 'npm',
    args: ['test', '--', '--coverage']
  },
  watch: {
    description: 'Run tests in watch mode',
    command: 'npm',
    args: ['test', '--', '--watch']
  },
  all: {
    description: 'Run all tests',
    command: 'npm',
    args: ['test']
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const testType = args[0] || 'all';

if (!testConfigs[testType]) {
  console.error(`Unknown test type: ${testType}`);
  console.log('Available test types:');
  Object.keys(testConfigs).forEach(key => {
    console.log(`  ${key}: ${testConfigs[key].description}`);
  });
  process.exit(1);
}

const config = testConfigs[testType];

console.log(`Running ${testType} tests: ${config.description}`);
console.log(`Command: ${config.command} ${config.args.join(' ')}`);
console.log('---');

// Run the test command
const testProcess = spawn(config.command, config.args, {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname, '..')
});

testProcess.on('close', (code) => {
  console.log(`\n---`);
  if (code === 0) {
    console.log(`✅ Tests completed successfully!`);
  } else {
    console.log(`❌ Tests failed with exit code: ${code}`);
    process.exit(code);
  }
});

testProcess.on('error', (error) => {
  console.error(`Failed to start test process:`, error);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping tests...');
  testProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping tests...');
  testProcess.kill('SIGTERM');
});
