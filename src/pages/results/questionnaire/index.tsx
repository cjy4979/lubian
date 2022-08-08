import React, { useEffect, useState } from 'react'
import styles from './questionnaire.less';
import onlineLogo from '@/images/online.png'
import Ques from '@/components/Ques/Ques'

export default function questionnaire() {
    return (
        <div className={styles.ques_bg}>
            <div className={styles.content_wrap}>
                <div className={styles.ques_title}>
                    第二届鲁辩齐思辩论赛赛果收集
                </div>
                <div className={styles.contents}> 

                    <Ques />
                </div>

            </div>
        </div>
    )
};