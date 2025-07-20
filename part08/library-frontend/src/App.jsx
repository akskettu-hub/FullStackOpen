import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommendations from "./components/Recommendations";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  // returns array of unique objects in array. Removes duplicates array
  const uniqById = (a) => {
    //a = array
    let seen = new Set();
    return a.filter((item) => {
      // returns filterd array
      let k = item.title; // k = title of each item
      return seen.has(k) ? false : seen.add(k); // if title has already been seen, return false else add title to seen
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    };
  });
};

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

    prefetchData();
  }, []);

  const prefetchData = async () => {
    try {
      await client.query({
        query: ALL_BOOKS,
        fetchPolicy: "network-only",
      });

      await client.query({
        query: ALL_AUTHORS,
        fetchPolicy: "network-only",
      });
    } catch (error) {
      console.error("Prefetch failed:", error);
    }
  };

  const logout = () => {
    setToken(null);
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
