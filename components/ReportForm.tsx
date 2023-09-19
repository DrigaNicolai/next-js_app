const ReportForm = ({ message, setMessage, submitting, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your comment
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your comment here..."
          required
          className="form_textarea"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
      >
        { submitting
          ? "Submitting..."
          : "Submit"
        }
      </button>
    </form>
  )
};

export default ReportForm;
