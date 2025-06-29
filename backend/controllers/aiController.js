const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

const generateInterviewQuestions = async (req, res) => {
    try{
        const{role, experience, topicsToFocus, numberOfQuestions} = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt,
        });

        let rawText = response.text;

        const cleanedText = rawText.replace(/^```json\s*/, '').replace(/```$/, '').trim();

        const data = JSON.parse(cleanedText)
        res.status(200).json(data);
    }
    catch(error){
        console.error("Error generating interview questions:", error);
        res.status(500).json({
            success: false,
            message: "Error generating interview questions",
            error: error.message
        });
    }
}

const generateConceptExplanation = async (req, res) => {
    try{

        const {question} = req.body;
        if(!question){
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }
        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });
        let rawText = response.text;
        const cleanedText = rawText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);

        

    }
    catch (error) {
        console.error("Error generating concept explanation:", error);
        res.status(500).json({
            success: false,
            message: "Error generating concept explanation",
            error: error.message
        });
    }
}

const generateMoreQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;
    const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error generating more questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate more questions",
      error: error.message,
    });
  }
};

module.exports = {
    generateConceptExplanation,
    generateInterviewQuestions,
    generateMoreQuestions
};