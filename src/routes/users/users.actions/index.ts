import { getAuth } from "./get-auth.users.action";
import { signup } from "./signup.users.action";
import { refreshToken } from "./refresh-token.users.action";
import { signin } from "./signin.users.action";

export const usersActions = {
  getAuth,
  signup,
  refreshToken,
  signin,
};
