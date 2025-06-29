import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { LuCircleAlert, LuListCollapse, LuSparkles } from "react-icons/lu";

import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "./components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuMessageCircle } from "react-icons/lu";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = React.useState(null);
  const [isUpdateLoader, setIsUpdateLoader] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = React.useState(false);
  const [explanation, setExplanation] = React.useState(null);

  const fetchSessionDetailsById = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      } else {
        toast.error("Invalid session response.");
        setErrorMsg("Invalid session data.");
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      toast.error("Error fetching session details.");
      setErrorMsg("Failed to load session.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
        toast.success("Explanation generated successfully.");
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg(error.message || "Failed to generate explanation.");
      toast.error(error.message || "Failed to generate explanation.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data?.success) {
        toast.success("Question pin status updated.");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
      toast.error("Error toggling pin status.");
    }
    setOpenLearnMoreDrawer(false);
  };

  const uploadMoreQuestion = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.UPLOAD_MORE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        { sessionId, questions: generatedQuestions }
      );

      if (response.data) {
        toast.success("More questions uploaded successfully.");
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error uploading more questions:", error);
      toast.error("Failed to upload more questions.");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  React.useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    } else {
      toast.error("Session ID is missing.");
      setErrorMsg("Session ID is missing.");
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <SpinnerLoader />
        </div>
      ) : (
        <>
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || 0}
            questions={sessionData?.questions?.length || 0}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData?.updatedAt).format("MMM DD, YYYY")
                : "N/A"
            }
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                Interview Q & A
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                <LuSparkles className="text-base" />
                AI-Powered
              </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              <div className={`col-span-12 ${openLearnMoreDrawer ? "lg:col-span-8" : ""}`}>
                <AnimatePresence>
                  {sessionData?.questions?.length > 0 ? (
                    sessionData.questions.map((data, index) => (
                      <motion.div
                        key={data._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                          delay: index * 0.1,
                          damping: 15
                        }}
                        layout
                        layoutId={`question-${data._id || index}`}
                        className="mb-6"
                      >
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          isPinned={data?.isPinned}
                          onLearnMore={() => generateConceptExplanation(data.question)}
                          onTogglePin={() => toggleQuestionPinStatus(data._id)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100"
                    >
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LuSparkles className="text-2xl text-amber-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        No Questions Yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start by adding questions to this interview session
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {sessionData?.questions?.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading || isUpdateLoader}
                      onClick={uploadMoreQuestion}
                      className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300
                        ${isUpdateLoader ? 
                          "bg-gray-100 border-gray-300" : 
                          "bg-white hover:bg-gray-50 border-gray-200 shadow hover:shadow-md"}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isUpdateLoader ? (
                        <SpinnerLoader size={20} />
                      ) : (
                        <>
                          <LuListCollapse className="text-xl text-amber-600" />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            Generate More Questions
                          </span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={explanation?.title || "AI Explanation"}
          >
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-600 p-4 bg-red-50 rounded-lg mb-4"
              >
                <LuCircleAlert className="text-lg" />
                {errorMsg}
              </motion.div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </div>
            ) : explanation ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <AIResponsePreview content={explanation.explanation} />
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <LuSparkles className="text-2xl text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Explanation Generated
                </h3>
                <p className="text-gray-600">
                  Click "Learn More" on a question to see AI-generated insights
                </p>
              </div>
            )}
          </Drawer>
        </>
      )}
      <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => toast("This feature is coming soon 🚧")}
  className="fixed bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-amber-600 text-white shadow-xl flex items-center justify-center"
>
  <LuMessageCircle className="text-2xl" />
</motion.button>
    </DashboardLayout>
  );
};

export default InterviewPrep;