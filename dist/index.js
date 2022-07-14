"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bolt_1 = require("@slack/bolt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new bolt_1.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: process.env.NODE_ENV === "production" ? false : true,
    port: 8080,
});
app.message("hello", ({ message, say }) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.subtype === undefined || message.subtype === "bot_message") {
        yield say({
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
}));
app.action("button_click", ({ body, ack, say }) => __awaiter(void 0, void 0, void 0, function* () {
    yield ack();
    yield say(`<@${body.user.id}> clicked the button!`);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.start();
    console.log("⚡️ Bolt app is running!");
}))();
//# sourceMappingURL=index.js.map