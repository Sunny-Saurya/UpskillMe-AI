import React, { useEffect, useState } from "react";
import { LuPlus, LuTrash2, LuArrowRight } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import { motion, AnimatePresence } from "framer-motion";
import { LuMessageCircle } from "react-icons/lu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const sessionList = Array.isArray(response.data?.sessions)
        ? response.data.sessions
        : [];
      setSessions(sessionList);
    } catch (error) {
      console.error("Failed to fetch sessions", error?.response?.data || error);
      toast.error("Failed to fetch sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-gray-800"
          >
            Interview Sessions
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenCreateModal(true)}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <LuPlus className="text-lg" />
            New Session
          </motion.button>
        </div>

        {/* Sessions Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 h-64 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </motion.div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <LuPlus className="text-3xl text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Sessions Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Create your first interview session to get started with AI-powered practice
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenCreateModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Create First Session
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {sessions.map((data, index) => (
                <motion.div
                  key={data?._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocus || ""}
                    experience={data?.experience || ""}
                    
                    description={data?.description || ""}
                    lastUpdated={
                      data?.updatedAt
                        ? moment(data?.updatedAt).format("MMM DD, YYYY")
                        : ""
                    }
                    questions={
                      Array.isArray(data?.question) ? data.question.length : 0
                    }
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() =>
                      setOpenDeleteAlert({
                        open: true,
                        data: data,
                      })
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Floating Action Button (Mobile) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpenCreateModal(true)}
          className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-xl flex items-center justify-center z-10"
        >
          <LuPlus className="text-2xl" />
        </motion.button>
      </div>

      {/* Create Session Modal */}
      <AnimatePresence>
        {openCreateModal && (
          <Modal
            isOpen={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            hideHeader
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Create New Session</h2>
                <button 
                  onClick={() => setOpenCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <CreateSessionForm 
                onSuccess={() => {
                  setOpenCreateModal(false);
                  fetchAllSessions();
                }} 
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {openDeleteAlert.open && (
          <Modal
            isOpen={openDeleteAlert.open}
            onClose={() => setOpenDeleteAlert({ open: false, data: null })}
            hideHeader
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6"
            >
              <div className="text-center mb-2">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LuTrash2 className="text-2xl text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Delete Session?
                </h2>
                <p className="text-gray-600 mb-6">
                  This will permanently delete "{openDeleteAlert.data?.role}" session and all its data.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setOpenDeleteAlert({ open: false, data: null })}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  onClick={async () => {
                    try {
                      await axiosInstance.delete(
                        API_PATHS.SESSION.DELETE(openDeleteAlert.data._id)
                      );
                      toast.success("Session deleted successfully");
                      setOpenDeleteAlert({ open: false, data: null });
                      fetchAllSessions();
                    } catch (error) {
                      toast.error("Failed to delete session");
                    }
                  }}
                >
                  Delete
                  <LuArrowRight className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
      {/* Chatbot Floating Button */}
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

export default Dashboard;