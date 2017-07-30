import React from 'react'

export default ({data}) => {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <pre>{typeof data === 'function' ? data.call() : data}</pre>
  )
}
