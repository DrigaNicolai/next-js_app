"use client";

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import {AppRouterInstance} from "@node_modules/next/dist/shared/lib/app-router-context";
import {IPrompt} from "@ts/interface/prompt";
import CustomSession from "@ts/interface/customAuth";

const MyProfile = () => {
  const router = useRouter() as AppRouterInstance;
  const { data: session } = useSession() as unknown as CustomSession;

  const [myPosts, setMyPosts] = useState([] as Array<IPrompt>);

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    }

    if (session?.user.id) {
      fetchPosts();
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
        await fetch(`/api/prompts/${post._id.toString()}`, {
          method: "DELETE"
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
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
