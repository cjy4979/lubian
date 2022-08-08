import { Link, history } from 'umi';
import styles from './index.less';
import Logo from '@/images/lubianLogo.png'
import { Typography } from '@douyinfe/semi-ui';
const { Title, Text } = Typography;

export default function IndexPage() {
  return (
    <div className={styles.bg}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" style={{ height: "100%" }} />
        </div>
        <div className={styles.headerFoot}>
          <button className={styles.button}>
            <Link className={styles.link} to='/statistics' > 赛事管理</Link>
          </button>
          <button className={styles.button}>
            <Link className={styles.link} to='/vj/questionnaire'> 赛果填写</Link>
          </button>
        </div>


      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          第二届鲁辩齐思辩论赛
        </div>
        <div className={styles.drop}
          onClick={() => {
            history.push('/login')
          }
            //window.open('https://space.bilibili.com/12387501/channel/collectiondetail?sid=304298')
          }
        >
          <img  className={styles.peticon} src={Logo} alt="logo"/>
        </div>


      </div>
      <div className={styles.footer}>
        <div style={{color:'#cea265'}}>COPYRIGHT © 2022 jiyu.Chen, All rights Reserved.</div>
      </div>


    </div>
  );
}
