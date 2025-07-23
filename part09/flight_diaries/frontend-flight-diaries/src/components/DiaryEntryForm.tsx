import type React from "react";
import { createEntry } from "../diaryService";
import {
  visibilityOptions,
  weatherOptions,
  type DiaryEntry,
  type Visibility,
  type Weather,
} from "../types";
import { useState, type Dispatch, type SetStateAction } from "react";
import axios from "axios";

interface DiaryEntryFormProps {
  flightDiaries: DiaryEntry[];
  setFlightDiaries: Dispatch<SetStateAction<DiaryEntry[]>>;
  notifyWith: (message: string, isError: boolean) => void;
}

interface ValidationError {
  message: string;
  error: Record<string, string[]>;
}

export const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState<string>("");

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = await createEntry({
        date: date,
        weather: weather,
        visibility: visibility,
        comment: comment,
      });
      props.setFlightDiaries(props.flightDiaries.concat(newEntry));
      props.notifyWith(`created new entry for ${date}`, false);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        console.log(error.status);
        console.log(error.response);

        props.notifyWith(`${error.response?.data}`, true);
      } else {
        console.error(error);

        props.notifyWith(`Error creating entry: unknown error`, true);
      }
    }
  };

  return (
    <div>
      <h2>Add New Diary entry</h2>
      <form onSubmit={diaryEntryCreation}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          weather
          {weatherOptions.map((weatherOp) => (
            <label key={weatherOp}>
              <input
                type="radio"
                name="weather"
                value={weatherOp}
                checked={weather === weatherOp}
                onChange={() => setWeather(weatherOp)}
              />
              {weatherOp}
            </label>
          ))}
        </div>
        <div>
          visibility
          {visibilityOptions.map((visibilityOp) => (
            <label key={visibilityOp}>
              <input
                type="radio"
                name="visibility"
                value={visibilityOp}
                checked={visibility === visibilityOp}
                onChange={() => setVisibility(visibilityOp)}
              />
              {visibilityOp}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
