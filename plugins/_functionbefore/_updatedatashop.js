import db from '../../lib/database.js';
import { ranNumb } from '../../lib/func.js';
import fs from 'fs';

export async function all(m, {conn}) {
    let datas = db.data.datas;
    let cooldown = 1000 * 60 * 5; // if release it will be 24 Hours in millisecond

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
        let rannumba = ranNumb(100, 300);
        let rannumbb = ranNumb(100, 500);
        let rannumbc = ranNumb(100, 400);
        let rannumbd = ranNumb(100, 300);
        let rannumbe = ranNumb(100, 400);
        datas.graphshopmangga = rannumba;
        datas.graphshopanggur = rannumbb;
        datas.graphshopjeruk = rannumbc;
        datas.graphshoppisang = rannumbd;
        datas.graphshopapel = rannumbe;
        //let graph = fs.writeFilesync('./datagraph.json', JSON.stringify(datas, null, '\t'))
        let caption = `*Graph Shop*\n\nMangga: ${rannumba}\nAnggur: ${rannumbb}\nJeruk: ${rannumbc}\nPisang: ${rannumbd}\nApel: ${rannumbe}`;
        this.reply(global.rowner[0] + '@s.whatsapp.net', caption, null)
        datas.lastupdategraph = new Date() * 1;
    }
    return !0
}