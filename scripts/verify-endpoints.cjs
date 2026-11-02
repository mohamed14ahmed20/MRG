const http = require('http');

const endpoints = [
  '/',
  '/ar',
  '/en',
  '/ar/about',
  '/en/about',
  '/ar/chairman',
  '/en/chairman',
  '/ar/companies/suez-polyester-fibers',
  '/en/companies/suez-polyester-fibers',
  '/ar/companies/pure-plast',
  '/en/companies/pure-plast',
  '/ar/contact',
  '/en/contact',
  '/ar/magazine',
  '/en/magazine'
];

async function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          location: res.headers.location,
          contentLength: body.length,
          titleMatch: body.match(/<title>([^<]+)<\/title>/)?.[1] || 'No title'
        });
      });
    });
    req.on('error', (e) => {
      resolve({ path: urlPath, error: e.message });
    });
  });
}

async function testContactApi() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      name: 'مستثمر تجاري',
      email: 'investor@example.com',
      phone: '+201099998888',
      company: 'مجموعة النور للاستثمار',
      subject: 'طلب شراكة وتوريد شيت PET',
      message: 'نود الاستفسار عن توريد كميات تجارية من شيت PET شهرياً لمصانعنا.'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(body)
        });
      });
    });
    req.on('error', (e) => {
      resolve({ error: e.message });
    });
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('Testing all website routes...');
  for (const ep of endpoints) {
    const res = await checkUrl(ep);
    console.log(`[${res.statusCode || 'ERR'}] ${res.path} -> ${res.location ? 'Redirect: ' + res.location : res.titleMatch}`);
  }

  console.log('\nTesting Contact Form Direct SQL API (/api/contact)...');
  const apiRes = await testContactApi();
  console.log('API Response:', apiRes);
}

main();
