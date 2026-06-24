/**
 * ChatGroup Backend - Entry Point
 *
 * This file is a lightweight shim used when the service is run from the
 * repository root. It delegates to the compiled TypeScript output in
 * backend/dist/index.js, which is produced by `npm run build`.
 *
 * Environment variables:
 *   PORT        - HTTP port to listen on (default: 5000)
 *   MONGODB_URI - MongoDB connection string
 */

'use strict';

const path = require('path');
const distEntry = path.join(__dirname, '..', 'backend', 'dist', 'index.js');

try {
  require(distEntry);
} catch (err) {
  console.error('[chatgroup-backend] Failed to load compiled backend:', err.message);
  console.error('Make sure `npm run build` has been executed before starting the server.');
  process.exit(1);
}
