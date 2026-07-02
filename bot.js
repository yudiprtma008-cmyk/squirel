const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
const http = require('http');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

bot.start((ctx) => {
    ctx.reply('Bot Milkshake Online dan Siap Digunakan!', {
        reply_markup: {
            inline_keyboard: [[
                { text: "Buka Profil", web_app: { url: "https://google.com" } }
            ]]
        }
    });
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server aktif di port " + PORT);
    bot.launch().then(() => console.log("Bot berhasil terhubung!"));
});
