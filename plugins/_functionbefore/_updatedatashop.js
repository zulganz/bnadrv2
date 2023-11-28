import db from '../../lib/database.js';
import { ranNumb } from '../../lib/func.js';
import fs from 'fs';

export async function all(m, {conn}) {
    let datas = db.data.datas;
    let randomhour = ranNumb(1, 3);
    let cooldown = 1000 * 60 * randomhour; // Random Hours in millisecond

    if (new Date() * 1 - datas.lastupdategraph > cooldown) {
        let d = new Date()
        let date = d.toLocaleDateString('id', {
            minute: 'numeric',
            hour: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        this.reply(global.rowner[0] + '@s.whatsapp.net', `Update shop: ${date}`, null)
        let rannumba = ranNumb(10, 10000);
        let rannumbb = ranNumb(10, 10000);
        let rannumbc = ranNumb(10, 10000);
        datas.graphshopbanana = rannumba;
        datas.graphshopapple = rannumbb;
        datas.graphshopwatermelon = rannumbc;
        let graph = fs.writeFilesync('./datagraph.json', JSON.stringify(datas, null, '\t'))
        let caption = `*Graph Shop*\n\nBanana: ${formatRupiah(rannumba)}\nApple: ${formatRupiah(rannumbb)}\nWatermelon: ${formatRupiah(rannumbc)}`;
        this.reply(global.rowner[0] + '@s.whatsapp.net', caption, null)
        datas.lastupdategraph = new Date() * 1;
    }
    return !0
}