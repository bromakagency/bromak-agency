const https = require('https');

const domains = [
  'konyaseouzmani.com',
  'konyaseo.com.tr',
  'binnurkorkmaz.com',
  'stagedijital.com',
  'postajans.com.tr',
  'vedatolmez.com'
];

async function fetchBacklinks(domain) {
  return new Promise((resolve) => {
    const url = `https://api.semrush.com/analytics/v1/?type=backlinks_refdomains&key=1650bb3712eb083d7527df017cc04d1a&target=${domain}&target_type=root_domain&export_columns=domain_ascore,domain,backlinks_num&display_limit=5`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ domain, data }));
    }).on('error', () => resolve({ domain, data: 'error' }));
  });
}

async function main() {
  for (const d of domains) {
    const res = await fetchBacklinks(d);
    console.log(`\n--- ${res.domain} ---`);
    console.log(res.data);
  }
}

main();
