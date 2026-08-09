const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function extractFrames(videoName, outDir) {
  const outPath = path.join(__dirname, 'public', outDir);
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true });
  }
  
  const videoPath = path.join(__dirname, 'public', videoName);
  console.log(`Extracting ${videoName}...`);
  try {
    // Extract at 15fps, 720p height, JPEG quality 4 (lower is better, 2-5 is good)
    execSync(`"${ffmpeg}" -i "${videoPath}" -vf scale=-1:720 -r 15 -qscale:v 4 "${outPath}/frame_%04d.jpg"`, { stdio: 'inherit' });
    console.log(`Extracted ${videoName} successfully.`);
  } catch (err) {
    console.error(`Failed to extract ${videoName}:`, err.message);
  }
}

extractFrames('naruto.mp4', 'naruto_frames');
extractFrames('sasuke.mp4', 'sasuke_frames');
