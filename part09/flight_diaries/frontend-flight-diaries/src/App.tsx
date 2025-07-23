import { useEffect, useState } from "react";
import { getAllDiaryEntries } from "./diaryService";
import type { DiaryEntry } from "./types";
import { DiaryEtries } from "./components/DiaryEntries";
import { DiaryEntryForm } from "./components/DiaryEntryForm";
import { Notification } from "./components/Notification";

const App = () => {
  const [flightDiaries, setFlightDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState("");
  const [notificationIsError, setNotificationIsError] = useState(false);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setFlightDiaries(data);
    });
  }, []);

  const notifyWith = (message: string, isError: boolean) => {
    setNotification(message);
    setNotificationIsError(isError);

    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      <h1>Ilari's Flight Diaries</h1>
      <Notification
        message={notification}
        notificationIsError={notificationIsError}
      />
      <DiaryEntryForm
        flightDiaries={flightDiaries}
        setFlightDiaries={setFlightDiaries}
        notifyWith={notifyWith}
      />
      <DiaryEtries diaryEntries={flightDiaries} />
    </div>
  );
};

export default App;
