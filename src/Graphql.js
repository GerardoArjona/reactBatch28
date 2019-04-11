import { ApolloClient } from 'apollo-client'; //Cliente graphql de apollo
import { setContext } from 'apollo-link-context'; //Setea headers en el request
import { InMemoryCache } from 'apollo-cache-inmemory'; //Cache Graphql
import { createUploadLink } from 'apollo-upload-client';

//  subscriptions 
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Link para subscriptions
const WS_URL = 'localhost:8000';
// Link para mutations y queries.
const API_URL = "http://localhost:8000/graphql";

// link para subscriptions
const wsLink = new WebSocketLink({
  uri: `ws:${WS_URL}`,
  options: {
    reconnect: true,
  }
})

// para mutations y queries.
const httplink = createUploadLink({
  uri: `${API_URL}`
  //credencials: "include" //Solo se agregan cuando hay credenciales en el backend
});

// link general
const link = split(
  ({query}) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  httplink,
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('appToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})
