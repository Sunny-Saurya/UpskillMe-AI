const Session = require("../models/Session");
const Question = require("../models/Question");

// ==========================================
// Create Session
// ==========================================
exports.creatSession = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      description,
      questions,
    } = req.body;

    // ======================================
    // Debug Logs
    // ======================================
    console.log("REQ BODY:", req.body);

    const userId = req.user?._id;

    // ======================================
    // Validation
    // ======================================
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    if (!role || !topicsToFocus) {
      return res.status(400).json({
        message: "Role and Topics are required",
      });
    }

    if (
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        message: "Questions are required",
      });
    }

    // ======================================
    // Create Session
    // ======================================
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: [],
    });

    // ======================================
    // Create Questions
    // ======================================
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question || "",
          answer: q.answer || "",
        });

        return question._id;
      })
    );

    // ======================================
    // Save Question IDs to Session
    // ======================================
    session.questions = questionDocs;

    await session.save();

    // ======================================
    // Populate Questions
    // ======================================
    const populatedSession = await Session.findById(
      session._id
    ).populate("questions");

    // ======================================
    // Response
    // ======================================
    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session: populatedSession,
    });
  } catch (error) {
    console.error(
      "❌ Error creating session:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ==========================================
// Get My Sessions
// ==========================================
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      sessions,
    });
  } catch (error) {
    console.error(
      "❌ Error fetching sessions:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ==========================================
// Get Session By ID
// ==========================================
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(
      req.params.id
    )
      .populate({
        path: "questions",
        options: {
          sort: {
            isPinned: -1,
            createdAt: -1,
          },
        },
      })
      .exec();

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Session fetched successfully",
      session,
    });
  } catch (error) {
    console.error(
      "❌ Error fetching session:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// ==========================================
// Delete Session
// ==========================================
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(
      req.params.id
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // ======================================
    // Authorization Check
    // ======================================
    if (
      session.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to delete this session",
      });
    }

    // ======================================
    // Delete Questions
    // ======================================
    await Question.deleteMany({
      session: session._id,
    });

    // ======================================
    // Delete Session
    // ======================================
    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error(
      "❌ Error deleting session:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};