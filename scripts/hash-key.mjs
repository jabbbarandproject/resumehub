import { createHash } from 'node:crypto';
const keys = process.argv.slice(2);
if (!keys.length) { console.log('Usage: npm run hash-key -- KEY1 KEY2 ...'); process.exit(0); }
console.log('VITE_LICENSE_KEY_HASHES=' + keys.map((k) => createHash('sha256').update(k.trim()).digest('hex')).join(','));
