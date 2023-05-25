import css from './Modal.module.css'
import { createPortal } from 'react-dom';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const modalRoor = document.querySelector('#modal-root')


export function Modal ({onClose, largeImage}) {
   
    useEffect(() => {
        window.addEventListener('keydown', closeOnESC)
        return () =>  {window.removeEventListener('keydown', closeOnESC)}
    })

    const closeOnESC = (e)  => {
            if (e.code === 'Escape') {
                onClose()
            }
        }

    const handleClicBacldrop = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }
    
    return createPortal(<div onClick={handleClicBacldrop} className={css.Overlay}>
                <div className={css.Modal}>
                    <img  className={css.imgModal} src={largeImage} alt="" />
                </div>
            </div>, modalRoor)   
}

Modal.propTypes = {
    onClick: PropTypes.func,
    largeImage: PropTypes.string.isRequired,
};