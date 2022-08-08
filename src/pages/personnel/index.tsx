import React, { useEffect, useState } from 'react'
import Header from '@/components/header/Header';
import { Typography, Toast, Nav } from '@douyinfe/semi-ui';
import Icon, { IconPlusCircle } from '@douyinfe/semi-icons';
import { Pagination } from 'antd'
import styles from './index.less'
import PersonnelList from '@/components/personnelList/PersonnelList';
import { getCookie } from '@/utils/auth';
import { history } from 'umi'


export default function index() {
    const { Title } = Typography;
    const [listData, setListData] = useState([])
    const [type, setType] = useState(['初赛'])
    const [page, setPge] = useState(1)
    const [total, setTotal] = useState()


    useEffect(() => {
        if (getCookie('rights') === '0') {
            Toast.warning('无权限')
            history.push('/statistics')
        } else {
            setPge(1)
            fetch('/api/schedule?type=' + type + '&page=' + page + '&size=4').then(
                response => response.json()
            ).then(
                data => {
                    setListData(data.data)
                    setTotal(data.total['COUNT(*)']);
                }
            )
        }
    },
        []
    )


    //选择赛程
    const onClickType = (data: any) => {
        setType([data.itemKey])
        setPge(1)
        fetch('/api/schedule?type=' + data.itemKey + '&page=1&size=4').then(
            response => response.json()
        ).then(
            data => {
                setListData(data.data);
                setTotal(data.total['COUNT(*)']);
            }
        )
    }

    const onChange = (e: number) => {
        setPge(e)
        fetch('/api/schedule?type=' + type + '&page=' + e + '&size=4').then(
            response => response.json()
        ).then(
            data => {
                setListData(data.data);
            }
        )
    }

    const t24 = [
        // { itemKey: '预赛', text: '预赛', icon:<Icon svg={<YusaiIcon />}size="large" /> },
        { itemKey: '初赛', text: '初赛', icon: <Icon svg={<ChusaiIcon />} size="large" /> },
        { itemKey: '复赛', text: '复赛', icon: <Icon svg={<FusaiIcon />} size="large" /> },
        { itemKey: '半决', text: '半决赛', icon: <Icon svg={<BanjueIcon />} size="large" /> },
        { itemKey: '决赛', text: '决赛', icon: <Icon svg={<JuesaiIcon />} size="large" /> },
    ]

    const t32 =[
        { itemKey: '预赛', text: '预赛', icon:<Icon svg={<YusaiIcon />}size="large" /> },
        { itemKey: '初赛', text: '初赛', icon: <Icon svg={<ChusaiIcon />} size="large" /> },
        { itemKey: '复赛', text: '复赛', icon: <Icon svg={<FusaiIcon />} size="large" /> },
        //{ itemKey: '半决', text: '半决赛', icon: <Icon svg={<BanjueIcon />} size="large" /> },
        { itemKey: '决赛', text: '决赛', icon: <Icon svg={<JuesaiIcon />} size="large" /> },
    ]


    return (
        <div style={{ height: '100hv' }}>
            <div>
                <Header selectedKeys={['personnel']}/>
            </div>
            <div className={styles.main}>
                <div className={styles.left}>
                    <Nav
                        bodyStyle={{ height: '100%' }}
                        items={t24}
                        selectedKeys={type}
                        defaultIsCollapsed={true}
                        footer={{
                            collapseButton: true,
                        }}
                        onClick={data => onClickType(data)}
                    />
                </div>
                <div className={styles.right}>
                    <div className={styles.content}>
                        {listData.map((item) => {
                            return <PersonnelList key={item['id']} {...item} selectedKey={'personnel'} />
                        })}
                    </div>
                    <Pagination total={total} pageSize={4} current={page} onChange={(e) => onChange(e)} style={{ marginBottom: '15px', marginTop: '15px' }} hideOnSinglePage></Pagination>
                </div>
            </div>

        </div >
    )
}

