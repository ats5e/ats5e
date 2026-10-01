const fs = require('fs');
const path = require('path');
// Credentials come from backend/.env (ADMIN_EMAIL, ADMIN_PASSWORD); nothing is hardcoded here.
require('./backend/node_modules/dotenv').config({ path: path.join(__dirname, 'backend', '.env') });
const seed = require('./backend/seed');

const API_BASE = process.env.SYNC_API_BASE || 'https://ats5e.com/api/api';
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

async function sync() {
  if (!EMAIL || !PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env before running this script.');
    process.exit(1);
  }
  // DESTRUCTIVE: every record in each live collection is deleted, then the seed data is re-posted.
  // Anything created or edited in the admin panel is lost.
  if (!process.argv.includes('--yes')) {
    console.error('This DELETES all live CMS content (including admin-panel edits) and replaces it with seed data.');
    console.error('Re-run with --yes only if that is what you intend.');
    process.exit(1);
  }
  console.log('Logging in...');
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  
  if (!loginRes.ok) {
    console.error('Login failed:', await loginRes.text());
    process.exit(1);
  }
  
  const { token } = await loginRes.json();
  console.log('Login successful.');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const collections = [
    { name: 'solutions', data: seed.SOLUTIONS },
    { name: 'case-studies', data: seed.CASE_STUDIES },
    { name: 'partners', data: seed.PARTNERS },
    { name: 'insights', data: seed.INSIGHTS },
    { name: 'team-members', data: seed.TEAM_MEMBERS }
  ];

  for (const { name, data } of collections) {
    console.log(`\nSyncing ${name}...`);
    
    // 1. Fetch current live data
    const res = await fetch(`${API_BASE}/crud/${name}`);
    const liveData = await res.json();
    
    // 2. Delete all current live data
    for (const item of liveData) {
      console.log(`Deleting ${item._id} from ${name}`);
      await fetch(`${API_BASE}/crud/${name}/${item._id}`, {
        method: 'DELETE',
        headers
      });
    }

    // 3. Post all new seed data
    for (const item of data) {
      console.log(`Posting ${item.title || item.name} to ${name}`);
      await fetch(`${API_BASE}/crud/${name}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item)
      });
    }
  }

  // Handle Home Page separately (only 1 record usually)
  console.log('\nSyncing home-page...');
  const hpRes = await fetch(`${API_BASE}/crud/home-page`);
  const liveHp = await hpRes.json();
  for (const item of liveHp) {
    await fetch(`${API_BASE}/crud/home-page/${item._id}`, {
      method: 'DELETE',
      headers
    });
  }
  await fetch(`${API_BASE}/crud/home-page`, {
    method: 'POST',
    headers,
    body: JSON.stringify({}) // Default empty config
  });

  console.log('\nSync complete!');
}

sync().catch(console.error);
