const fs = require('fs');
const path = require('path');
const data = require('./seed.js');

const exportDir = './database_export';

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}

const collections = [
  { name: 'solutions', content: data.SOLUTIONS },
  { name: 'case_studies', content: data.CASE_STUDIES },
  { name: 'partners', content: data.PARTNERS },
  { name: 'insights', content: data.INSIGHTS },
  { name: 'team_members', content: data.TEAM_MEMBERS }
];

console.log('Generating JSON data exports from seed source...');

for (const col of collections) {
  console.log(`Writing ${col.name}.json...`);
  fs.writeFileSync(
    path.join(exportDir, `${col.name}.json`),
    JSON.stringify(col.content, null, 2)
  );
}

console.log('Export generation completed successfully!');
