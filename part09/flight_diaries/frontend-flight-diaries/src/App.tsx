import { useEffect, useState } from "react";
import { getAllDiaryEntries } from "./diaryService";
import type { DiaryEntry } from "./types";
import { DiaryEtries } from "./components/DiaryEntries";
import { DiaryEntryForm } from "./components/DiaryEntryForm";

const App = () => {
  const [flightDiaries, setFlightDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setFlightDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Ilari's Flight Diaries</h1>
      <DiaryEntryForm
        flightDiaries={flightDiaries}
        setFlightDiaries={setFlightDiaries}
      />
      <DiaryEtries diaryEntries={flightDiaries} />
    </div>
  );
};

export default App;
