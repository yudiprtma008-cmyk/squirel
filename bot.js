const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

// Mengambil data dari variabel lingkungan (Railway)
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

bot.start((ctx) => {
    ctx.reply('Halo! Klik tombol di bawah untuk membuka profil saya:', {
        reply_markup: {
            inline_keyboard: [[
                { text: "Buka Profil", web_app: { url: "URL_WEBSITE_ANDA_DISINI" } }
            ]]
        }
    });
});

bot.launch();
console.log("Bot sudah berjalan...");
