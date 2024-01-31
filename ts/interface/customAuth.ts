import { Session } from 'next-auth';

interface CustomSession extends Session {
  data: {
    user: {
      id: string;
      role: string;
      name: string;
      email: string;
      image: string;
    };
    token: string;
  };
}

export default CustomSession;
