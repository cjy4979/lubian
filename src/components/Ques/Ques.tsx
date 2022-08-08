import React, { Component } from 'react'
import styles from './Ques.less';
import { Input, Button, Radio, Space, RadioChangeEvent, message } from 'antd';
import { UserOutlined, LikeTwoTone } from '@ant-design/icons';
import { Toast } from '@douyinfe/semi-ui';
import { history } from 'umi'


export default class Ques extends Component {
    state = {
        name: '',
        debater: '',
        win: '',
    }
    Submit = () => {
        message.destroy();
        var peopleName = /^([\u4e00-\u9fa5]{0,20}|[a-zA-Z\.\s]{1,20})$/;
        var name = this.state.name.replaceAll(" ", "");//防止提交纯空格
        var debater = this.state.debater;

        if (peopleName.test(name) === false) {
            message.error("请检查您的姓名格式")
        } else if (name.length === 0) {
            message.error("请输入姓名")
        } else if (this.state.win === '') {
            message.error("请投出您的票型")
        }
        // else if (debater === '') {
        //     message.error("请选择最佳辩手归属")
        // } 
        else {
            //备用库提交
            fetch('/api/backsubmit?name=' + this.state.name +
                '&win=' + this.state.win +
                '&best=' + debater
            )

            //主库提交
            fetch('/api/submit?name=' + this.state.name +
                '&win=' + this.state.win +
                '&best=' + debater

                , {
                    credentials: 'same-origin',
                }
            ).then(response => response.json())
                .then(data => {
                    if (data.status === 0) {
                        Toast.success('提交成功')
                        history.push('/vj/success')
                    } else {
                        Toast.error(data.data)
                    }
                })


        }
    }


    onKeyDownchange = (e: React.KeyboardEvent<any>) => {
        if (e.keyCode === 13) {
            this.Submit
        }
    }
    //获胜方
    NeiRong = (e: RadioChangeEvent) => {
        this.setState({
            win: e.target.value,
        })
    };


    onChangeName = (e: { target: { value: any; }; }) => {
        this.setState({
            name: e.target.value,
        })
    }

    render() {
        return (
            <div className={styles.question} >
                {/* 问卷部分 */}
                <div className={styles.q1}>
                    <p className={styles.qustionText}>1.您的姓名：</p>
                    <div className={styles.name}><Input prefix={<UserOutlined />} onChange={(e) => this.onChangeName(e)} /></div>
                </div>

                {/* 获胜方 */}
                <div className={styles.q2} style={{ marginTop: "5px" }}>
                    <p className={styles.qustionText}>2.请您综合双方场上表现投出本场获胜方：</p>
                    <div className={styles.winner}>
                        <div>
                            <Radio.Group onChange={(e) => this.NeiRong(e)} value={this.state.win}
                                style={{ marginLeft: '5px' }}
                            >
                                {/* <Radio.Group  value={this.state.value}> */}
                                <Space align="baseline">
                                    <Radio value={'正'} defaultChecked={false} ></Radio><p style={{verticalAlign:'bottom'}}>正方</p>
                                    <Radio value={'反'} defaultChecked={false} style={{marginLeft:'15px'}}></Radio><p style={{verticalAlign:'bottom'}}>反方</p>
                                </Space>
                            </Radio.Group>
                        </div>
                    </div>
                </div>


                {/* 佳辩 */}
                <div className={styles.q3} style={{ marginTop: "10px" }}>
                    <p className={styles.qustionText}>3.您有一票最佳辩手归属票，请综合选手表现投出您的佳辩票也可以选择弃票：</p>
                    <div className={styles.vote} >

                        <div className={styles.FinalQ3}>

                            <div className={styles.FinalZ}>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'z1' }) }}
                                    style={{ color: this.state.debater === 'z1' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'z1' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>正方一辩</div>
                                </div>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'z2' }) }}
                                    style={{ color: this.state.debater === 'z2' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'z2' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>正方二辩</div>
                                </div>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'z3' }) }}
                                    style={{ color: this.state.debater === 'z3' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'z3' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>正方三辩</div>
                                </div>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'z4' }) }}
                                    style={{ color: this.state.debater === 'z4' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'z4' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>正方四辩</div>
                                </div>
                            </div>

                            <div className={styles.FinalF}>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'f1' }) }}
                                    style={{ color: this.state.debater === 'f1' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'f1' ? 'visible' : 'hidden' }} />
                                    <div className={styles.dName}>反方一辩</div>
                                </div>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'f2' }) }}
                                    style={{ color: this.state.debater === 'f2' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'f2' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>反方二辩</div>
                                </div>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'f3' }) }}
                                    style={{ color: this.state.debater === 'f3' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'f3' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>反方三辩</div>
                                </div>
                                <div className={styles.FinalDebater}
                                    onClick={() => { this.setState({ debater: 'f4' }) }}
                                    style={{ color: this.state.debater === 'f4' ? '#ffb6b9' : '' }}
                                >
                                    <LikeTwoTone twoToneColor="#ffb6b9" style={{ visibility: this.state.debater === 'f4' ? 'visible' : 'hidden' }} />
                                    <div className={styles.JuesaiName}>反方四辩</div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <button className={styles.btn} onClick={this.Submit}>提交</button>
            </div>
        )
    }
}

