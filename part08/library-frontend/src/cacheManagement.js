import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

export const prefetchData = async (client) => {
  try {
    console.log("prefetching data...");

    await client.query({
      query: ALL_BOOKS,
      fetchPolicy: "network-only",
    });

    await client.query({
      query: ALL_AUTHORS,
      fetchPolicy: "network-only",
    });

    console.log("Data fetched");
  } catch (error) {
    console.error("Prefetch failed:", error);
  }
};

export const updateCache = (cache, query, addedBook) => {
  const uniqById = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    };
  });
};
