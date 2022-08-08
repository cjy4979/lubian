import React, { Component } from 'react'
import styles from './AddTeam.less'
import { Toast } from '@douyinfe/semi-ui';
import * as XLSX from 'xlsx';



export default class AddTeam extends Component<any, any> {

    state = {
        team: '',
        leader: '', //领队信息
        phone: '',
        QQ: '',
        member1: '', //成员1
        debate1: '',
        grade1: '',
        school1: '',
        member2: '', //成员2
        debate2: '',
        grade2: '',
        school2: '',
        member3: '', //成员3
        debate3: '',
        grade3: '',
        school3: '',
        member4: '', //成员4
        debate4: '',
        grade4: '',
        school4: '',
        member5: '', //成员5
        debate5: '',
        grade5: '',
        school5: '',
        member6: '', //成员6
        debate6: '',
        grade6: '',
        school6: '',
        member7: '', //成员7
        debate7: '',
        grade7: '',
        school7: '',
        member8: '', //成员8
        debate8: '',
        grade8: '',
        school8: '',
        topic1: '', //辩题1
        explanation1: '',
        topic2: '', //辩题2
        explanation2: '',
        status: true //有值隐藏excel选择框
    }


    Select = () => {
        document.getElementById("excel")?.click()
    }



    //获取报名表信息
    onChange = (e: any) => {
        let file = e.target.files[0];
        this.readWorkbookFromLocalFile(file);

    }

    readWorkbookFromLocalFile(file: Blob) {
        var reader = new FileReader();
        reader.onload = (e: any) => {
            var filedData = e.target.result;
            var workbook = XLSX.read(filedData, {
                type: 'binary'
            });
            var sheet = workbook.Sheets.Sheet1
            var data = {
                team: sheet.D9 ? sheet.D9.v : '',
                leader: sheet.D12 ? sheet.D12.v : '', //领队信息
                phone: sheet.H12 ? sheet.H12.v : '',
                QQ: sheet.L12 ? sheet.L12.v : '',
                member1: sheet.C15 ? sheet.C15.v : '', //成员1
                debate1: sheet.J15 ? sheet.J15.v : '',
                grade1: sheet.F15 ? sheet.F15.v : '',
                school1: sheet.G15 ? sheet.G15.v : '',
                member2: sheet.C16 ? sheet.C16.v : '', //成员2
                debate2: sheet.J16 ? sheet.J16.v : '',
                grade2: sheet.F16 ? sheet.F16.v : '',
                school2: sheet.G16 ? sheet.G16.v : '',
                member3: sheet.C17 ? sheet.C17.v : '', //成员3
                debate3: sheet.J17 ? sheet.J17.v : '',
                grade3: sheet.F17 ? sheet.F17.v : '',
                school3: sheet.G17 ? sheet.G17.v : '',
                member4: sheet.C18 ? sheet.C18.v : '', //成员4
                debate4: sheet.J18 ? sheet.J18.v : '',
                grade4: sheet.F18 ? sheet.F18.v : '',
                school4: sheet.G18 ? sheet.G18.v : '',
                member5: sheet.C19 ? sheet.C19.v : '', //成员5
                debate5: sheet.J19 ? sheet.J19.v : '',
                grade5: sheet.F19 ? sheet.F19.v : '',
                school5: sheet.G19 ? sheet.G19.v : '',
                member6: sheet.C20 ? sheet.C20.v : '', //成员6
                debate6: sheet.J20 ? sheet.J20.v : '',
                grade6: sheet.F20 ? sheet.F20.v : '',
                school6: sheet.G20 ? sheet.G20.v : '',
                member7: sheet.C21 ? sheet.C21.v : '', //成员7
                debate7: sheet.J21 ? sheet.J21.v : '',
                grade7: sheet.F21 ? sheet.F21.v : '',
                school7: sheet.G21 ? sheet.G21.v : '',
                member8: sheet.C22 ? sheet.C22.v : '', //成员8
                debate8: sheet.J22 ? sheet.J22.v : '',
                grade8: sheet.F22 ? sheet.F22.v : '',
                school8: sheet.G22 ? sheet.G22.v : '',
                topic1: sheet.D24 ? sheet.D24.v : '', //辩题1
                explanation1: sheet.D25 ? sheet.D25.v : '',
                topic2: sheet.D26 ? sheet.D26.v : '', //辩题2
                explanation2: sheet.D27 ? sheet.D27.v : '',
                status: false
            }
            this.setState(data)
        }
        reader.readAsBinaryString(file);

    }

    //获取报名表信息

