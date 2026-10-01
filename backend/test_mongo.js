// Connection string comes from backend/.env (MONGODB_URI); never hardcode it here.
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const adminDb = db.admin();
  const dbs = await adminDb.listDatabases();
  console.log("Databases:", dbs.databases.map(d => d.name));
  
  for (const d of dbs.databases) {
    if (d.name === 'admin' || d.name === 'local') continue;
    const dbInstance = mongoose.connection.useDb(d.name);
    const count = await dbInstance.collection('teammembers').countDocuments();
    console.log(`Team members in ${d.name}:`, count);
    if (count > 0) {
      const members = await dbInstance.collection('teammembers').find({}).toArray();
      console.log(`Members in ${d.name}:`, members.map(m => m.name));
    }
  }
  process.exit(0);
}
run();
