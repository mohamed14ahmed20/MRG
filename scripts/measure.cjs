const fs = require('fs');
const readline = require('readline');

async function measure() {
  const rl = readline.createInterface({ input: fs.createReadStream('u251392587_6i2oe.sql'), crlfDelay: Infinity });
  let currentTable = 'header';
  const sizes = {};

  for await (const line of rl) {
    if (line.startsWith('CREATE TABLE `')) {
      const match = line.match(/CREATE TABLE `([^`]+)`/);
      if (match) currentTable = match[1];
    }
    sizes[currentTable] = (sizes[currentTable] || 0) + line.length;
  }

  const sorted = Object.entries(sizes).sort((a,b) => b[1] - a[1]);
  for (const [table, size] of sorted) {
    console.log(table.padEnd(40), (size / 1024 / 1024).toFixed(2), 'MB');
  }
}
measure();
