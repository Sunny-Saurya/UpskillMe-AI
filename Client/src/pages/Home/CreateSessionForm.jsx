import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = React.useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  // ==========================================
  // Handle Input Change
  // ==========================================
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==========================================
  // Handle Create Session
  // ==========================================
  const handleCreateSession = async (e) => {
    e.preventDefault();

    const {
      role,
      experience,
      topicsToFocus,
      description,
    } = formData;

    // ==========================================
    // Validation
    // ==========================================
    if (!role || !topicsToFocus) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // ==========================================
      // STEP 1: Generate AI Questions
      // ==========================================
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      console.log(
        "✅ FULL AI RESPONSE:",
        aiResponse.data
      );

      let generatedQuestions = [];

      // ==========================================
      // CASE 1: Direct Array
      // ==========================================
      if (Array.isArray(aiResponse.data)) {
        generatedQuestions = aiResponse.data;
      }

      // ==========================================
      // CASE 2: questions array inside object
      // ==========================================
      else if (
        Array.isArray(aiResponse.data.questions)
      ) {
        generatedQuestions =
          aiResponse.data.questions;
      }

      // ==========================================
      // CASE 3: Stringified JSON
      // ==========================================
      else if (
        typeof aiResponse.data.questions ===
        "string"
      ) {
        try {
          generatedQuestions = JSON.parse(
            aiResponse.data.questions
          );
        } catch (err) {
          console.error(
            "❌ JSON Parse Error:",
            err
          );
        }
      }

      console.log(
        "✅ GENERATED QUESTIONS:",
        generatedQuestions
      );

      // ==========================================
      // Validation
      // ==========================================
      if (
        !generatedQuestions ||
        generatedQuestions.length === 0
      ) {
        toast.error(
          "Questions generation failed"
        );

        setIsLoading(false);
        return;
      }

      // ==========================================
      // STEP 2: Create Session
      // ==========================================
      const sessionPayload = {
        role,
        experience,
        topicsToFocus,
        description,
        questions: generatedQuestions,
      };

      console.log(
        "🚀 SESSION PAYLOAD:",
        sessionPayload
      );

      const response = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        sessionPayload
      );

      console.log(
        "✅ SESSION RESPONSE:",
        response.data
      );

      // ==========================================
      // Success
      // ==========================================
      if (response?.data?.session?._id) {
        toast.success(
          "Session created successfully!"
        );

        navigate(
          `/interview-prep/${response.data.session._id}`
        );
      } else {
        toast.error(
          "Session created but session ID missing."
        );
      }
    } catch (error) {
      console.error(
        "❌ CREATE SESSION ERROR:",
        error
      );

      console.error(
        "❌ ERROR RESPONSE:",
        error?.response?.data
      );

      setError(
        error?.response?.data?.message ||
          "Failed to create session"
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
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
        Fill out the form below to create a
        new interview preparation session.
      </p>

      <form
        onSubmit={handleCreateSession}
        className="flex flex-col gap-3"
      >
        {/* ================================= */}
        {/* Role */}
        {/* ================================= */}
        <Input
          value={formData.role}
          onChange={(e) =>
            handleChange(
              "role",
              e.target.value
            )
          }
          label="Role"
          placeholder="(e.g. Software Engineer, Data Scientist)"
          type="text"
        />

        {/* ================================= */}
        {/* Experience */}
        {/* ================================= */}
        <Input
          value={formData.experience}
          onChange={(e) =>
            handleChange(
              "experience",
              e.target.value
            )
          }
          label="Experience (Years)"
          placeholder="(e.g. 1, 2, 3)"
          type="number"
        />

        {/* ================================= */}
        {/* Topics */}
        {/* ================================= */}
        <Input
          value={formData.topicsToFocus}
          onChange={(e) =>
            handleChange(
              "topicsToFocus",
              e.target.value
            )
          }
          label="Topics to Focus"
          placeholder="(e.g. DSA, React, System Design)"
          type="text"
        />

        {/* ================================= */}
        {/* Description */}
        {/* ================================= */}
        <Input
          value={formData.description}
          onChange={(e) =>
            handleChange(
              "description",
              e.target.value
            )
          }
          label="Description"
          placeholder="(e.g. Frontend Interview Preparation)"
          type="text"
        />

        {/* ================================= */}
        {/* Error */}
        {/* ================================= */}
        {error && (
          <p className="text-red-500 text-xs">
            {error}
          </p>
        )}

        {/* ================================= */}
        {/* Submit Button */}
        {/* ================================= */}
        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;