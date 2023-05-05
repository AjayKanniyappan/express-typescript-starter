import { User } from '@models/user';

async function loginController() {
  const values = await User.find();
  return values;
}

export default loginController;
