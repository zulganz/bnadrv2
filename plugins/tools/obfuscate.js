import fs from 'fs';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { ranNumb } from '../../lib/func.js';

const handler = async (m, { args, command, conn }) => {
    try {
        const q = m.quoted || m;

        // Download the media file
        const buffer = await q.download();

        // Check the file size here
        const fileSizeInBytes = buffer.length;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB > 3) {
            return m.reply('Input file size is too large. It must be below 3 MB.');
        }

        const readjs = buffer.toString('utf8')

        const result = await Encrypt(readjs);
        //make a path to save the file to tmp
        let ran = ranNumb(1, 999999999999999)
        const output = fs.writeFileSync(`../../tmp/${ran}.js`, result);
        
        conn.sendFile(m.chat, output, `obfuscate.js`, m)
    } catch (err) {
        console.error(`Terjadi kesalahan: ${err.message}`);
        return m.reply(`Terjadi kesalahan saat mengobfuskasi file: ${err.message}`);
    }
};

handler.command = /^(obfus)$/i;

export default handler;


async function Encrypt(query) {
  const obfuscationResult = JavaScriptObfuscator.obfuscate(query, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1,
      sourceMap: false,
      sourceMapMode: "separate",
  })

  return obfuscationResult.getObfuscatedCode()
}