"use client";

import React, { useState } from "react";
import PromptCard from "@components/PromptCard";
import ReportForm from "@components/form/ReportForm";
import { useSession } from "next-auth/react";
import { IPrompt } from "@ts/interface/prompt";
import CustomSession from "@ts/interface/customAuth";

interface IReportModal {
  isVisible: boolean;
  onClose: () => void;
  reportedPost: IPrompt;
}

const ReportModal = ({ isVisible, onClose, reportedPost }: IReportModal) => {
  const { data: session } = useSession() as unknown as CustomSession;

  const [reportMsg, setReportMsg] = useState("" as string);
  const [submitting, setSubmitting] = useState(false as boolean);

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.id === "wrapper") {
      setReportMsg("");
      onClose();
    }
  }

  const createReport = async (e: React.MouseEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/reports/create", {
        method: "POST",
        body: JSON.stringify({
          prompt_id: reportedPost._id,
          victim_id: session?.user.id,
          message: reportMsg
        }),
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
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
