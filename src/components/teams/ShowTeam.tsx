import React, { Component } from 'react'
import styles from './AddTeam.less'
import { Radio, RadioGroup, Toast } from '@douyinfe/semi-ui';
import { Select } from 'antd'

export default class ShowTeam extends Component<any, any> {

    state = {
        selected: Number(this.props.selected),
        type: this.props.type,
    }
    Delete = () => {
        var msg = confirm('确认删除吗？')
        if (msg === true) {
            fetch('/api/deleteteam?team=' + this.props.team).then(
                response => response.json()
            ).then(
                data => {
                    if (data.status === 0) {
                        Toast.success('删除成功')
                    }
                }
            )
        }
    }

    //更新选择状态
    onChange = (e: any) => {
        this.setState({
            selected: e.target.value
        })
        fetch('/api/teamselect?team=' + this.props.team + '&selected=' + e.target.value).then(
            response => response.json()
        ).then(
            data => {
                console.log(data);

                if (data.status === 0) {
                    Toast.success('成功')
                }
            }
        )
    }

    //更新队伍编号
    onCodeChange = (e: any) => {
        fetch('/api/teamcode?type=' + e + '&team=' + this.props.team).then(
            response => response.json()
        ).then(
            data => {
                if (data.msg === 'success') {
                    Toast.success('成功！')
                } else if (data.msg === 'failed') {
                    Toast.error('出错了')
                } else {
                    if (confirm(data.data)) { //if语句内部判断确认框
                        fetch('/api/teamcodeforce?type=' + e + '&team=' + this.props.team).then(
                            response => response.json()
                        ).then(
                            data => {
                                if (data.msg === 'success') {
                                    Toast.success('更新成功！')
                                } else {
                                    Toast.error('出错了')
                                }
                            }
                        )
                    } else {
                        Toast.warning('请更换编号')
                    }
                }
            }
        )
    }

