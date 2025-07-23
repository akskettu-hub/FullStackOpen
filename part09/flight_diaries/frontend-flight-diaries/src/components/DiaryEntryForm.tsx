import type React from "react";
import { createEntry } from "../diaryService";
import type { DiaryEntry } from "../types";
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
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
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
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
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
