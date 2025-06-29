import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Input from "../../components/Inputs/Input";
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = React.useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        toast.success("Session created successfully!");
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      console.error("❌ Error creating session:", error?.response?.data || error.message);
      setError("Failed to create session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out the form below to create a new interview preparation session.
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          label="Role"
          placeholder="(e.g. Software Engineer, Data Scientist)"
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
          label="Experience (Years)"
          placeholder="(e.g. 1, 2, 3)"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={(e) => handleChange('topicsToFocus', e.target.value)}
          label="Topics to Focus"
          placeholder="(e.g. Data Structures, Algorithms, System Design)"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          label="Description"
          placeholder="(e.g. Brief description of your preparation goals)"
          type="text"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerLoader /> : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
