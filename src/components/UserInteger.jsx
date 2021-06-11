import { useAuth0 } from "@auth0/auth0-react";
import useApi from "../hooks/useApi";
import UserIntegerUI from "./UserIntegerUI";

export default function UserInteger() {
  const { getAccessTokenWithPopup } = useAuth0();
  const opts = {
    audience: "https://thinkific-backend.aldecoa.xyz",
    scope: "read:userInteger write:userInteger",
  };

  const { loading, error, refresh, accessToken } = useApi(opts);

  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    if (error.error === "consent_required") {
      return (
        <button type="button" onClick={getTokenAndTryAgain}>
          Consent to reading and writing userInteger data
        </button>
      );
    }
    return <div>Oops {error.message}</div>;
  }

  return (
    <div>
      <UserIntegerUI accessToken={accessToken} />
    </div>
  );
}
