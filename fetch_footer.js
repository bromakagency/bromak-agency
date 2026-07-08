const fs = require('fs');
const phrases = [
  'konya reklam ajansı',
  'reklam ajansı konya',
  'konya dijital ajans',
  'dijital reklam ajansı',
  'konya dijital reklam ajansı',
  'reklam ajansı',
  'web tasarım',
  'sosyal medya yönetimi',
  'seo',
  'dijital reklam yönetimi'
];
const key = '1650bb3712eb083d7527df017cc04d1a';

async function run() {
  let allData = [];
  for (let p of phrases) {
    try {
      const url = `https://api.semrush.com/?type=phrase_this&key=${key}&phrase=${encodeURIComponent(p)}&database=tr&export_columns=Ph,Nq,Kd,In,Cp,Co,Tr,Sr,Nr`;
      const res = await fetch(url);
      const text = await res.text();
      const lines = text.split('\n').filter(l => l.trim() !== '');
      if (lines.length > 1 && !lines[0].includes('ERROR')) {
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(';');
          if (parts.length >= 7) {
            allData.push({
              Keyword: parts[0],
              SearchVolume: parseInt(parts[1], 10),
              KeywordDifficulty: parseFloat(parts[2]),
              Intent: parts[3],
              CPC: parseFloat(parts[4]),
              Competition: parseFloat(parts[5]),
              Results: parseInt(parts[8], 10)
            });
          }
        }
      }
    } catch(e) { console.error(e); }
  }
  
  fs.writeFileSync('C:\\Users\\recep\\.gemini\\antigravity-ide\\brain\\95ccb4b9-e4fe-4fac-be2d-3f4737a30b03\\scratch\\semrush_footer.json', JSON.stringify(allData, null, 2));
  console.log('Done');
}
run();
