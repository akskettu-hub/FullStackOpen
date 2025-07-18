import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { useState } from "react";

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  });

  const user = useQuery(ME, {
    skip: !props.show,
  });

  if (!props.show) {
    return null;
  }

  if (result.loading || user.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const filter = user.data?.me?.favoriteGenre || "";

  return (
    <div>
      <h2>Recommendations</h2>
      {filter && (
        <div>
          Recommended books in genre <b>{filter}</b>
        </div>
      )}
      <br />
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
    </div>
  );
};

export default Recommendations;
