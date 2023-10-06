import { IWarningType } from "@ts/interface/warningType";
import Link from "next/link";

interface IWarningTypeForm {
  type: "Create" | "Edit";
  warningType: IWarningType;
  setWarningType: (warningType: IWarningType) => void;
  submitting: boolean;
  handleSubmit: (event: any) => void;
}

const WarningTypeForm = ({ type, warningType, setWarningType, submitting, handleSubmit }: IWarningTypeForm) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Name
        </span>
        <input
          value={warningType.name}
          className="form_input"
        />
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Points number
        </span>
        <input
          value={warningType.points_number}
          className="form_input"
          type="number"
          min="1"
          max="16"
        />
      </label>

      <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/warning-types" className="text-gray-500 text-sm">
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
  )
}
