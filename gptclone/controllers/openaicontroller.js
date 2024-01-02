
const dotenv = require("dotenv");
dotenv.config();
//const { Configuration, OpenAIApi } = require("openai");
//const configuration =  new Configuration({
  //apiKey: process.env.OPENAI_API_KEY,
//});
//const openai = new OpenAIApi(configuration);
const openai = require('openai');

try {
  console.log('Creating configuration...');
  const configuration = openai.Configuration.create({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log('Creating OpenAI client...');
  const openaiClient = new openai.OpenAIAPI(configuration);

  console.log('OpenAI client created successfully.');
} catch (error) {
  console.error('Error during OpenAI client setup:', error);
}


exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how yoda from star war would.
      Me: 'what is your name?'
      yoda: 'yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openaiClient.createCompletion({
      model: "text-davinci-002",
      prompt: `/* convert these instruction into javascript code \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openaiClient.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};