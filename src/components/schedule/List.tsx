import React, { Component, useEffect, useState } from 'react';
import styles from './List.less';
import {
  DatePicker,
  Button,
  Typography,
  Input,
  Toast,
  Divider,
  Select,
  ConfigProvider,
} from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Shanghai');
import { Card } from 'antd';
import { range } from 'lodash-es';
import { IconCopy } from '@douyinfe/semi-icons';
import { getCookie, removeCookie } from '@/utils/auth';
const { Text, Title, Paragraph } = Typography;

export default class List extends Component<any, any> {
  state = {
    id: this.props.id,
    z: this.props.z,
    f: this.props.f,
    topicZ: this.props.topicZ,
    topicF: this.props.topicF,
    topic: this.props.topic,
    time: this.props.time,
    endtime: this.props.endtime,
    schedule: this.props.schedule,
    meeting: this.props.meeting,
    judge1: this.props.judge1,
    judge2: this.props.judge2,
    judge3: this.props.judge3,
    timer: this.props.timer, //计时
    host: this.props.host, //主席
    control: this.props.control, //场控
    teamContact: this.props.teamContact, //队伍负责
    judgeContact: this.props.judgeContact, //评委负责
    type: this.props.type, //赛段
    //以上为数据，一下为前台处理所用缓存
    check: true, //防误删开关,true为不可修改
    url0: '',
    teams: [{}], //队伍选项
    changeId: '', //正反方select选择器的id
    rights: getCookie('rights'),
    urlOpen: false, //计时器链接框
    hide: false,
  };

  //组件挂载获取队名
  componentWillMount() {
    fetch('/api/getteamlist?selected=1')
      .then((response) => response.json())
      .then((data) => {
        var list = data.data.map((item: any) => {
          return {
            value: item['type'] === null ? '' : item['team'],
            label: item['type'] === null ? '' : item['team'],
          };
        });
        this.setState({
          teams: list,
        });
      });
  }

