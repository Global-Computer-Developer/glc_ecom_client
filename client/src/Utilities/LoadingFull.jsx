import React from 'react'

const LoadingFull = ({loading}) => {
  return (
    <>
      {
        loading &&
            <div className='loading-full'>
                <span className='loading-full__circle'></span>
            </div>
      }
    </>
  )
}

export default LoadingFull