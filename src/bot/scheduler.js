import schedule from "node-schedule";
import config from "../config/config.js";
import generatePost from "../services/openaiService.js";

export function scheduledJob(bot, topic) {
  schedule.scheduleJob("0 9 * * 1-5", async () => {
    console.log("Executing scheduled post...");

    const post = await generatePost(topic);
    const chatId = config.TELEGRAM_CHAT_ID;

    try {
      console.log(`Publishing post to chat ${chatId}...`);
      await bot.telegram.sendMessage(chatId, post);
      console.log("Post successfully published.");
    } catch (error) {
      console.error(
        "Error publishing post:",
        error.response ? error.response.data : error.message
      );
    }
  });
}
export default scheduledJob;
