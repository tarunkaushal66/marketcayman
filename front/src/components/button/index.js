import React from 'react'
import styles from './button.module.css'

export function PrimaryBtn({ title, disabled, onClick }) {
    return (
        <div className={styles.loginBtFp}>
            <div className={styles.login1}>
                <b className={styles.signUp}>{title}</b>
            </div>
        </div>
    )
}
export function TextBtn({ title, disabled, onClick, style }) {
    return (
        <button onClick={onClick} className={styles.btnText} style={style}>{title}</button>
    )
}
