import { Telegraf } from "telegraf";
import generatePost from "../services/openaiService.js";
import config from "../config/config.js";
import scheduledJob from "./scheduler.js";

const bot = new Telegraf(config.TELEGRAM_TOKEN);
console.log("Bot initialized.");

const topic =
  "Згенерувати мотивуюче ранкове повідомлення для співробітників з побажанням чудового настрою, продуктивного дня та досягнення робочих цілей українською мовою.";

bot.start((ctx) => {
  console.log("Received /start command from user.");
  ctx.reply(
    "Welcome! Use /generate <topic> to create a new post or wait for scheduled posts."
  );
});

bot.command("generate", async (ctx) => {
  console.log("Received /generate command from user.");
  const userTopic = ctx.message.text.split(" ").slice(1).join(" ") || topic;
  const post = await generatePost(userTopic);
  console.log("Generated post:", post);
  ctx.reply(`Here is your generated post on "${topic}":\n\n${post}`);
});

scheduledJob(bot, topic);

bot
  .launch()
  .then(() => console.log("Bot is running..."))
  .catch((error) => console.error("Error starting bot:", error));

process.once("SIGINT", () => {
  console.log("Received SIGINT signal. Stopping bot...");
  bot.stop("SIGINT");
});
