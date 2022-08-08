import React, { Component } from 'react'
import styles from './Mobile.less'
import { Tag, Divider } from 'antd';
import moment from 'moment';

export default class MItem extends Component<any, any> {
    render() {
        let win = this.props.win
        let best = this.props.best
        let name = this.props.name
        let time = moment(this.props.time).format('M月D日 HH:mm:ss')

        //佳辩
        const bestDebater = {
            'z1': '正方一辩',
            'z2': '正方二辩',
            'z3': '正方三辩',
            'z4': '正方四辩',
            'f1': '反方一辩',
            'f2': '反方二辩',
            'f3': '反方三辩',
            'f4': '反方四辩',

        }





        //赛程处理
        const date = this.props.time.substr(5, 5)


        return (
            <div className={styles.table}>
                <Divider style={{ visibility: 'hidden' }} />
                <div className={styles.line1}>
                    {/* 评委姓名 */}
                    <div className={styles.cell} >
                        {this.props.name}
                    </div>
                    {/* 投票时间 */}
                    <div className={styles.cell} >
                        {time}
                    </div>
                </div>
                <Divider />
                <div className={styles.line2}>

                    {/* 票型 */}
                    <div className={styles.cell} >
                        <span>
                            <div>
                                <Tag color={win === '正' ? 'green' : 'geekblue'} >
                                    {win[0]}方
                                </Tag>
                            </div>
                        </span>
                    </div>
                    {/* 佳辩 */}
                    <div className={styles.cell} >
                        {best === '' ? <div style={{ color: '#ff4d4f', fontSize: '18px' }}> 弃票</div> :
                            <div style={best.substr(0, 1) === 'z' ? { color: '#00b483', fontSize: '18px' } : { color: '#7991d1', fontSize: '18px' }}>
                                {bestDebater[best as keyof typeof bestDebater]}
                            </div>}


                    </div>
                </div>
                <Divider />
                {/* <div className={styles.line2}>

                    <div style={this.props.debater === '弃票' ? { display: "none" } : FinalText === '' ? { display: 'flex' } : { display: "none" }} className={styles.bestdebater}>
                    </div>
                    <div className={styles.bestdebater} style={this.props.debater === '弃票' ? { color: "red", fontWeight: "bold" } : { display: "none" }}>
                        弃票
                    </div>
                    <div className={styles.best} style={FinalText === '' ? { display: 'none' } : {}}>
                        <Tag color={bestColor} >{bestText}</Tag>
                    </div>

                    <div className={styles.best} >
                        <Tag color={bestColor} style={FinalText === '' ? {} : { display: 'none' }}>{bestText}</Tag>
                        <div style={FinalText === '' ? { display: 'none' } : {}}>{FinalText}</div>
                    </div>
                </div> */}
            </div>
        )
    }
}
