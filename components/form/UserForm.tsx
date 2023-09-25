import React from 'react';
import { IUser } from "@ts/interface/user";
import { IRole } from "@ts/interface/role";
import Link from "@node_modules/next/link";

interface IUserForm {
  user: IUser;
  roles: Array<IRole>;
  setUser: (user: IUser) => void;
  submitting: boolean;
  handleSubmit: (event: any) => void;
}

const UserForm = ({ user, roles, setUser, submitting, handleSubmit }: IUserForm) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Username
        </span>
        <input
          value={user.username}
          className="form_input"
          disabled
        />
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Email
        </span>
        <input
          value={user.email}
          className="form_input"
          disabled
        />
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Role
        </span>
        <select
          className="form_input"
          value={user.role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUser({...user, role: e.target.value })}
        >
          { roles.map((role: IRole) => (
              <option
                key={role.name}
                value={role._id}
              >
                {role.alias}
              </option>
            )
          )}
        </select>
      </label>

      <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/users" className="text-gray-500 text-sm">
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
        >
          { submitting
            ? "Editing..."
            : "Edit"
          }
        </button>
      </div>
    </form>
  );
};

export default UserForm;
