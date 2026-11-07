
const SOURCE_CHANNEL = "GT1_SIGNALS";
const DESTINATION_GROUP = -1003430913599;

export function registerCommands(bot) {

  // دستور شروع
  bot.command("start", async (ctx) => {
    await ctx.reply("ربات انتقال پیام فعال است ✅");
  });

  // بررسی ارتباط ربات
  bot.command("ping", async (ctx) => {
    await ctx.reply("ربات فعال است 🟢");
  });

  // دریافت پست‌های کانال
  bot.on("channel_post", async (ctx) => {

    try {

      const chat = ctx.chat;
      const post = ctx.channelPost;

      // گزارش دریافت پست
      console.log(
        "[CHANNEL] New post received:",
        chat.id,
        post.message_id
      );

      // بررسی کانال مبدأ
      if (
        chat.username?.toLowerCase() !==
        SOURCE_CHANNEL.toLowerCase()
      ) {
        console.log("[SKIP] Different channel");
        return;
      }

      // دریافت متن یا کپشن
      const content = post.text || post.caption || "";

      console.log("[CONTENT]", content);

      // بررسی وجود هشتگ
      if (!content.includes("#")) {
        console.log("[SKIP] No hashtag found");
        return;
      }

      // ارسال نسخه کپی پیام به گروه
      await ctx.api.copyMessage(
        DESTINATION_GROUP,
        chat.id,
        post.message_id
      );

      console.log(
        "[SUCCESS] Message copied to destination group"
      );

    } catch (error) {

      console.error(
        "[FORWARD ERROR]",
        error.description || error.message || error
      );

    }

  });

}
