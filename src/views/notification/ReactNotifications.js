import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// toast component for foreground notifications
const ReactNotificationComponent = ({ title, body }) => {
  let hideNotif = title === ''

  if (!hideNotif) { // if there is a notification
    toast.info(<Display/>)
  }

  // display component
  function Display () {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    )
  }

  return (
    // toast container
    <ToastContainer
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      bodyClassName='toastBody'
      toastStyle={{ backgroundColor: '#111726', color: 'white' }}
    />
  )
}

ReactNotificationComponent.defaultProps = {
  title: 'This is title',
  body: 'Some body'
}

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string
}

export default ReactNotificationComponent
