const Notification = ({ message, isGood }) => {
  if (message === null) {
    return null
  }

  if (!isGood)
    return (
        <div className='error'>
            {message}
        </div>
    )
  else{
    return(
        <div className='ok'>
            {message}
        </div>
    )
  }
}

export default Notification