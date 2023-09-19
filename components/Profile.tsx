import PromptCard from "@components/PromptCard";
import { IPrompt } from "@ts/interface/prompt";

interface IProfile {
  name: string;
  desc: string;
  data: Array<IPrompt>;
  handleEdit?: (prompt?: IPrompt) => void;
  handleDelete?: (prompt?: IPrompt) => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: IProfile) => {
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
    </section>
  );
};

export default Profile;
