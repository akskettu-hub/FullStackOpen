import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, isError } = notification;

  if (message === null) {
    return null;
  }

  const style = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={style} className={isError ? "error" : "notification"}>
      {notification.message}
    </div>
  );
};

export default Notification;