  //更新人员名单
  onChange = (e: any) => {
    this.setState(
      {
        [this.state.changeId]: e,
      },
      () => {
        var data = {
          id: this.state.id,
          [this.state.changeId]: e,
        };
        fetch('/api/changeschedule', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.state = data.data[0];
          });
      },
    );
  };

  //只允许选择0秒
  disabledTime = () => {
    return {
      disabledSeconds: () => range(1, 60),
    };
  };

  //比赛日期更改
  dataConfirm = (...args: (string | string[] | Date | Date[])[]) => {
    var date = args;
    console.log(date);
    var t = date[0].getTime() + 5400000;
    t = new Date(t);
    var end = moment(t).format('YYYY-MM-DD HH:mm:ss');
    this.setState(
      {
        time: date[1],
        endtime: end,
      },
      () => {
        var data = {
          id: this.state.id,
          time: this.state.time,
          endtime: this.state.endtime,
        };
        fetch('/api/changeschedule', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.state = data.data[0];
          });
      },
    );
  };
  dataConfirmEnd = (...args: (string | string[] | Date | Date[])[]) => {
    var date = args;

    this.setState(
      {
        endtime: date[1],
      },
      () => {
        var data = {
          id: this.state.id,
          endtime: this.state.endtime,
        };
        console.log(data);
        fetch('/api/changeschedule', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.state = data.data[0];
          });
      },
    );
  };

  //赛程
  onCascaderChange = (v: any) => {
    this.setState(
      {
        schedule: v.toString(),
        type: v.toString().substr(0, 2),
      },
      () => {
        var data = {
          id: this.state.id,
          schedule: this.state.schedule,
          type: this.state.type,
        };

        fetch('/api/changeschedule', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.state = data.data[0];
          });
      },
    );
  };

  //更新其他信息
  onInputChange = (v: { target: { value: any; id: any } }) => {
    this.setState(
      {
        [v.target.id]: v.target.value,
      },
      () => {
        var data = {
          id: this.state.id,
          [v.target.id]: v.target.value,
        };
        fetch('/api/changeschedule', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            this.state = data.data[0];
          });
      },
    );
  };

  Delete = () => {
    fetch('/api/deletelist?id=' + this.state.id)
      .then((response) => response.json())
      .then((data) => {
        data.msg === 'success'
          ? Toast.success('删除成功')
          : Toast.error('删除失败');
        location.reload();
      });
  };

  //防误触
  onCheckClick = () => {
    console.log(moment.tz.guess());
    if (this.state.rights === '1') {
      this.setState({ check: !this.state.check });
    }
  };

  onHideClick = () => {
    this.setState({ hide: !this.state.hide });
  };

  //计时码生成
  buildCode = () => {
    this.setState({ urlOpen: !this.state.urlOpen });
    // var url0 = "https://new.bianlun.online/#/show?rid=9&nub=false&useb=true&off=false&ringBellTime=30&isDisplayTitle=true&custom=true&water=false&colorCode=%23e0ffff%7C%23ffffff%7C%2328769b%7C%23ffffff%7C%23ffffff%7C%23BF2727%7C%23007A9C" +
    // 全黑
    //var url0 = "https://new.bianlun.online/#/show?rid=9&nub=false&useb=true&off=false&ringBellTime=30&isDisplayTitle=true&custom=true&water=false&color=true&colorCode=%23000000%7C%23000000%7C%23000000%7C%23000000%7C%23000000%7C%23000000%7C%23000000" +
    //全白
    var url0 =
      'https://new.bianlun.online/#/show?rid=27826&nub=false&useb=true&off=false&ringBellTime=30&isDisplayTitle=true&custom=true&water=false&color=true&colorCode=%23ffffff%7C%23ffffff%7C%23ffffff%7C%23ffffff%7C%23ffffff%7C%23BF2727%7C%2390cf5b' +
      '&n0=' +
      encodeURI(this.state.z) +
      '&n1=' +
      encodeURI(this.state.f) +
      '&t0=' +
      encodeURI(this.state.topicZ) +
      '&t1=' +
      encodeURI(this.state.topicF);
    this.setState({ url0: url0 });
  };

  //复制
  Copy = () => {
    var copyDOM = document.getElementById('url')!; //需要复制文字的节点
    var range = document.createRange(); //创建一个range
    window.getSelection()!.removeAllRanges(); //清楚页面中已有的selection
    range.selectNode(copyDOM); // 选中需要复制的节点
    window.getSelection()!.addRange(range); // 执行选中元素
    var successful = document.execCommand('copy'); // 执行 copy 操作
    if (successful) {
      Toast.success('复制成功');
    } else {
      Toast.error('复制失败，请手动复制');
    }
    // 移除选中的元素
    window.getSelection()!.removeAllRanges();
  };

  render() {
    //赛段
    const treeData = [
      {
        label: '预赛',
        value: '预赛',
        children: [
          {
            label: 'A组',
            value: 'A组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
              {
                label: '第三场',
                value: '第三场',
              },
              {
                label: '第四场',
                value: '第四场',
              },
            ],
          },
          {
            label: 'B组',
            value: 'B组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
              {
                label: '第三场',
                value: '第三场',
              },
              {
                label: '第四场',
                value: '第四场',
              },
            ],
          },
          {
            label: 'C组',
            value: 'C组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
              {
                label: '第三场',
                value: '第三场',
              },
              {
                label: '第四场',
                value: '第四场',
              },
            ],
          },
          {
            label: 'D组',
            value: 'D组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
              {
                label: '第三场',
                value: '第三场',
              },
              {
                label: '第四场',
                value: '第四场',
              },
            ],
          },
        ],
      },
      {
        label: '初赛',
        value: '初赛',
        children: [
          {
            label: 'A组',
            value: 'A组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
            ],
          },
          {
            label: 'B组',
            value: 'B组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
            ],
          },
          {
            label: 'C组',
            value: 'C组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
            ],
          },
          {
            label: 'D组',
            value: 'D组',
            children: [
              {
                label: '第一场',
                value: '第一场',
              },
              {
                label: '第二场',
                value: '第二场',
              },
            ],
          },
        ],
      },
      {
        label: '复赛',
        value: '复赛',
        children: [
          {
            label: 'A组',
            value: 'A组',
          },
          {
            label: 'B组',
            value: 'B组',
          },
          {
            label: 'C组',
            value: 'C组',
          },
          {
            label: 'D组',
            value: 'D组',
          },
        ],
      },
      {
        label: '半决赛',
        value: '半决赛',
        children: [
          {
            label: 'AB组',
            value: 'AB组',
          },
          {
            label: 'CD组',
            value: 'CD组',
          },
        ],
      },
      {
        label: '决赛',
        value: '决赛',
      },
    ];

    //背景色
    const color = {
      A: '#E2EEDA',
      B: '#DEEAF6',
      C: '#FFF2CB',
      D: '#FBE4D6',
      一: '#eacdd1',
      二: '#ebe1b2',
    };

    //周几
    const a = ['日', '一', '二', '三', '四', '五', '六'];

    //Input展示的时间格式
    var time = moment(this.state.time).format('M月D日 HH:mm');
    var endtime = moment(this.state.endtime).format('M月D日 HH:mm');

    var now = new Date();
    var hours = now.getHours();
    var greetings =
      '' +
      (hours < 12 ? '上午好' : hours >= 12 && hours < 19 ? '下午好' : '晚上好');

    //给评委发的赛事提醒
    var saishiCopy =
      '各位前辈' +
      greetings +
      '～非常感谢各位前辈执评鲁辩决赛的比赛。\n' +
      '本场赛事信息如下：\n' +
      '时间：' +
      time +
      '\n对阵：' +
      this.state.z +
      ' vs ' +
      this.state.f +
      '\n辩题：' +
      this.state.topic +
      '\n腾讯会议号：' +
      this.state.meeting +
      '\n比赛在第九届世锦赛赛制基础上进行改动，取消了奇袭和评委提问环节。\n' +
      '同时说明以下情况：\n' +
      '1.本次比赛采用一票制，每位评委拥有一票决胜票和一票最佳辩手，前辈们需在述票前投出票型并给出评赛笔记。（发送至群即可）\n' +
      '2.本届比赛无评委商讨环节，因此若有前辈需要先行点评，可在群内沟通。\n' +
      '3.麻烦各位前辈提前10分钟进入会议室进行签到试音。\n' +
      '最后再次感谢各位前辈的参评，祝大家评赛愉快~\n' +
      '烦请各位前辈收到回复，谢谢。';

    return (
      <div
        className={styles.main}
        style={
          this.state.schedule.substr(0, 2) === '决赛'
            ? { backgroundColor: '	#FAFAD2' }
            : this.state.schedule.substr(0, 2) === '半决'
            ? { backgroundColor: '#FFF0F5' }
            : {
                backgroundColor:
                  color[this.state.schedule.substr(3, 1) as keyof typeof color],
              }
        }
      >
        {/*第一行，放场次信息、会议号 */}
        <div className={styles.firstRow}>
          <Input
            className={styles.meeting}
            id="schedule"
            insetLabel={
              <span
                style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
              >
                场次
              </span>
            }
            readonly={this.state.check}
            value={this.state.schedule.replace(/\,/g, '-')}
            style={{ width: 210 }}
          />

          <div className={styles.icon} onClick={() => this.onCheckClick()}>
            {this.state.check === true ? (
              //红标，禁止修改状态
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2302"
                width="32"
                height="32"
              >
                <path
                  d="M504.109851 16.453128c-278.332339 0-503.966321 225.632974-503.966321 503.966321S225.776505 1024.384762 504.109851 1024.384762s503.966321-225.632974 503.966321-503.966321S782.44219 16.453128 504.109851 16.453128zM242.706054 566.655409l0.04734-94.679771 525.432441 0-0.017123 94.679771L242.706054 566.655409z"
                  p-id="2303"
                  fill="#d81e06"
                ></path>
              </svg>
            ) : (
              //绿标，开启修改
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3552"
                width="34"
                height="34"
              >
                <path
                  d="M852.8 261.6l2.3 1.2-2.3-1.2z"
                  fill="#68BB8D"
                  p-id="3553"
                ></path>
                <path
                  d="M514.2 99.9c-228.5 0-413.7 185.2-413.7 413.7s185.2 413.7 413.7 413.7S927.8 742 927.8 513.5 742.5 99.9 514.2 99.9zM712 430.7L553 587l-77 75.3c-0.3 0.4-0.7 0.8-1.2 1.3-0.6 0.6-1.3 1.2-2 1.8-4.8 4.6-11.1 7.1-17.8 7.1h-1.1c-7 0-13.5-2.6-18.3-7.4-0.7-0.6-1.3-1.2-1.9-1.7-0.4-0.4-0.7-0.7-1-1.1L304.3 533.9c-10.4-10.4-9.7-28 1.5-39.2 5.7-5.7 13.3-8.9 21-8.9 7 0 13.5 2.6 18.3 7.4l109.4 109.4 58.1-56.8 159.1-156.3c4.8-4.7 11.2-7.2 18.1-7.2 7.8 0 15.5 3.3 21.2 9.1 11 11.4 11.6 29 1 39.3z"
                  fill="#68BB8D"
                  p-id="3554"
                ></path>
              </svg>
            )}
          </div>

          <div className={styles.firstRowRight}>
            <Input
              className={styles.meeting}
              id="meeting"
              insetLabel={
                <span
                  style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                >
                  会议号
                </span>
              }
              readonly={this.state.check}
              value={this.state.meeting}
              style={
                this.state.rights === '1' ? { width: 190 } : { width: 210 }
              }
              onChange={(e, v) => this.onInputChange(v)}
            />
            {this.state.rights === '1' ? (
              <Paragraph copyable={{ content: saishiCopy }}></Paragraph>
            ) : (
              ''
            )}
          </div>
        </div>

        {/*第二行，放时间信息 */}
        <ConfigProvider timeZone={'GMT+08:00'}>
          {/* semi的时区设置 */}
          {this.state.rights === '1' && this.state.check === false ? (
            <div className={styles.firstRow}>
              <DatePicker
                type="dateTime"
                insetLabel={
                  <span
                    style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                  >
                    时间
                  </span>
                }
                value={this.state.time}
                style={{ width: 210, marginRight: '5%' }}
                timePickerOpts={{
                  scrollItemProps: { cycled: false },
                }}
                needConfirm={true}
                disabledTime={this.disabledTime}
                onConfirm={(...args) => this.dataConfirm(...args)}
                onCancel={(...args) => {
                  console.log('Canceled: ', ...args);
                }}
              ></DatePicker>

              <Input
                className={styles.meeting}
                id="schedule"
                readonly
                value={
                  this.state.time === null
                    ? ''
                    : '周' + a[moment(this.state.time).day()]
                }
                style={{ width: 60 }}
              />

              <DatePicker
                type="dateTime"
                value={this.state.endtime}
                style={{ width: 210, marginLeft: '5%' }}
                timePickerOpts={{
                  scrollItemProps: { cycled: false },
                }}
                needConfirm={true}
                disabledTime={this.disabledTime}
                onConfirm={(...args) => this.dataConfirmEnd(...args)}
                onCancel={(...args) => {
                  console.log('Canceled: ', ...args);
                }}
              ></DatePicker>
            </div>
          ) : (
            //非管理员不得更改
            <div className={styles.firstRow}>
              <Input
                insetLabel={
                  <span
                    style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                  >
                    时间
                  </span>
                }
                value={time}
                style={{ width: 210, marginRight: '5%' }}
                readonly
              ></Input>

              <Input
                className={styles.meeting}
                id="schedule"
                readonly
                value={
                  this.state.time === null
                    ? ''
                    : '周' + a[moment(this.state.time).day()]
                }
                style={{ width: 60 }}
              />

              <Input
                type="dateTime"
                value={endtime}
                style={{ width: 210, marginLeft: '5%' }}
                readonly
              ></Input>
            </div>
          )}
        </ConfigProvider>

        {/*第三行，放辩题信息 */}
        <div className={styles.firstRow}>
          <Input
            className={styles.topic}
            id="topic"
            readonly={this.state.check}
            insetLabel={
              <span
                style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
              >
                辩题
              </span>
            }
            style={{ fontSize: '24px', width: '100%' }}
            placeholder="请填写"
            value={this.state.topic}
            onChange={(e, v) => this.onInputChange(v)}
          />
        </div>

        {/*第四行，放正反方信息 */}
        {this.state.rights === '1' && this.state.check === false ? (
          <div className={styles.firstRow}>
            <Select
              filter
              placeholder="请选择"
              id="z"
              insetLabel={
                <span
                  style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                >
                  正方
                </span>
              }
              style={{ width: '44%' }}
              value={this.state.z}
              optionList={this.state.teams}
              onChange={(e) => this.onChange(e)}
              onFocus={() => this.setState({ changeId: 'z' })}
            ></Select>

            <div className={styles.icon} onClick={() => this.onHideClick()}>
              {this.state.hide === false ? (
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8042"
                  id="mx_n_1657097586450"
                  data-spm-anchor-id="a313x.7781069.0.i25"
                  width="36"
                  height="36"
                >
                  <path
                    d="M448 608L608 192h384l-64 160h-192l-64 128h192l-192 416h-320l64-160H576l64-128H448z"
                    fill="#F8B304"
                    p-id="8043"
                  ></path>
                  <path
                    d="M672 928h-320c-12.8 0-19.2-6.4-25.6-12.8-6.4-12.8-6.4-19.2-6.4-32l64-160c6.4-12.8 19.2-19.2 32-19.2h140.8l32-64H448c-12.8 0-19.2-6.4-25.6-12.8s-6.4-19.2-6.4-32L576 179.2c6.4-12.8 19.2-19.2 32-19.2h384c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 6.4 32l-64 160c-6.4 12.8-19.2 19.2-32 19.2h-172.8l-32 64h140.8c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 0 32l-192 416c0 12.8-12.8 19.2-25.6 19.2z m-275.2-64h249.6L812.8 512h-140.8c-12.8 0-19.2-6.4-25.6-12.8-6.4-6.4-6.4-19.2 0-32l64-128c0-12.8 12.8-19.2 25.6-19.2h172.8l38.4-96h-320L492.8 576H640c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-64 128c0 12.8-12.8 19.2-25.6 19.2H435.2l-38.4 96z"
                    p-id="8044"
                  ></path>
                  <path
                    d="M256 192H64l230.4 556.8c19.2 51.2 96 51.2 121.6 0L640 192H448L352 480 256 192z"
                    fill="#AECFFF"
                    p-id="8045"
                  ></path>
                  <path
                    d="M352 825.6c-38.4 0-76.8-25.6-89.6-57.6L32 204.8c-6.4-12.8 0-19.2 0-32 12.8-6.4 19.2-12.8 32-12.8h192c12.8 0 25.6 6.4 32 19.2l64 198.4 64-198.4c6.4-12.8 19.2-19.2 32-19.2h192c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-230.4 556.8c-6.4 38.4-44.8 64-83.2 64zM108.8 224l211.2 512c6.4 19.2 25.6 19.2 32 19.2s19.2 0 32-19.2l211.2-512H473.6L384 492.8c-12.8 25.6-51.2 25.6-64 0L230.4 224H108.8z"
                    p-id="8046"
                  ></path>
                </svg>
              ) : (
                //彩色显示评委，灰色隐藏评委
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3254"
                  id="mx_n_1658319437673"
                  width="36"
                  height="36"
                >
                  <path
                    d="M448 608L608 192h384l-64 160h-192l-64 128h192l-192 416h-320l64-160H576l64-128H448z"
                    fill="#e6e6e6"
                    p-id="3255"
                    data-spm-anchor-id="a313x.7781069.0.i12"
                  ></path>
                  <path
                    d="M672 928h-320c-12.8 0-19.2-6.4-25.6-12.8-6.4-12.8-6.4-19.2-6.4-32l64-160c6.4-12.8 19.2-19.2 32-19.2h140.8l32-64H448c-12.8 0-19.2-6.4-25.6-12.8s-6.4-19.2-6.4-32L576 179.2c6.4-12.8 19.2-19.2 32-19.2h384c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 6.4 32l-64 160c-6.4 12.8-19.2 19.2-32 19.2h-172.8l-32 64h140.8c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 0 32l-192 416c0 12.8-12.8 19.2-25.6 19.2z m-275.2-64h249.6L812.8 512h-140.8c-12.8 0-19.2-6.4-25.6-12.8-6.4-6.4-6.4-19.2 0-32l64-128c0-12.8 12.8-19.2 25.6-19.2h172.8l38.4-96h-320L492.8 576H640c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-64 128c0 12.8-12.8 19.2-25.6 19.2H435.2l-38.4 96z"
                    p-id="3256"
                  ></path>
                  <path
                    d="M256 192H64l230.4 556.8c19.2 51.2 96 51.2 121.6 0L640 192H448L352 480 256 192z"
                    fill="#e6e6e6"
                    p-id="3257"
                    data-spm-anchor-id="a313x.7781069.0.i11"
                  ></path>
                  <path
                    d="M352 825.6c-38.4 0-76.8-25.6-89.6-57.6L32 204.8c-6.4-12.8 0-19.2 0-32 12.8-6.4 19.2-12.8 32-12.8h192c12.8 0 25.6 6.4 32 19.2l64 198.4 64-198.4c6.4-12.8 19.2-19.2 32-19.2h192c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-230.4 556.8c-6.4 38.4-44.8 64-83.2 64zM108.8 224l211.2 512c6.4 19.2 25.6 19.2 32 19.2s19.2 0 32-19.2l211.2-512H473.6L384 492.8c-12.8 25.6-51.2 25.6-64 0L230.4 224H108.8z"
                    p-id="3258"
                  ></path>
                </svg>
              )}
            </div>

            <Select
              filter
              placeholder="请选择"
              id="f"
              insetLabel={
                <span
                  style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                >
                  反方
                </span>
              }
              style={{ width: '44%' }}
              value={this.state.f}
              optionList={this.state.teams}
              onChange={(e) => this.onChange(e)}
              onFocus={() => this.setState({ changeId: 'f' })}
            ></Select>
          </div>
        ) : (
          <div className={styles.firstRow}>
            <Input
              placeholder="请选择"
              id="z"
              insetLabel={
                <span
                  style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                >
                  正方
                </span>
              }
              style={{ width: '44%' }}
              readonly
              value={this.state.z}
            ></Input>

            <div
              className={styles.icon}
              //onClick={() => this.onHideClick()}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8042"
                id="mx_n_1657097586450"
                data-spm-anchor-id="a313x.7781069.0.i25"
                width="36"
                height="36"
              >
                <path
                  d="M448 608L608 192h384l-64 160h-192l-64 128h192l-192 416h-320l64-160H576l64-128H448z"
                  fill="#F8B304"
                  p-id="8043"
                ></path>
                <path
                  d="M672 928h-320c-12.8 0-19.2-6.4-25.6-12.8-6.4-12.8-6.4-19.2-6.4-32l64-160c6.4-12.8 19.2-19.2 32-19.2h140.8l32-64H448c-12.8 0-19.2-6.4-25.6-12.8s-6.4-19.2-6.4-32L576 179.2c6.4-12.8 19.2-19.2 32-19.2h384c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 6.4 32l-64 160c-6.4 12.8-19.2 19.2-32 19.2h-172.8l-32 64h140.8c12.8 0 19.2 6.4 25.6 12.8s6.4 19.2 0 32l-192 416c0 12.8-12.8 19.2-25.6 19.2z m-275.2-64h249.6L812.8 512h-140.8c-12.8 0-19.2-6.4-25.6-12.8-6.4-6.4-6.4-19.2 0-32l64-128c0-12.8 12.8-19.2 25.6-19.2h172.8l38.4-96h-320L492.8 576H640c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-64 128c0 12.8-12.8 19.2-25.6 19.2H435.2l-38.4 96z"
                  p-id="8044"
                ></path>
                <path
                  d="M256 192H64l230.4 556.8c19.2 51.2 96 51.2 121.6 0L640 192H448L352 480 256 192z"
                  fill="#AECFFF"
                  p-id="8045"
                ></path>
                <path
                  d="M352 825.6c-38.4 0-76.8-25.6-89.6-57.6L32 204.8c-6.4-12.8 0-19.2 0-32 12.8-6.4 19.2-12.8 32-12.8h192c12.8 0 25.6 6.4 32 19.2l64 198.4 64-198.4c6.4-12.8 19.2-19.2 32-19.2h192c12.8 0 19.2 6.4 25.6 12.8 6.4 6.4 6.4 19.2 0 32l-230.4 556.8c-6.4 38.4-44.8 64-83.2 64zM108.8 224l211.2 512c6.4 19.2 25.6 19.2 32 19.2s19.2 0 32-19.2l211.2-512H473.6L384 492.8c-12.8 25.6-51.2 25.6-64 0L230.4 224H108.8z"
                  p-id="8046"
                ></path>
              </svg>
            </div>
            <Input
              placeholder="请选择"
              id="f"
              insetLabel={
                <span
                  style={{ marginLeft: 5, color: 'var(--semi-color-text-2)' }}
                >
                  反方
                </span>
              }
              style={{ width: '44%' }}
              value={this.state.f}
              readonly
            ></Input>
          </div>
        )}

        {/*第五行，放评委信息 */}
        {this.state.hide === false ? (
          <div className={styles.firstRow}>
            <Input
              className={styles.judge1}
              id="judge1"
              readonly={this.state.check}
              placeholder="请填写"
              value={this.state.judge1}
              onChange={(e, v) => this.onInputChange(v)}
            />

            <Input
              className={styles.judge2}
              id="judge2"
              readonly={this.state.check}
              placeholder="请填写"
              value={this.state.judge2}
              onChange={(e, v) => this.onInputChange(v)}
            />

            <Input
              className={styles.judge3}
              id="judge3"
              readonly={this.state.check}
              placeholder="请填写"
              value={this.state.judge3}
              onChange={(e, v) => this.onInputChange(v)}
            />
          </div>
        ) : (
          ''
        )}

        {
          //工作人员页显示
          this.props.selectedKey === 'work' ? (
            <div className={styles.work}>
              <Divider />
              {/* 第六行，正反方辩题，用于生成计时码 */}
              <div className={styles.firstRow}>
                <Input
                  className={styles.topicZ}
                  id="topicZ"
                  value={this.state.topicZ}
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      正方辩题
                    </span>
                  }
                  placeholder="请填写"
                  onChange={(e, v) => this.onInputChange(v)}
                />

                <Input
                  className={styles.topicF}
                  id="topicF"
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      反方辩题
                    </span>
                  }
                  placeholder="请填写"
                  value={this.state.topicF}
                  onChange={(e, v) => this.onInputChange(v)}
                />
              </div>

              {/* 第七、八行，工作人员信息*/}
              <div className={styles.firstRow}>
                <Input
                  className={styles.judge1}
                  id="host"
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      主席
                    </span>
                  }
                  placeholder="请填写"
                  value={this.state.host}
                  onChange={(e, v) => this.onInputChange(v)}
                />

                <Input
                  className={styles.judge2}
                  id="timer"
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      计时
                    </span>
                  }
                  placeholder="请填写"
                  value={this.state.timer}
                  onChange={(e, v) => this.onInputChange(v)}
                />

                <Input
                  className={styles.judge3}
                  id="control"
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      场控
                    </span>
                  }
                  placeholder="请填写"
                  value={this.state.control}
                  onChange={(e, v) => this.onInputChange(v)}
                />
              </div>

              {/* 第七、八行，工作人员信息*/}
              <div className={styles.firstRow}>
                <Input
                  className={styles.judge1}
                  id="teamContact"
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      队伍负责
                    </span>
                  }
                  placeholder="请填写"
                  value={this.state.teamContact}
                  onChange={(e, v) => this.onInputChange(v)}
                />

                <Button
                  type="secondary"
                  disabled={this.state.topicZ === null || '' ? true : false}
                  onClick={() => this.buildCode()}
                >
                  生成计时链接
                </Button>

                <Input
                  className={styles.judge2}
                  id="judgeContact"
                  insetLabel={
                    <span
                      style={{
                        marginLeft: 5,
                        color: 'var(--semi-color-text-2)',
                      }}
                    >
                      评委负责
                    </span>
                  }
                  placeholder="请填写"
                  value={this.state.judgeContact}
                  onChange={(e, v) => this.onInputChange(v)}
                />
              </div>

              {this.state.urlOpen ? (
                <div className={styles.firstRow}>
                  <Card
                    title="点击右侧复制，点击链接跳转"
                    extra={
                      <IconCopy
                        style={{ cursor: 'pointer', color: '#40a9ff' }}
                        onClick={() => this.Copy()}
                      />
                    }
                    style={{ width: '100%' }}
                  >
                    <a id="url" href={this.state.url0} target="_blank">
                      {this.state.url0}
                    </a>
                  </Card>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )
        }
      </div>
    );
  }
}
