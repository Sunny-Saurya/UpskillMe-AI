const Session = require('../models/Session');

const Question = require('../models/Question');


exports.creatSession = async (req, res) => {
    try{
        const{role, experience, topicsToFocus, description, questions} = req.body;

        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async(q) =>{
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();
        res.status(201).json({
            message: 'Session created successfully',
            session
        });

    }catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.getMySessions = async (req, res) => {
    try{
        const sessions = await Session.find({ user: req.user._id })
        .sort({ createdAt: -1  })
        .populate("questions")
        res.status(200).json({
            message: 'Sessions fetched successfully',
            sessions
        });

    }catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



exports.getSessionById = async (req, res) => {
    try{
        const session = await Session.findById(req.params.id)
        .populate({
            path: 'questions',
            options: { sort: { isPinned: -1, createdAt: -1 }}
        })
        .exec();

        if(!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({
            message: 'Session fetched successfully',
            session
        });

    }catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deleteSession = async (req, res) => {
    try{
        const session = await Session.findById(req.params.id);  

        if(!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        if(session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this session' });
        }
        await Question.deleteMany({ session: session._id });
        await session.deleteOne();
        res.status(200).json({
            message: 'Session deleted successfully'
        });
    }catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
};