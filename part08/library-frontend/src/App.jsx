import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import { prefetchData, updateCache } from "./cacheManagement";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      console.log("New book through subscription: ", data);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      window.alert(`New book ${addedBook.title} has been added!`);
    },
  });

  useEffect(() => {
    const token = window.localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }

    /*
    prefetches data from server when app is started. 
    This is a hack to ensure that books and authors are available when addBooks is run
    This is caused by the structure of the app where the appropriate page renders the relevant content,
    but if a page is not navigated to, that data won't be available.
    As a side effect, this causes authors to be fetched twice when the app is run.
    */
    prefetchData(client);
  }, []);

  const logout = () => {
    console.log("logging out");
    setToken(null);
    console.log("Clearing cache");
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recomendations")}>
            reccomendations
          </button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => logout()}>log out</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommendations show={page === "recomendations"} />

      <LoginForm show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
