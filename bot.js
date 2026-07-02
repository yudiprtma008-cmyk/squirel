const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
const http = require('http');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Perintah Start
bot.start((ctx) => {
    ctx.reply('Bot Milkshake Online dan Siap Digunakan!', {
        reply_markup: {
            inline_keyboard: [[
                { text: "Buka Profil", web_app: { url: "https://google.com" } }
            ]]
        }
    });
});

// Server ringan untuk menjaga bot tetap bangun di Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server mendengarkan di port ${PORT}`);
    // Menggunakan polling agar lebih mudah di Render gratis
    bot.launch().then(() => {
        console.log("Bot berhasil terhubung ke Telegram!");
    }).catch((err) => {
        console.error("Gagal terhubung:", err);
    });
});

// Menangani error agar tidak crash
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

