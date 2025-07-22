import type React from "react";
import { createEntry } from "../diaryService";
import type { DiaryEntry } from "../types";
import { useState, type Dispatch, type SetStateAction } from "react";

interface DiaryEntryFormProps {
  flightDiaries: DiaryEntry[];
  setFlightDiaries: Dispatch<SetStateAction<DiaryEntry[]>>;
}

export const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  //const [newEntry, setNewEntry] = useState<DiaryEntry>(null)
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    }).then((data) => props.setFlightDiaries(props.flightDiaries.concat(data)));
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
