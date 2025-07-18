import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries";
import Select from "react-select";

const AuthorBirthyearForm = ({ authors }) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [editBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();
    console.log("setting birthyear: ", selectedOption?.value, born);

    editBirthyear({
      variables: {
        name: selectedOption?.value || null,
        born: born ? Number(born) : null,
      },
    });

    setSelectedOption(null);
    setBorn("");
  };

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div style={{ display: "inline-block" }}>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
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
