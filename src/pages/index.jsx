import { useAuth0 } from "@auth0/auth0-react";
import UserInteger from "../components/UserInteger";

export default function index() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading page...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        <h2>Hello {user.name} </h2>

        <button
          type="button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </button>
        <UserInteger />
      </div>
    );
  }
  return (
    <div>
      <button type="button" onClick={loginWithRedirect}>
        Log in
      </button>
    </div>
  );
}
