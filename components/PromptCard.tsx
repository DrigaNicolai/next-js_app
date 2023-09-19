"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Session, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IPrompt } from "@ts/interface/prompt";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";

interface IPromptCard {
  post: IPrompt;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleReport?: (post: IPrompt) => void;
  hideReportBtn?: boolean;
}

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleReport, hideReportBtn = false }: IPromptCard) => {
  const { data: session } = useSession() as unknown as Session;
  const pathName: string = usePathname();
  const router: AppRouterInstance = useRouter();

  const [copied, setCopied] = useState("" as string);
  const [isReportBtn, setIsReportBtn] = useState(false as boolean);

  useEffect((): void => {
    setReportBtnRender()
  }, []);

  const setReportBtnRender = (): void => {
    // TODO: return this code
    /*const sessionUser = session?.user.id;
    const postCreator = post.creator._id;

    if (sessionUser) {
      const checkConditions = !hideReportBtn && sessionUser !== postCreator;

      setIsReportBtn(checkConditions);
    }*/

    setIsReportBtn(true);
  }

  const handleProfileClick = () => {
    if (post.createdBy._id === session?.user.id)  {
      return router.push("/profile");
    }

    router.push(`/profile/${post.createdBy._id}?name=${post.createdBy.username}`);
  }

  const handleCopy = () => {
    setCopied(post.text);

    navigator.clipboard.writeText(post.text);

    setTimeout(() => setCopied(""), 3000);
  }


  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.createdBy.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.createdBy.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.createdBy.email}
            </p>
          </div>
        </div>
        {isReportBtn ?
          (
            <>
              <div className="card_btn" onClick={() => handleReport(post)}>
                <Image
                  src={"/assets/icons/report.svg"}
                  alt={"report_icon"}
                  width={12}
                  height={12}
                  title={"Report"}
                />
              </div>
            </>
          ) : (
          <></>
        )}
        <div className="card_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.text
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.text ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            title={"Copy"}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.text}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag_id.name)}
      >
        #{post.tag_id.name}
      </p>

      {session?.user.id === post.createdBy._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
