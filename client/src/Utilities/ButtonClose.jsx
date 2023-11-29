import { useEffect, useRef, useState } from "react"

const ButtonClose = ({onClick}) => {
  
  const [showConfirm, SetShowConfirm] = useState(false)
  const confirmBtnRef = useRef()

  useEffect(() => {
    const confirmBtn = confirmBtnRef.current
    
    console.log(confirmBtn)

    const handleConfirmBtnClose = (e) => {
      if(!confirmBtn.contains(e.target)) {
        SetShowConfirm(false)
      }
    }

    document.addEventListener('click', handleConfirmBtnClose)

      return () => {
        document.removeEventListener('click', handleConfirmBtnClose)
      }


  },[showConfirm])

  return (
    <>
      {
        !showConfirm ?
          <button 
              type='button' 
              className='btn-close' 
              onClick={() => {SetShowConfirm(true)}}
              >
              <span className="ri-close-line"></span>
          </button> 
            :
          <button
            type="button"
            className="confirm-btn"
            onClick={onClick}
            ref={confirmBtnRef}
          >
            <span className="ri-check-line"></span>
          </button>
      }
    </>
  )
}

export default ButtonClose