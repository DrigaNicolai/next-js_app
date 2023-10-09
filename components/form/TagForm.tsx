import { ITag } from "@ts/interface/tag";
import Link from "next/link";

interface ITagForm {
  type: "Create" | "Edit";
  tag: ITag,
  setTag: (tag: ITag) => void;
  submitting: boolean;
  handleSubmit: (event: any) => void;
}

const TagForm = ({ type, tag, setTag, submitting, handleSubmit }: ITagForm) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} Tag
        </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} tags that would be as a markup while you are creating prompts
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name
          </span>
          <input
            value={tag.name}
            onChange={(e) => setTag({ ...tag, name: e.target.value })}
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={tag.description}
            onChange={(e) => setTag({ ...tag, description: e.target.value })}
            placeholder="Write description for tag"
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/tags" className="text-gray-500 text-sm">
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
  )
}

export default TagForm;
