import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const genres = [...new Set(books.map((b) => b.genres).flat())];

  return (
    <div>
      <h2>books</h2>
      {filter && (
        <div>
          Books in genre <b>{filter}</b>
        </div>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => filter === "" || book.genres.includes(filter))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((lable, index) => (
        <button key={index} onClick={() => setFilter(lable)}>
          {lable}
        </button>
      ))}
      <button onClick={() => setFilter("")}>all genres</button>
    </div>
  );
};

export default Books;
