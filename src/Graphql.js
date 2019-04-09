import {ApolloClient} from 'apollo-client'; //Cliente de graphql de apollo
import {setContext} from 'apollo-link-context'; //Set headers en el request
import {inMemoryCache, InMemoryCache} from 'apollo-cache-inmemory'; // caché Graphql
import {createUploadLink} from 'apollo-upload-client'; //

const API_URL = "http://10.0.0.172:8000";

const httplink = createUploadLink({
  uri: `${API_URL}/graphql`
})

const authLink = setContext((_,{headers}) =>{
  const token = localStorage.getItem('appToken');
  return{
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '' /* */
    }
  }
})

export default new ApolloClient({
  link: authLink.concat(httplink),
  cache: new InMemoryCache()
})