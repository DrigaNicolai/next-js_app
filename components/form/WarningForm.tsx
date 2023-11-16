import Link from "next/link";
import { IWarning } from "@ts/interface/warning";
import React from "react";
import { IWarningType } from "@ts/interface/warningType";
import {IUser} from "@ts/interface/user";

interface IWarningForm {
  type: string;
  warning: IWarning;
  warningTypes: Array<IWarningType>;
  users: Array<IUser>;
  reportData?: string;
  setWarning: (warning: IWarning) => void;
  submitting: boolean;
  handleSubmit: (event: any) => void;
}

const WarningForm = (
  { type, warning, warningTypes, users, reportData, setWarning, submitting, handleSubmit }: IWarningForm
) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Warning</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} warning based on a user report.
      </p>
      { type === "Create" &&
        <p className="desc text-left max-w-md">
          ({reportData})
        </p>
      }

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/*<label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Moderator
          </span>
          <select
            className="form_input"
            value={warning.moderator_id}
            disabled
          >
            {users.map((user: IUser) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.username}
                </option>
              )
            )}
          </select>
        </label>*/}

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Intruder
          </span>
          <select
            className="form_input"
            value={warning.intruder_id}
            disabled
          >
            {users.map((user: IUser) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.username}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Warning type
          </span>
          <select
            className="form_input"
            value={warning.warning_type_id}
            defaultValue="default"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWarning({ ...warning, warning_type_id: e.target.value })}
            required
          >
            <option
              disabled
              value="default"
            >
              Choose warning type
            </option>
            {warningTypes.map((warningType : IWarningType) => (
                <option
                  key={warningType._id}
                  value={warningType._id}
                >
                  {warningType.name}
                </option>
              )
            )}
          </select>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Warning comment
          </span>
          <textarea
            value={warning.comment}
            onChange={(e) => setWarning({ ...warning, comment: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/warnings" className="text-gray-500 text-sm">
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
}

export default WarningForm;
