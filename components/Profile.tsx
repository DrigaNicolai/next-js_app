import PromptCard from "@components/PromptCard";
import { IPrompt } from "@ts/interface/prompt";
import { IWarning } from "@ts/interface/warning";
import DataTable from "@components/DataTable";
import { IHeaders } from "@ts/interface/global";
import { IUserStatistic } from "@ts/interface/statistic";

interface IProfile {
  name: string;
  desc: string;
  data: Array<IPrompt>;
  warnings?: Array<IWarning>;
  warningHeaders?: Array<IHeaders>;
  statistics?: IUserStatistic;
  handleEdit?: (prompt?: IPrompt) => void;
  handleDelete?: (prompt?: IPrompt) => void;
}

const Profile = ({ name, desc, data, warnings, warningHeaders, statistics, handleEdit, handleDelete }: IProfile) => {
  return (
    <section className="w-full">
      <h1 className='head_text text-left'>
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        { data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          )
        )}
      </div>

      {warnings || statistics ? (
        <div>
          <h2 className="text-2xl font-bold leading-none tracking-tight text-gray-800 md:text-3xl lg:text-4xl">
            My warnings
          </h2>
          {!warnings.length ? (
            <p className="mt-4 text-lg font-bold text-gray-600">You have no warnings</p>
          ) : (
            <DataTable
              headers={warningHeaders}
              data={warnings}
            />
          )}
          <h2 className="mt-8 text-2xl font-bold leading-none tracking-tight text-gray-800 md:text-3xl lg:text-4xl">
            My statistics
          </h2>
          <div className="mt-4 mb-12 block max-w-lg bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <dl className="flex flex-center gap-6 p-2 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{statistics.total_posts}</dt>
                <dd className="text-gray-500 dark:text-gray-400">Total posts</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{statistics.favorite_tag?.tag_name}</dt>
                <dd className="text-gray-500 dark:text-gray-400">Favourite tag</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{statistics.warning_points?.total_points}</dt>
                <dd className="text-gray-500 dark:text-gray-400">Warning points</dd>
              </div>
            </dl>
          </div>
        </div>
        ) : (
        <></>
      )}
    </section>
  );
};

export default Profile;
