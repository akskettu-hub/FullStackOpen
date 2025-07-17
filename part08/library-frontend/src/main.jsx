import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
