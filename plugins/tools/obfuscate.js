import fs from 'fs';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { conn } from '../../lib/connection';

const handler = async (m, { args, command }) => {
    try {
        const q = m.quoted || m;
        const mime = (q.msg || q).mimetype || '';

        if (mime !== "application/js") {
            return m.reply('Cuman Boleh File .js');
        }

        // Download the media file
        const buffer = await q.download();

        // Check the file size here
        const fileSizeInBytes = buffer.length;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB > 3) {
            return m.reply('Input file size is too large. It must be below 3 MB.');
        }

        const readjs = fs.readFileSync(buffer);

        const result = await Encrypt(readjs);
        conn.sendFile(m.chat, result, 'obfus.js', 'Nih', m);

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