import type { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

export const DiaryEtries = (props: DiaryEntriesProps) => {
  console.log("Rendering entries: ", props.diaryEntries);

  return (
    <div>
      <h2>Fight Diary Entries</h2>
      {props.diaryEntries.map((e) => (
        <div key={e.id}>
          <h3>{e.date}</h3>
          <p>Visibility: {e.visibility}</p>
          <p>Weather: {e.weather}</p>
        </div>
      ))}
    </div>
  );
};
