import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries";

const AuthorBirthyearForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();
    console.log("setting birthyear: ", name, born);

    editBirthyear({
      variables: {
        name: name || null,
        born: born ? Number(born) : null,
      },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorBirthyearForm;
