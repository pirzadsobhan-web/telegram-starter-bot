
const SOURCE_CHANNEL = "GT1_SIGNALS";
const DESTINATION_GROUP = "-1003430913599";

export function registerCommands(bot) {

  // دستور شروع
  bot.command("start", (ctx) => {
    return ctx.reply("ربات انتقال پیام فعال است ✅");
  });

  // دریافت پست‌های کانال
  bot.on("channel_post", async (ctx) => {
    try {
      const chat = ctx.chat;
      const post = ctx.channelPost;

      // فقط کانال موردنظر
      if (chat.username?.toLowerCase() !== SOURCE_CHANNEL.toLowerCase()) {
        return;
      }

      // بررسی متن یا کپشن
      const content = post.text || post.caption || "";

      // فقط پیام‌های دارای #
      if (!content.includes("#")) {
        return;
      }

      // انتقال پیام با حفظ محتوای اصلی
      await ctx.api.copyMessage(
        DESTINATION_GROUP,
        chat.id,
        post.message_id
      );

      console.log("Hashtag post forwarded successfully.");

    } catch (error) {
      console.error("Forward error:", error);
    }
  });

  bot.command("ping", (ctx) => ctx.reply("pong 🟢"));

}
