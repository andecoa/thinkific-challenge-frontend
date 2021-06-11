import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// our own stale-while revalidate (swr) hook for auth0 access tokens :)

const useApi = (options = {}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    accessToken: null,
  });

  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { audience, scope } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        setState({
          error: null,
          loading: false,
          accessToken,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};

export default useApi;
