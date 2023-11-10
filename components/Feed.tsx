"use client";

import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";
import ReportModal from "@components/ReportModal";
import { IPrompt } from "@ts/interface/prompt";

interface IPromptCardList {
  data: Array<IPrompt>;
  handleTagClick: (tag?: string) => void;
  handleReport: (post?: IPrompt) => void;
}

const PromptCardList = ({ data, handleTagClick, handleReport }: IPromptCardList) => {
  return (
    <div className="mt-16 prompt_layout">
      { data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleReport={handleReport}
          />
        )
      )}
    </div>
  );
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([] as Array<IPrompt>);

  // Search states
  const [searchText, setSearchText] = useState("" as string);
  const [searchTimeout, setSearchTimeout] = useState(null as any);
  const [searchedResults, setSearchedResults] = useState([] as Array<IPrompt>);

  const [showReportModal, setShowReportModal] = useState(false as boolean);
  const [reportedPost, setReportedPost] = useState({} as IPrompt);

  const fetchPosts = async (): Promise<void> => {
    const response = await fetch("/api/posts");
    const data = await response.json();

    setAllPosts(data);
  }

  useEffect((): void => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string): Array<IPrompt> => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    return allPosts.filter(
      (item) =>
        regex.test(item.createdBy.username) ||
        regex.test(item.tag_id.name) ||
        regex.test(item.text) ||
        regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout((): void => {
        const searchResult = filterPrompts(e.target.value);

        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string): void => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleReport = (post: IPrompt): void => {
    setShowReportModal(true);
    setReportedPost(post);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleReport={handleReport}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
          handleReport={handleReport}
        />
      )}

      <ReportModal
        isVisible={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportedPost={reportedPost}
      />
    </section>
  )
};

export default Feed;
