const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../all_thirukkural_information.json');
const outputFile = path.join(__dirname, '../src/data/kurals.json');

const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

const kurals = [];

for (let i = 1; i <= 1330; i++) {
  const kuralInfo = rawData[String(i)];
  if (!kuralInfo) continue;

  // Assuming 10 seconds per audio clip for now since we don't have true timings yet.
  const audio_start = (i - 1) * 7;
  const audio_end = i * 7;

  // Combining the two lines of the Kural text as expected by the frontend
  const tamil_text = `${kuralInfo['1_line1']}\n${kuralInfo['1_line2']}`;
  
  // Building the object based on current `Kural` interface + extending it
  const mapped = {
    kural_number: kuralInfo['0_number'],
    tamil_text: tamil_text,
    english_translation: kuralInfo['1_translation'],
    tamil_explanation: kuralInfo['5_mv'] || (kuralInfo['6_mu_varatha'] ? kuralInfo['6_mu_varatha'][1].trim() : ""),
    section: kuralInfo['4_iyal'],
    chapter: kuralInfo['2_adikaram'],
    audio_start: audio_start,
    audio_end: audio_end,
    
    // Extended properties for a richer experience
    transliteration: `${kuralInfo['1_transliteration1']}\n${kuralInfo['1_transliteration2']}`,
    english_couplet: kuralInfo['1_couplet'],
    english_explanation: kuralInfo['5_explanation'],
    chapter_translation: kuralInfo['2_translation'],
    section_translation: kuralInfo['4_translation'],
    
    // Additional commentaries
    commentary_sp: kuralInfo['5_sp'] || "",
    commentary_mk: kuralInfo['5_mk'] || "",
  };

  kurals.push(mapped);
}

fs.writeFileSync(outputFile, JSON.stringify(kurals, null, 2), 'utf-8');
console.log(`Successfully transformed ${kurals.length} kurals and saved to ${outputFile}`);
