const Question = require("../models/Question");
const Session = require("../models/Session");

exports.addQuestionsToSession = async (req, res) => {
    try {

        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data"
            });
        }
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        const createQuestions = await Question.insertMany(
            questions.map(q => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        session.questions.push(...createQuestions.map(q => q._id));
        await session.save();
        res.status(201).json({
            success: true,
            message: "Questions added to session successfully",
            questions: createQuestions
        });



    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding questions to session",
            error: error.message
        });
    }
}


exports.togglePinQuestion = async (req, res) => {
    // Your logic here
try{
    const question = await Question.findById(req.params.id);
    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({
        success: true,
        message: "Question pin status toggled successfully",
        question
    });
}
catch(error){
    res.status(500).json({
        success: false,
        message: "Error toggling pin status",
        error: error.message
    });
}
};

exports.updateQuestionNote = async (req, res) => {
    

    try{
        const { note } = req.body;
        if (!note) {
            return res.status(400).json({
                success: false,
                message: "Note cannot be empty"
            });
        }

        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        question.note = note;
        await question.save();
        
        res.status(200).json({
            success: true,
            message: "Question note updated successfully",
            question
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error updating question note",
            error: error.message
        });
    }   
};