    //本组件纯展示，不做数据处理
    render() {
        const t16 = [
            { value: 'A1', label: 'A1' },
            { value: 'A2', label: 'A2' },
            { value: 'A3', label: 'A3' },
            { value: 'A4', label: 'A4' },

            { value: 'B1', label: 'B1' },
            { value: 'B2', label: 'B2' },
            { value: 'B3', label: 'B3' },
            { value: 'B4', label: 'B4' },


            { value: 'C1', label: 'C1' },
            { value: 'C2', label: 'C2' },
            { value: 'C3', label: 'C3' },
            { value: 'C4', label: 'C4' },


            { value: 'D1', label: 'D1' },
            { value: 'D2', label: 'D2' },
            { value: 'D3', label: 'D3' },
            { value: 'D4', label: 'D4' },

        ];

        const t24 = [
            { value: 'A1', label: 'A1' },
            { value: 'A2', label: 'A2' },
            { value: 'A3', label: 'A3' },
            { value: 'A4', label: 'A4' },

            { value: 'A5', label: 'A5' },
            { value: 'A6', label: 'A6' },
            { value: 'A7', label: 'A7' },
            { value: 'A8', label: 'A8' },

            { value: 'B1', label: 'B1' },
            { value: 'B2', label: 'B2' },
            { value: 'B3', label: 'B3' },
            { value: 'B4', label: 'B4' },

            { value: 'B5', label: 'B5' },
            { value: 'B6', label: 'B6' },
            { value: 'B7', label: 'B7' },
            { value: 'B8', label: 'B8' },

            { value: 'C1', label: 'C1' },
            { value: 'C2', label: 'C2' },
            { value: 'C3', label: 'C3' },
            { value: 'C4', label: 'C4' },

            { value: 'C5', label: 'C5' },
            { value: 'C6', label: 'C6' },
            { value: 'C7', label: 'C7' },
            { value: 'C8', label: 'C8' },
        ];

        return (
            <div className={styles.contents}>
                <div>
                    <div className={styles.main}>
                        <h1 className={styles.teamRow}>
                            {this.props.selected === 1 ?
                                <Select placeholder='请选择队伍编号'
                                    style={{ width: 100 }}
                                    value={this.props.type}
                                    options={t24}
                                    onChange={(e) => this.onCodeChange(e)}
                                >

                                </Select>
                                :
                                ''
                            }
                            <div className={styles.showTeamName}>
                                <input id='team' readOnly value={this.props.team} />
                            </div>
                            <div className={styles.buttonDiv2} >
                                <button className={styles.button2} onClick={() => this.Delete()}>
                                    删除
                                </button>
                            </div>
                        </h1>

                        <div className={styles.showleaderRow}>
                        <div style={{ minWidth: '50px', marginLeft: '20px ' }}>
                                    领队:
                                </div>
                                <input id='leader'
                                    readOnly
                                    style={this.props.leader === '' ? { color: 'red' } : { color: '' }}
                                    value={this.props.leader === '' ? '请检查表格' : this.props.leader} />
                                <div style={{ minWidth: '50px' }}>
                                    手机:
                                </div>
                                <input id='phone' readOnly value={this.props.phone} />
                                <div>
                                    QQ:
                                </div>
                                <input id='QQ' readOnly value={this.props.QQ} />
                        </div>

                        {/* 成员展示列表 */}
                        <div className={styles.member}>
                            <table>
                                <tbody>
                                    <tr className={styles.tr}>
                                        <th className={styles.name}>

                                        </th>
                                        <th className={styles.name}>
                                            姓名
                                        </th>
                                        <th className={styles.grade}>
                                            年级
                                        </th>
                                        <th className={styles.school}>
                                            学校
                                        </th>
                                        <th className={styles.debate}>
                                            辩论履历
                                        </th>
                                    </tr>

                                    {/* 成员1信息 */}
                                    <tr className={styles.tr}>
                                        <td>
                                            成员1
                                        </td>
                                        <td >
                                            <div style={this.props.debate1 === '3-5条' ? { color: 'red' } : { color: '' }}>
                                                {this.props.member1}
                                            </div>
                                        </td>
                                        <td className={styles.grade1}>
                                            <div style={{ width: '90%' }}>
                                                {this.props.grade1}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.school1}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.debate1}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* 成员2信息 */}
                                    <tr className={styles.tr}>
                                        <td>
                                            成员2
                                        </td>
                                        <td>
                                            {this.props.member2}
                                        </td>
                                        <td className={styles.grade1}>
                                            <div style={{ width: '90%' }}>
                                                {this.props.grade2}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.school2}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.debate2}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* 成员3信息 */}
                                    <tr className={styles.tr}>
                                        <td>
                                            成员3
                                        </td>
                                        <td>
                                            {this.props.member3}
                                        </td>
                                        <td className={styles.grade1}>
                                            <div style={{ width: '90%' }}>
                                                {this.props.grade3}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.school3}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ width: '90%' }}>
                                                {this.props.debate3}
                                            </div>
                                        </td>
                                    </tr>

                                    {/* 成员4信息 */}
                                    {this.props.member4 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员4
                                            </td>
                                            <td>
                                                {this.props.member4}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.grade4}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.school4}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate4}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员5信息 */}
                                    {this.props.member5 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员5
                                            </td>
                                            <td>
                                                {this.props.member5}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.grade5}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.school5}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate5}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员6信息 */}
                                    {this.props.member6 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员6
                                            </td>
                                            <td>
                                                {this.props.member6}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.grade6}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.school6}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate6}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员7信息 */}
                                    {this.props.member7 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员7
                                            </td>
                                            <td>
                                                {this.props.member7}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.grade7}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.school7}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate7}
                                                </div>
                                            </td>

                                        </tr>
                                    }

                                    {/* 成员8信息 */}
                                    {this.props.member8 === '' ? null :
                                        <tr className={styles.tr}>
                                            <td>
                                                成员8
                                            </td>
                                            <td>
                                                {this.props.member8}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.grade8}
                                                </div>
                                            </td>
                                            <td >
                                                <div style={{ width: '90%' }}>
                                                    {this.props.school8}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.props.debate8}
                                                </div>
                                            </td>

                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>


                        {
                                this.props.topic1 === '' ?
                                    <h1>
                                        无
                                    </h1>
                                    :
                                    <div className={styles.member}>
                                        <table>
                                            <tbody>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        辩题1:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.topic1}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解1:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.explanation1}
                                                        </div>
                                                    </td>
                                                </tr >
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        辩题2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.topic2}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.props.explanation2}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            }

                    </div>
                </div>

            </div>
        )
    }
}
