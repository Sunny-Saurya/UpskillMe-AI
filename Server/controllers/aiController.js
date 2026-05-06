const axios = require("axios");

// ===============================
// Extract JSON safely
// ===============================
const extractJSON = (rawText) => {
  const start = rawText.indexOf("[");
  const end = rawText.lastIndexOf("]");

  if (start !== -1 && end !== -1) {
    return JSON.parse(rawText.substring(start, end + 1));
  }

  throw new Error("Invalid JSON response");
};

// ===============================
// Generate Interview Questions
// ===============================
const generateInterviewQuestions = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    } = req.body;

    const prompt = `
Generate ${numberOfQuestions} interview questions with answers.

Role: ${role}
Experience: ${experience}
Topics: ${topicsToFocus}

Rules:
- Return ONLY valid JSON
- No markdown
- No extra explanation
- Each object must contain:
  - question
  - answer

Example:
[
  {
    "question": "What is React?",
    "answer": "React is a JavaScript library used for building user interfaces."
  },
  {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 engine."
  }
]
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawText =
      response.data.choices[0].message.content;

    console.log("QUESTIONS RESPONSE:", rawText);

    const data = extractJSON(rawText);

    res.status(200).json({
      success: true,
      questions: data,
    });
  } catch (error) {
    console.error(
      "Generate Questions Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
    });
  }
};

// ===============================
// Generate Concept Explanation
// ===============================
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
Explain this interview question in very deep detail for interview preparation.

Include:
- definition
- real-world analogy
- why it is important
- detailed explanation
- code example
- best practices
- common mistakes

Make explanation beginner-friendly but detailed.

Question:
${question}

Rules:
- Return ONLY valid JSON
- No markdown
- No extra text

Format:
[
  {
    "title": "React State",
    "explanation": "State in React is used to store dynamic data inside components...",
    "example": "Example: const [count, setCount] = useState(0)"
  }
]
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawText =
      response.data.choices[0].message.content;

    console.log("EXPLANATION RESPONSE:", rawText);

    const data = extractJSON(rawText);

    res.status(200).json(data[0]);
  } catch (error) {
    console.error(
      "Generate Explanation Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to generate explanation",
    });
  }
};

// ===============================
// Generate More Questions
// ===============================
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