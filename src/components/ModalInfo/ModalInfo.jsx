import React, { useState } from 'react'
import styles from './ModalInfo.module.css';
import { Children } from 'react';

const ModalInfo = ({hideModal, titleModal, children , button1 = null, button2 = null }) => {
    

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
                  {
                    button1 && (
                    <button className={button1.color == "grey" ? styles.btnGrey : styles.btnRed } onClick={button1.action}>{button1.title}</button>
                    )
                  }  
                  {
                    button2 && (
                    <button className={button2.color == "grey" ? styles.btnGrey : styles.btnRed } onClick={button2.action}>{button2.title}</button>
                    )
                  }
                  </div>
                </section>
            </div>
            </div>
    </>
  )
}

export default ModalInfo