export function YusaiIcon() {
    return <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6679" width="24" height="24"><path d="M527.507 78.68c-236.322 0-428.588 192.277-428.588 428.624 0 236.299 192.264 428.588 428.588 428.588 236.35 0 428.614-192.288 428.614-428.588C956.12 270.957 763.856 78.68 527.507 78.68zM527.507 880.724c-205.922 0-373.441-167.517-373.441-373.419 0-205.935 167.518-373.465 373.441-373.465s373.467 167.532 373.467 373.465C900.974 713.205 733.431 880.724 527.507 880.724z" p-id="6680"></path><path d="M508.656 631.675 390 631.675l106.334-142.933c15.916-19.576 23.357-42.543 22.128-68.38-4.902-52.753-35.33-81.341-90.771-85.013-65.929 3.66-101.833 38.924-106.687 105.016 0 22.981 12.195 27.81 22.403 27.81 13.477 0 20.594-7.142 20.594-20.505 2.337-45.524 20.917-68.783 56.447-71.109 32.236 2.314 48.503 17.941 49.634 47.648 0 19.576-7.644 38.32-22.829 55.882l-113.074 152.55c-6.437 7.706-9.555 14.144-9.555 19.953 0.931 8.446 5.859 18.53 24.165 18.53l160.015 0 0.177-0.025c10.738-1.32 17.148-8.348 18.481-20.933C526.08 639.455 519.72 633.069 508.656 631.675z" p-id="6681"></path><path d="M725.097 547.265l-18.884 0L706.213 372.111c0-24.051-11.466-36.773-33.165-36.773-14.057 0-25.671 6.424-34.624 19.247L523.542 544.863c-7.568 11.328-11.215 19.45-11.215 24.83 0 7.756 3.57 17.022 20.617 17.022l128.462 0 0 63.79c0 9.404 3.872 20.619 22.379 20.619 18.53 0 22.428-11.215 22.428-20.619l0-63.79 19.209-0.025c10.762-1.318 17.176-8.349 18.508-20.933C742.57 555.034 736.184 548.648 725.097 547.265zM661.406 547.265l-91.575 0 91.575-159.337L661.406 547.265z" p-id="6682"></path></svg>
}
export function ChusaiIcon() {
    return <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6679" width="24" height="24"><path d="M527.507 78.68c-236.322 0-428.588 192.277-428.588 428.624 0 236.299 192.264 428.588 428.588 428.588 236.35 0 428.614-192.288 428.614-428.588C956.12 270.957 763.856 78.68 527.507 78.68zM527.507 880.724c-205.922 0-373.441-167.517-373.441-373.419 0-205.935 167.518-373.465 373.441-373.465s373.467 167.532 373.467 373.465C900.974 713.205 733.431 880.724 527.507 880.724z" p-id="6680"></path><path d="M508.656 631.675 390 631.675l106.334-142.933c15.916-19.576 23.357-42.543 22.128-68.38-4.902-52.753-35.33-81.341-90.771-85.013-65.929 3.66-101.833 38.924-106.687 105.016 0 22.981 12.195 27.81 22.403 27.81 13.477 0 20.594-7.142 20.594-20.505 2.337-45.524 20.917-68.783 56.447-71.109 32.236 2.314 48.503 17.941 49.634 47.648 0 19.576-7.644 38.32-22.829 55.882l-113.074 152.55c-6.437 7.706-9.555 14.144-9.555 19.953 0.931 8.446 5.859 18.53 24.165 18.53l160.015 0 0.177-0.025c10.738-1.32 17.148-8.348 18.481-20.933C526.08 639.455 519.72 633.069 508.656 631.675z" p-id="6681"></path><path d="M725.097 547.265l-18.884 0L706.213 372.111c0-24.051-11.466-36.773-33.165-36.773-14.057 0-25.671 6.424-34.624 19.247L523.542 544.863c-7.568 11.328-11.215 19.45-11.215 24.83 0 7.756 3.57 17.022 20.617 17.022l128.462 0 0 63.79c0 9.404 3.872 20.619 22.379 20.619 18.53 0 22.428-11.215 22.428-20.619l0-63.79 19.209-0.025c10.762-1.318 17.176-8.349 18.508-20.933C742.57 555.034 736.184 548.648 725.097 547.265zM661.406 547.265l-91.575 0 91.575-159.337L661.406 547.265z" p-id="6682"></path></svg>
}
export function FusaiIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7963" width="24" height="24"><path d="M489.511311 326.023308" p-id="7964"></path><path d="M512.001535 61.372789c-248.877277 0-450.629257 201.727421-450.629257 450.625164 0 248.868067 201.75198 450.630281 450.629257 450.630281 248.873184 0 450.625164-201.762213 450.625164-450.630281C962.621583 263.095094 760.874719 61.372789 512.001535 61.372789L512.001535 61.372789zM512.001535 926.574087c-228.965785 0-414.576133-185.631838-414.576133-414.574087 0-228.970902 185.610348-414.574087 414.576133-414.574087 228.961692 0 414.569994 185.603185 414.569994 414.574087C926.571529 740.942249 740.963227 926.574087 512.001535 926.574087L512.001535 926.574087zM284.046776 667.923212l82.226746 0L366.273523 372.402615 302.984081 372.402615l0-19.435655c29.402657-4.983501 51.828412-12.957103 69.270666-22.924105l23.422456 0 0 337.88138 75.748195 0 0 25.415856L284.046776 693.340091 284.046776 667.923212zM527.236518 675.398464c123.092479-106.147552 171.930791-180.901093 171.930791-246.682285 0-45.349861-22.923082-80.732719-74.254168-80.732719-31.397081 0-59.802014 19.435655-80.733743 45.349861l-18.438954-17.442254c27.409257-30.399357 58.306964-52.326762 102.161774-52.326762 63.290465 0 100.666724 41.36306 100.666724 104.155175 0 76.247568-58.805314 152.495136-155.485237 242.696508 19.934005-1.49505 40.865733-2.990101 59.802014-2.990101l113.125477 0 0 25.913183L527.236518 693.339068 527.236518 675.398464z" p-id="7965"></path></svg>
}
export function BanjueIcon() {
    return  <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8925" width="24" height="24"><path d="M745.982 226.6235l-81.6804 28.5757c-21.7917-95.2801-73.5201-141.568-155.1831-138.8483-136.1439 2.7197-204.2081 115.712-204.2081 338.9757 43.5517-73.5037 114.3521-111.6324 212.3674-114.3521 152.4644 8.1603 234.1437 96.6564 245.0401 265.4556-10.8964 171.5364-96.6564 264.0957-257.2954 277.7119-193.3117 0-289.9517-132.0479-289.9517-396.1436 2.7197-296.7675 102.0959-445.1676 298.1274-445.1676C632.9897 48.2877 710.5905 109.5516 745.982 226.6235zM308.991 561.5043c2.7197 166.0805 68.0643 251.8559 196.0325 257.2964 103.4557-5.4395 157.9192-73.5201 163.3597-204.2081-2.7197-130.688-57.1843-197.3924-163.3597-200.1121C398.847 419.9363 333.5025 468.9439 308.991 561.5043z" p-id="8926"></path></svg>
}
export function JuesaiIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10725" width="24" height="24"><path d="M758.2382 647.2643c-8.1756 149.76-98.0316 228.7043-269.5516 236.8799-152.4797 0-245.0401-72.1439-277.7119-216.448l93.9356-24.5125c16.3359 111.6324 74.88 167.4404 175.616 167.4404 122.5114 0 183.7752-57.1679 183.7752-171.52-8.1756-98.0163-70.8004-149.7436-187.8559-155.1995-38.1276 0-62.6401 0-73.5201 0l0-73.503744c10.88 0 24.4961 0 40.8484 0 117.0555-2.7197 178.3194-54.4481 183.7752-155.1995-5.4559-87.1199-51.7437-132.0479-138.8636-134.7676-92.5757 2.7197-148.3837 54.4645-167.4404 155.1995l-89.8396-28.5921C264.0783 113.6323 348.4785 45.568 484.607 42.8319c155.1831 5.4559 235.5036 76.2399 240.9595 212.3684-2.7197 89.856-49.0076 151.1199-138.8636 183.7916C695.5981 471.6636 752.7823 541.0877 758.2382 647.2643z" p-id="10726"></path></svg>
}