    onReselect = () => {
        this.setState(
            {
                team: '',
                leader: '', //领队信息
                phone: '',
                QQ: '',
                member1: '', //成员1
                debate1: '',
                grade1: '',
                member2: '', //成员2
                debate2: '',
                grade2: '',
                member3: '', //成员3
                debate3: '',
                grade3: '',
                member4: '', //成员4
                debate4: '',
                grade4: '',
                member5: '', //成员5
                debate5: '',
                grade5: '',
                member6: '', //成员6
                debate6: '',
                grade6: '',
                member7: '', //成员7
                debate7: '',
                grade7: '',
                member8: '', //成员8
                debate8: '',
                grade8: '',
                topic1: '', //辩题1
                explanation1: '',
                topic2: '', //辩题2
                explanation2: '',
                status: true
            }
        )
    }

    //提交报名表信息
    onClick = () => {
        var data = this.state
        fetch('/api/addteam', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.status === 0) {
                    Toast.success(data.msg)
                    //提交后更新组件，方便继续提交
                    console.log(data);
                    
                    this.setState(
                        {
                            team: '',
                            leader: '', //领队信息
                            phone: '',
                            QQ: '',
                            member1: '', //成员1
                            debate1: '',
                            grade1: '',
                            member2: '', //成员2
                            debate2: '',
                            grade2: '',
                            member3: '', //成员3
                            debate3: '',
                            grade3: '',
                            member4: '', //成员4
                            debate4: '',
                            grade4: '',
                            member5: '', //成员5
                            debate5: '',
                            grade5: '',
                            member6: '', //成员6
                            debate6: '',
                            grade6: '',
                            member7: '', //成员7
                            debate7: '',
                            grade7: '',
                            member8: '', //成员8
                            debate8: '',
                            grade8: '',
                            topic1: '', //辩题1
                            explanation1: '',
                            topic2: '', //辩题2
                            explanation2: '',
                            status: true
                        }
                    )
                } else {
                    Toast.error(data.msg)
                }

            }
        ).then(

        )
    }


    render() {
        return (
            <div className={styles.contents}>

                {/* excel上传 */}

                {this.state.status ? //获取excel值后隐藏
                    <div className={styles.dragArea} onClick={() => this.Select()}>
                        <div className={styles.icon}>
                            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2162" width="60" height="60"><path d="M1024 693.248q0 25.6-8.704 48.128t-24.576 40.448-36.864 30.208-45.568 16.384l1.024 1.024-17.408 0-4.096 0-4.096 0-675.84 0q-5.12 1.024-16.384 1.024-39.936 0-74.752-15.36t-60.928-41.472-40.96-60.928-14.848-74.752 14.848-74.752 40.96-60.928 60.928-41.472 74.752-15.36l1.024 0q-1.024-8.192-1.024-15.36l0-16.384q0-72.704 27.648-137.216t75.776-112.128 112.128-75.264 136.704-27.648 137.216 27.648 112.64 75.264 75.776 112.128 27.648 137.216q0 37.888-8.192 74.24t-22.528 69.12q5.12-1.024 10.752-1.536t10.752-0.512q27.648 0 52.736 10.752t43.52 29.696 29.184 44.032 10.752 53.76zM665.6 571.392q20.48 0 26.624-4.608t-8.192-22.016q-14.336-18.432-31.744-48.128t-36.352-60.416-38.4-57.344-37.888-38.912q-18.432-13.312-27.136-14.336t-25.088 12.288q-18.432 15.36-35.84 38.912t-35.328 50.176-35.84 52.224-36.352 45.056q-18.432 18.432-13.312 32.768t25.6 14.336l16.384 0q9.216 0 19.968 0.512t20.992 0.512l17.408 0q14.336 1.024 18.432 9.728t4.096 24.064q0 17.408-0.512 30.72t-0.512 25.6-0.512 25.6-0.512 30.72q0 7.168 1.536 15.36t5.632 15.36 12.288 11.776 21.504 4.608l23.552 0q9.216 0 27.648 1.024 24.576 0 28.16-12.288t3.584-38.912q0-23.552 0.512-42.496t0.512-51.712q0-23.552 4.608-36.352t19.968-12.8q11.264 0 32.256-0.512t32.256-0.512z" p-id="2163"></path></svg>
                        </div>
                        <header className={styles.uploadHeader}>点击选择文件进行上传或更新</header>
                        <header className={styles.uploadHeader}>（当前仅支持单个文件）</header>
                        <input type="file" id="excel" accept='.xls,.xlsx' style={{ display: 'none' }} onChange={(e) => this.onChange(e)} />
                    </div>
                    : null}


                {/* 成员表格数据展示 */}
                {this.state.team === '' ? null :
                    <div>
                        <div className={styles.main}>
                            <h1 className={styles.teamRow}>
                                <input id='team' className={styles.teamName} readOnly value={this.state.team} />
                                <div className={styles.buttonDiv1} >
                                    <button className={styles.button} onClick={() => this.onClick()}>
                                        确认并提交
                                    </button>
                                </div>
                                <div className={styles.buttonDiv2} >
                                    <button className={styles.button2} onClick={() => this.onReselect()}>
                                        重新选择
                                    </button>
                                </div>
                            </h1>

                            <div className={styles.leaderRow}>
                                <div style={{ minWidth: '50px', marginLeft: '20px ' }}>
                                    领队:
                                </div>
                                <input id='leader'
                                    readOnly
                                    style={this.state.leader === '' ? { color: 'red' } : { color: '' }}
                                    value={this.state.leader === '' ? '请检查表格' : this.state.leader} />
                                <div style={{ minWidth: '50px' }}>
                                    手机:
                                </div>
                                <input id='phone' readOnly value={this.state.phone} />
                                {/* <div style={{ minWidth: '50px' }}>
                                    微信:
                                </div >
                                <input id='wechat' readOnly value={this.state.wechat} /> */}
                                <div>
                                    QQ:
                                </div>
                                <input id='QQ' readOnly value={this.state.QQ} />
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
                                            <td>
                                                <div style={this.state.debate1 === '3-5条' ? { color: 'red' } : { color: '' }}>
                                                    {this.state.debate1 === '3-5条' ? '请检查表格' : this.state.member1}
                                                </div>
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.grade1}
                                                </div>

                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.school1}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.debate1}
                                                </div>
                                            </td>
                                            

                                        </tr>

                                        {/* 成员2信息 */}
                                        <tr className={styles.tr}>
                                            <td>
                                                成员2
                                            </td>
                                            <td>
                                                {this.state.member2}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.grade2}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.school2}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.debate2}
                                                </div>
                                            </td>
                                            

                                        </tr>

                                        {/* 成员3信息 */}
                                        <tr className={styles.tr}>
                                            <td>
                                                成员3
                                            </td>
                                            <td>
                                                {this.state.member3}
                                            </td>
                                            <td className={styles.grade1}>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.grade3}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.school3}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ width: '90%' }}>
                                                    {this.state.debate3}
                                                </div>
                                            </td>
                                            

                                        </tr>

                                        {/* 成员4信息 */}
                                        {this.state.member4 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员4
                                                </td>
                                                <td>
                                                    {this.state.member4}
                                                </td>
                                                <td className={styles.grade1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.grade4}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.school4}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate4}
                                                    </div>
                                                </td>
                                               

                                            </tr>
                                        }

                                        {/* 成员5信息 */}
                                        {this.state.member5 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员5
                                                </td>
                                                <td>
                                                    {this.state.member5}
                                                </td>
                                                <td className={styles.grade1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.grade5}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.school5}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate5}
                                                    </div>
                                                </td>
                                               

                                            </tr>
                                        }

                                        {/* 成员6信息 */}
                                        {this.state.member6 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员6
                                                </td>
                                                <td>
                                                    {this.state.member6}
                                                </td>
                                                <td className={styles.grade1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.grade6}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.school6}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate6}
                                                    </div>
                                                </td>
                                            </tr>
                                        }

                                        {/* 成员7信息 */}
                                        {this.state.member7 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员7
                                                </td>
                                                <td>
                                                    {this.state.member7}
                                                </td>
                                                <td className={styles.grade1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.grade7}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.school7}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate7}
                                                    </div>
                                                </td>
                                            </tr>
                                        }

                                        {/* 成员8信息 */}
                                        {this.state.member8 === '' ? null :
                                            <tr className={styles.tr}>
                                                <td>
                                                    成员8
                                                </td>
                                                <td>
                                                    {this.state.member8}
                                                </td>
                                                <td className={styles.grade1}>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.grade8}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.school8}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: '90%' }}>
                                                        {this.state.debate8}
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>


                            {
                                this.state.topic1 === '' ?
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
                                                            {this.state.topic1}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解1:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.state.explanation1}
                                                        </div>
                                                    </td>
                                                </tr >
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        辩题2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.state.topic2}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className={styles.tr}>
                                                    <td className={styles.topicTitle}>
                                                        题解2:
                                                    </td>
                                                    <td>
                                                        <div style={{ width: '90%', margin: 'auto' }}>
                                                            {this.state.explanation2}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            }




                        </div>
                    </div>
                }
            </div>
        )
    }
}
