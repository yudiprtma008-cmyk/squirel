const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
const http = require('http');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

bot.start((ctx) => {
    ctx.reply('Bot Milkshake Online! Klik di bawah:', {
        reply_markup: {
            inline_keyboard: [[
                { text: "Buka Profil", web_app: { url: "https://google.com" } }
            ]]
        }
    });
});

// PENTING: Render mewajibkan server untuk mendengarkan port
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot aktif');
});
server.listen(process.env.PORT || 8080);

bot.launch().then(() => console.log("Bot sudah jalan!"));
