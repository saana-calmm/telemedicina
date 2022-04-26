import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { TOKEN_AUTH, URL_SERVER } from "keys";

const httpLink = createHttpLink({
  uri: URL_SERVER,
});

const authLink = setContext((_, { headers }: any) => {
  return {
    headers: {
      ...headers,
      authorization: TOKEN_AUTH,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  ssrMode: !process.browser,
});

export default client;
