import Link from "next/link";
import { IPrompt } from "@ts/interface/prompt";
import React from "react";
import { ITag } from "@ts/interface/tag";

interface IForm {
  type: string;
  post: IPrompt | any;
  tags: Array<ITag>;
  setPost: (posts: IPrompt) => void;
  submitting: boolean;
  handleSubmit: (event: any) => void;
}

const PostForm = ({ type, post, tags, setPost, submitting, handleSubmit }: IForm) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts/posts with the world, and let your
        imagination run wild with.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Post title
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Write your prompt's title here..."
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Post text
          </span>
          <textarea
            value={post.text}
            onChange={(e) => setPost({ ...post, text: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          {/*<input
            value={post.tag_id}
            onChange={(e) => setPost({ ...post, tag_id: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />*/}
          <select
            className="form_input"
            value={post.tag_id}
            defaultValue="default"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPost({ ...post, tag_id: e.target.value })}
            required
          >
            <option
              disabled
              value="default"
            >
              Choose tag
            </option>
            { tags.map((tag: ITag) => (
                <option
                  key={tag._id}
                  value={tag._id}
                >
                  {tag.name}
                </option>
              )
            )}
          </select>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            { submitting
              ? (type === "Create"
                  ? "Creating..."
                  : `${type}ing...`
              )
              : type
            }
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostForm;
