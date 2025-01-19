import React, { useState } from 'react'
import styles from './ModalInfo.module.css';
import { Children } from 'react';

const ModalInfo = ({hideModal, titleModal, children , button1 }) => {
    

  return (
    <>
        
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <section className={styles.titleModal}>
                  <h3>{titleModal}</h3>
                  <button className={styles.close} onClick={hideModal}>
                    x
                  </button>
                </section>
                
                <section className={styles.content}>
                  <>
                  {children}
                  </>
                  <div>
                    <button className={button1.color == "grey" ? styles.btnGrey : styles.btnRed } onClick={button1.action}>{button1.title}</button>
                  </div>
                </section>
            </div>
            </div>
    </>
  )
}

export default ModalInfo