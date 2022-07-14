import { App } from "@slack/bolt";
import dotenv from "dotenv";
dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: process.env.NODE_ENV === "production" ? false : true,
  port: 8080,
});

app.message("hello", async ({ message, say }) => {
  if (message.subtype === undefined || message.subtype === "bot_message") {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${message.user}>!`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me",
            },
            action_id: "button_click",
          },
        },
      ],
      text: `Hey there <@${message.user}>!`,
    });
  }
});

app.action("button_click", async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button!`);
});

(async () => {
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
