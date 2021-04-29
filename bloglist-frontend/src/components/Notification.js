import React from "react";

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  } else {
    return (
      <div className={notification.type}>
        <p>{notification.message}</p>
      </div>
    );
  }
};

export default Notification;
