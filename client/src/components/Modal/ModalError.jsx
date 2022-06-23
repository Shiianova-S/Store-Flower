import React from 'react';

function ModalError({error, setError, errorAdmin, setErrorAdmin, setAddError, addError}) {

  const message =  error || errorAdmin || addError || '';
  const closeErrorModal = () => {
    if (typeof setError === 'function') {
      return setError('');
    }
    if (typeof setErrorAdmin === 'function') {
      return setErrorAdmin('');
    }
    if (typeof setAddError === 'function') {
      return setAddError('');
    }
  }

  return (
    <div>
    <div className='modal-order'>
        <div className='modal-order-dialog'>
          <div className='modal-order-close'>
            <button className='modal-order-button' onClick={closeErrorModal}>
              <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
              </svg>
            </button>
          </div>
        <p className='modal-order-thanks'>Ошибка! </p>
        <p className='modal-order-text'>{message}</p>
        </div>
      </div> 
      </div>
  );
}

export default ModalError;
