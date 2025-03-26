import { hydrateAuthTokens } from "@/store/persisted/useAuthStore";
import parseJwt from "@hey/helpers/parseJwt";

const getCurrentSession = (): {
  authenticationId: string;
  owner: string;
  address: string;
} => {
  const { accessToken } = hydrateAuthTokens();
  const currentSession = parseJwt(accessToken || "");

  return {
    authenticationId: currentSession?.sid,
    owner: currentSession?.sub,
    address: currentSession?.act.sub
  };
};

export default getCurrentSession;
