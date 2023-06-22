module.exports.config = {
  name: "ai",
  version: "2.0.8",
  hasPermssion: 0,
  credits: "MSRTanim",
  description: "AI",
  commandCategory: "ai",
  usages: "cmdname [question]",
  cooldowns: 5,
  dependencies: {
        "openai": ""
    }
};
module.exports.run = async function({ api, event, args }) {

  
const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
                                apiKey: "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",
                            });
                            const openai = new OpenAIApi(configuration);
  let data = args.join(" ");
                            if (data.length < 2) {
                                api.sendMessage("⚠️ Invalid Use Of Command!\n💡 Usage: /ai <ask anything>)", event.threadID);
                            } else {
                                try {
                                    const completion = await openai.createCompletion({
                                        model: "text-davinci-002",
                                        prompt: args.join(" "),
                                        temperature: 0.5,
                                        max_tokens: 2000,
                                        top_p: 0.3,
                                        frequency_penalty: 0.5,
                                        presence_penalty: 0.0,
                                    });
                                    api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID);
                                }
                                catch (error) {
                                    if (error.response) {
                                        console.log(error.response.status);
                                        console.log(error.response.data);
                                    } else {
                                        console.log(error.message);
                                        api.sendMessage(error.message, event.threadID);
                                    }
                                }
                            }
}