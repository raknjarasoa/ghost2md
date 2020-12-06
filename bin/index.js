#!/usr/bin/env node

require('dotenv').config();
const fetchContent = require('../dist').fetchContent;

const apiUrl = process.env.GHOST_API_URL;
const contentApiKey = process.env.GHOST_CONTENT_API_KEY;

(async () => await fetchContent({ apiUrl, contentApiKey }))();
