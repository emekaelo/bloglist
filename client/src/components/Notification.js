import React from 'react'

const Notification = ({ notify }) => {
  if (!notify) {
    return null
  }
  return (
    <div className={notify.type}>
      <p>{notify.message}</p>
    </div>
  )
}

export default Notification
