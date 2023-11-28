import db from '../../lib/database.js';

export async function all(m, {conn}) {
    let datas = db.data.datas;
    let cooldown = 1000 * 60 * 1; // 24 hours in millisecond

    if (new Date() * 1 - datas.lastupdategraph > cooldown) {
        let d = new Date()
        let date = d.toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        this.reply(global.rowner[0] + '@s.whatsapp.net', `Update shop: ${date}`, null)
        datas.graphshopbanana = rannumba;
        datas.graphshopapple = rannumbb;
        datas.graphshopwatermelon = rannumbc;
        let caption = `*Graph Shop*\n\nBanana: ${formatRupiah(rannumba)}\nApple: ${formatRupiah(rannumbb)}\nWatermelon: ${formatRupiah(rannumbc)}`;
        this.reply(global.rowner[0] + '@s.whatsapp.net', caption, null)
        datas.lastupdategraph = new Date() * 1;
    }
    return !0
}