import db from '../../lib/database.js';
import { ranNumb } from '../../lib/func.js';

export async function before (m, {conn}) {
    try {
    let datas = db.data.datas;
    let cooldown = 1000 * 60 * 1; // 24 hours in millisecond

    if (new Date() * 1 - datas.lastupdategraph > cooldown) {
        this.reply(global.rowner[0] + '@s.whatsapp.net', `Update shop: ${date}`, null)
        let rannumba = ranNumb(10, 10000);
        let rannumbb = ranNumb(10, 10000);
        let rannumbc = ranNumb(10, 10000);
        datas.graphshopbanana = rannumba;
        datas.graphshopapple = rannumbb;
        datas.graphshopwatermelon = rannumbc;
        let caption = `*Graph Shop*\n\nBanana: ${formatRupiah(rannumba)}\nApple: ${formatRupiah(rannumbb)}\nWatermelon: ${formatRupiah(rannumbc)}`;
        this.reply(global.rowner[0] + '@s.whatsapp.net', caption, null)
    }
} catch (e) {
    console.log(e)
}
}