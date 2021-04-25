export {
  attachAuthListener,
  authenticate,
  createNewUser,
  spawnUser,
  deauthorize,
  init,
  UserContext,
  UserProvider,
  watchNotifications
} from "./firebase";
export { validateSignUp, validateSignIn } from "./helper";
export { EMAIL_REGEX } from "./constants.js";
