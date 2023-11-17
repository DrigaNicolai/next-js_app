"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { AppRouterInstance } from "@node_modules/next/dist/shared/lib/app-router-context";
import { IPrompt } from "@ts/interface/prompt";
import CustomSession from "@ts/interface/customAuth";
import { IWarning } from "@ts/interface/warning";
import { IHeaders } from "@ts/interface/global";
import { getTableHeaders } from "@static/getTableHeaders";
import { IUserStatistic } from "@ts/interface/statistic";

const MyProfile = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [myPosts, setMyPosts] = useState([] as Array<IPrompt>);
  const [myWarnings, setMyWarnings] = useState([] as Array<IWarning>);
  const [warningHeaders, setWarningHeaders] = useState([] as Array<IHeaders>);
  const [myStatistics, setMyStatistics] = useState({} as IUserStatistic);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    }

    const fetchWarnings = async (): Promise<void> => {
      const response = await fetch(`/api/users/${session?.user.id}/warnings`, {
        method: "GET"
      });
      const data = await response.json();
      const parsedData = data.map((item) => (
        {
          moderator_name: item.moderator_id.username,
          warning_type_name: item.warning_type_id.name,
          comment: item.comment,
          createdAt: new Date(item.createdAt).toLocaleString()
        }
      ));

      setMyWarnings(parsedData);
    }

    const fetchHeaders = (): void => {
      const response = getTableHeaders("profileWarnings");

      setWarningHeaders(response);
    }

    const fetchStatistics = async (): Promise<void> => {
      const response = await fetch(`/api/statistics/profile/${session?.user.id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.token}`
        }
      });
      const data = await response.json();

      setMyStatistics(data);
    }

    if (session?.user.id) {
      fetchPosts();
      fetchWarnings();
      fetchHeaders();
      fetchStatistics();
    }
  }, []);

  const handleEdit = (post: IPrompt): void => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: IPrompt): Promise<void> => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/posts/${post._id.toString()}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${session?.token}`
          }
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      warnings={myWarnings}
      warningHeaders={warningHeaders}
      statistics={myStatistics}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
