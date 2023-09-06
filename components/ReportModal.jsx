"use client";

import { useState } from "react";
import PromptCard from "@components/PromptCard";
import ReportForm from "@components/ReportForm";
import { useSession } from "next-auth/react";

const ReportModal = ({ isVisible, onClose, reportedPost }) => {
  const { data: session } = useSession();

  const [reportMsg, setReportMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      setReportMsg("");
      onClose();
    }
  }

  const createReport = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      console.log("Successfully submitted");
      const response = await fetch("/api/reports/new", {
        method: "POST",
        body: JSON.stringify({
          promptId: reportedPost._id,
          userId: session?.user.id,
          message: reportMsg
        })
      });

      if (response.ok) {
        console.log("Report was sent!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setReportMsg("");
      onClose();
    }
  }

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        className="bg-white p-2 rounded lg:w-[400px] md:w-[360px] w-10/12 flex flex-col justify-center items-center"
      >
        <h2 className="font-satoshi font-semibold text-gray-900 mb-2">
          Report post
        </h2>

        <PromptCard
          post={reportedPost}
          hideReportBtn={true}
        />

        <ReportForm
          message={reportMsg}
          setMessage={setReportMsg}
          submitting={submitting}
          handleSubmit={createReport}
        />
      </div>
    </div>
  );
};

export default ReportModal;
