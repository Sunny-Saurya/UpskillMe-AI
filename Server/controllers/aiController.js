const axios = require("axios");

// ======================================
// Safely Extract JSON
// ======================================
const extractJSON = (rawText) => {
  try {
    // Remove markdown formatting
    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Find JSON array
    const start = cleanedText.indexOf("[");
    const end = cleanedText.lastIndexOf("]");

    if (start !== -1 && end !== -1) {
      const jsonString = cleanedText.substring(
        start,
        end + 1
      );

      return JSON.parse(jsonString);
    }

    throw new Error("Invalid JSON response");
  } catch (error) {
    console.error(
      "❌ JSON Extraction Error:",
      error
    );

    return [];
  }
};

// ======================================
// Generate Interview Questions
// ======================================
const generateInterviewQuestions = async (
  req,
  res
) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    } = req.body;

    // ==================================
    // Validation
    // ==================================
    if (!role || !topicsToFocus) {
      return res.status(400).json({
        success: false,
        message:
          "Role and Topics are required",
      });
    }

    // ==================================
    // Prompt
    // ==================================
    const prompt = `
Generate ${numberOfQuestions} interview questions with answers.

Role: ${role}
Experience: ${experience}
Topics: ${topicsToFocus}

IMPORTANT RULES:
- Return ONLY valid JSON array
- No markdown
- No explanation
- No extra text
- No code block

Format:
[
  {
    "question": "What is React?",
    "answer": "React is a JavaScript library for building user interfaces."
  }
]
`;

    // ==================================
    // OpenRouter Request
    // ==================================
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-2-9b-it:free",

        messages: [
          {
            role: "system",
            content:
              "You are a JSON generator. Always return ONLY valid JSON array.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type":
            "application/json",
        },

        timeout: 60000,
      }
    );

    // ==================================
    // Raw AI Response
    // ==================================
    const rawText =
      response?.data?.choices?.[0]?.message
        ?.content || "";

    console.log(
      "✅ RAW QUESTIONS RESPONSE:"
    );

    console.log(rawText);

    // ==================================
    // Parse JSON Safely
    // ==================================
    let questions = [];

    try {
      questions = extractJSON(rawText);
    } catch (err) {
      console.error(
        "❌ JSON Parse Failed:",
        err
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned invalid JSON",
      });
    }

    console.log(
      "✅ PARSED QUESTIONS:"
    );

    console.log(questions);

    // ==================================
    // Validation
    // ==================================
    if (
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to generate valid questions",
      });
    }

    // ==================================
    // Success Response
    // ==================================
    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("❌ FULL AI ERROR:");

    console.error(error);

    console.error("❌ RESPONSE:");

    console.error(error?.response?.data);

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate questions",
    });
  }
};

// ======================================
// Generate Concept Explanation
// ======================================
const generateConceptExplanation = async (
  req,
  res
) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = `
Explain this interview question in detail.

Question:
${question}

IMPORTANT RULES:
- Return ONLY valid JSON array
- No markdown
- No extra text

Format:
[
  {
    "title": "React State",
    "explanation": "Detailed explanation...",
    "example": "const [count, setCount] = useState(0)"
  }
]
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-2-9b-it:free",

        messages: [
          {
            role: "system",
            content:
              "You are a JSON generator. Return only valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type":
            "application/json",
        },

        timeout: 60000,
      }
    );

    const rawText =
      response?.data?.choices?.[0]?.message
        ?.content || "";

    console.log(
      "✅ RAW EXPLANATION RESPONSE:"
    );

    console.log(rawText);

    let data = [];

    try {
      data = extractJSON(rawText);
    } catch (err) {
      console.error(
        "❌ JSON Parse Failed:",
        err
      );

      return res.status(500).json({
        success: false,
        message:
          "AI returned invalid explanation JSON",
      });
    }

    if (!data || data.length === 0) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to generate explanation",
      });
    }

    return res.status(200).json({
      success: true,
      explanation: data[0],
    });
  } catch (error) {
    console.error(
      "❌ Generate Explanation Error:"
    );

    console.error(error);

    console.error(error?.response?.data);

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate explanation",
    });
  }
};

// ======================================
// Generate More Questions
// ======================================
const generateMoreQuestions = async (
  req,
  res
) => {
  return generateInterviewQuestions(req, res);
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
  generateMoreQuestions,
};