import { Auth0Provider } from "@auth0/auth0-react";

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="dev-s4uh28zn.us.auth0.com"
      clientId="raUgEUkwhLskPmA06zOikvv1jdgW689A"
      redirectUri="http://localhost:3000"
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
