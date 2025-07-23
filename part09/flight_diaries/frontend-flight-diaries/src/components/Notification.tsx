interface NotificationProps {
  message: string;
  notificationIsError: boolean;
}

export const Notification = (props: NotificationProps) => {
  if (!props.message) {
    return null;
  }

  const style = {
    color: props.notificationIsError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{props.message}</div>;
};
