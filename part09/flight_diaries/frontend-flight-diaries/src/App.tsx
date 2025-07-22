import { useEffect, useState } from "react";
import { getAllDiaryEntries } from "./diaryService";
import type { DiaryEntry } from "./types";
import { DiaryEtries } from "./components/DiaryEntries";

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
      <DiaryEtries diaryEntries={flightDiaries} />
    </div>
  );
};

export default App;
