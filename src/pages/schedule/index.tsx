import React, { useEffect, useState } from 'react'
import List from '@/components/schedule/List'
import Header from '@/components/header/Header';
import './index.css'
import { Typography,  Nav, Toast } from '@douyinfe/semi-ui';
import Icon, { IconPlusCircle } from '@douyinfe/semi-icons';
import {Pagination} from'antd'
import { getCookie} from '@/utils/auth';
import { history } from 'umi'


export default function index() {
    const { Title } = Typography;
    const [listData, setListData] = useState([])
    const [type, setType] = useState(['预赛'])
    const [page,setPge]=useState(1)
    const [total,setTotal]=useState()
    


    useEffect(() => {
        if(getCookie('rights') === '0'){
            Toast.warning('无权限')
            history.push('./statistics')
        }else{
            setPge(1)
            fetch('/api/schedule?type=' + type+'&page='+page+'&size=4').then(
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
        fetch('/api/schedule?type=' + data.itemKey+'&page=1&size=4').then(
            response => response.json()
        ).then(
            data => {
                setListData(data.data);
                setTotal(data.total['COUNT(*)']);
            }
        )
    }

    const onChange =(e:number) =>{
        setPge(e)

        fetch('/api/schedule?type=' + type+'&page='+e+'&size=4').then(
            response => response.json()
        ).then(
            data => {
                setListData(data.data);
            }
        )
    }

    return (
        <div style={{ height: '100hv' }}>
            <div>
                <Header selectedKeys={['Schedule']} />
            </div>
            <div className='main'>
                <div className='left'>
                    <Nav
                        bodyStyle={{ height: '100%' }}
                        items={[
                            { itemKey: '预赛', text: '预赛', icon: <Icon svg={<YusaiIcon />} size="large" /> },
                            { itemKey: '初赛', text: '初赛', icon: <Icon svg={<ChusaiIcon />} size="large" /> },
                            { itemKey: '复赛', text: '复赛', icon: <Icon svg={<FusaiIcon />} size="large" /> },
                            { itemKey: '半决', text: '半决赛', icon: <Icon svg={<BanjueIcon />} size="large" /> },
                            { itemKey: '决赛', text: '决赛', icon: <Icon svg={<JuesaiIcon />} size="large" /> },
                        ]}
                        selectedKeys={type}
                        defaultIsCollapsed={true}
                        footer={{
                            collapseButton: true,
                        }}
                        onClick={data => onClickType(data)}
                    />
                </div>
                <div className='right'>
                    <div className='content'>
                        {listData.map((item) => {
                            return <List key={item['id']} {...item} />
                        })}
                    </div>
                    <Pagination total={total} pageSize={4} current={page} onChange={(e)=>onChange(e)} style={{ marginTop: '5%' }} hideOnSinglePage></Pagination>
                </div>
            </div>

        </div >
    )
}

export function YusaiIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11150" width="24" height="24"><path d="M523.604092 436.813576h-1.039515c-69.104485 0.620606-143.778909 63.379394-224.038788 188.338424a119.575273 119.575273 0 0 0 19.549091 152.560485l13.203394 12.179394a97.512727 97.512727 0 0 0 66.218667 25.863757c19.502545 0 39.098182-5.833697 55.994181-17.671757l6.981819-4.887273a100.181333 100.181333 0 0 1 57.530181-18.121697 100.227879 100.227879 0 0 1 57.344 17.997576l4.499394 3.13406a96.814545 96.814545 0 0 0 55.420122 17.392485 96.907636 96.907636 0 0 0 63.58109-23.722666l18.835394-16.290909a121.37503 121.37503 0 0 0 22.698667-157.137455c-76.675879-119.77697-148.914424-179.634424-216.777697-179.634424m0 49.912242c21.845333 0 46.483394 11.23297 73.24703 33.419637 31.976727 26.499879 66.125576 67.956364 101.500122 123.190303a71.478303 71.478303 0 0 1-13.374061 92.547878l-18.773333 16.259879-0.031031 0.015515v0.015515a47.166061 47.166061 0 0 1-57.809454 3.072l-4.499394-3.118545a149.581576 149.581576 0 0 0-85.860849-26.965333 149.550545 149.550545 0 0 0-86.140121 27.151515h-0.015515l-0.03103 0.015515-6.950788 4.871758a47.476364 47.476364 0 0 1-27.368727 8.641939c-12.039758 0-23.552-4.499394-32.380122-12.629333l-13.218909-12.194909a69.554424 69.554424 0 0 1-11.403636-88.901819c37.236364-57.949091 73.014303-101.546667 106.340848-129.551515 28.004848-23.536485 53.573818-35.591758 76.024243-35.84h0.744727m-285.944242-97.497212c-19.254303 0-37.143273 6.950788-49.772606 19.316364-25.956848 25.444848-21.286788 77.001697 5.740606 110.855757 14.723879 18.432 35.995152 28.796121 57.91806 28.796121 18.323394 0 37.112242-7.245576 52.922182-23.055515 34.753939-34.753939 30.952727-77.187879-5.740606-110.855757-18.819879-17.314909-40.711758-25.05697-61.067636-25.05697m550.865454-13.017212c-28.547879 0-57.716364 17.501091-76.489697 42.511515-25.165576 33.481697-21.47297 80.554667 25.010425 108.125091l0.015515 0.015515c13.451636 7.974788 26.220606 11.450182 38.074181 11.450182 29.168485 0 52.720485-20.976485 66.901334-47.522909 19.93697-37.360485 11.015758-90.701576-25.05697-108.140606a64.744727 64.744727 0 0 0-28.454788-6.438788M389.180819 194.218667c-2.947879 0-5.957818 0.201697-8.998787 0.620606C333.729668 201.386667 311.325789 255.069091 311.325789 315.174788c0 54.892606 28.237576 97.854061 83.052606 97.85406 5.197576 0 10.627879-0.372364 16.290909-1.179151 65.536-9.18497 85.069576-61.688242 68.887273-120.335515-15.127273-54.768485-48.190061-97.31103-90.375758-97.31103M630.720698 190.169212c-41.921939 0.015515-78.661818 43.938909-92.827151 97.838546-15.313455 58.352485-1.117091 114.920727 63.968969 126.370909 7.819636 1.396364 15.142788 2.063515 22.000485 2.063515 50.269091 0 75.170909-36.367515 81.361455-98.940121C712.237304 246.380606 687.459607 199.261091 641.255486 191.115636a60.509091 60.509091 0 0 0-10.534788-0.930909M237.675365 439.125333c9.24703 0 18.944 4.235636 27.306667 11.915637 8.533333 7.835152 13.498182 15.794424 13.622303 21.845333 0.155152 6.438788-5.833697 13.389576-9.417697 16.973576-5.585455 5.585455-11.527758 8.440242-17.640728 8.440242-6.935273 0-13.824-3.661576-18.928485-10.038303a57.095758 57.095758 0 0 1-11.884606-30.021818c-0.698182-8.952242 1.50497-13.436121 2.094546-14.056727 3.211636-3.165091 8.766061-5.057939 14.832485-5.05794m550.865454-13.001697a14.894545 14.894545 0 0 1 6.749091 1.458425c2.001455 0.961939 4.096 4.189091 5.476849 8.424727a42.542545 42.542545 0 0 1-2.746182 31.278545c-6.733576 12.629333-15.934061 21.116121-22.853818 21.116122-3.165091 0-7.261091-1.396364-11.884606-4.018425l-0.760243-0.465454c-6.299152-3.723636-14.149818-9.852121-15.732363-17.795879-1.05503-5.399273 0.775758-11.589818 5.15103-17.423515 9.976242-13.296485 25.025939-22.574545 36.615757-22.574546M389.165304 244.115394c6.62497 0 13.405091 6.097455 17.92 11.217454 10.038303 11.372606 18.680242 28.951273 24.358788 49.446788 5.197576 18.866424 4.685576 35.638303-1.349818 44.838788-4.390788 6.671515-13.249939 10.969212-26.375758 12.815515a67.490909 67.490909 0 0 1-9.371151 0.698182c-13.730909 0-19.471515-5.011394-22.915879-9.386666-6.500848-8.22303-10.224485-22.279758-10.224485-38.570667 0-22.574545 4.12703-43.364848 11.295031-57.080243 6.671515-12.722424 12.443152-13.529212 14.615272-13.839515a15.32897 15.32897 0 0 1 2.048-0.155151m241.539879-4.018424c0.620606 0 1.241212 0.062061 1.861818 0.170666 5.399273 0.946424 11.093333 3.211636 16.182303 13.156849 3.956364 7.742061 10.100364 25.708606 6.795637 59.190303-2.901333 29.385697-9.852121 42.061576-13.730909 47.010909-2.172121 2.761697-5.430303 6.935273-17.966546 6.935273a77.730909 77.730909 0 0 1-13.34303-1.318788c-16.973576-2.978909-21.410909-9.929697-22.884849-12.22594-6.749091-10.519273-7.292121-30.099394-1.473939-52.317091 4.980364-18.959515 13.932606-36.507152 24.576-48.128 7.13697-7.819636 14.599758-12.474182 19.983515-12.474181" fill="#444444" p-id="11151"></path><path d="M663.488698 682.635636c-4.980364 0-9.774545-1.985939-13.28097-5.523394l-65.008484-65.473939a18.711273 18.711273 0 0 1 26.546424-26.375758l65.008485 65.47394a18.711273 18.711273 0 0 1-13.265455 31.899151m-99.234909-99.250424c-5.026909 0-9.852121-2.01697-13.374061-5.60097l-22.760727-23.226181a18.711273 18.711273 0 0 1 26.717091-26.205091l22.760727 23.226182a18.711273 18.711273 0 0 1-13.34303 31.80606" fill="#444444" p-id="11152"></path><path d="M237.675365 439.125333c9.24703 0 18.944 4.220121 27.306667 11.900122 8.533333 7.835152 13.498182 15.794424 13.622303 21.860848 0.155152 6.423273-5.833697 13.389576-9.417697 16.958061-5.585455 5.585455-11.527758 8.440242-17.640728 8.440242-6.935273 0-13.824-3.661576-18.928485-10.038303a57.095758 57.095758 0 0 1-11.884606-30.021818c-0.698182-8.952242 1.50497-13.436121 2.094546-14.056727 3.211636-3.165091 8.766061-5.042424 14.832485-5.042425" fill="#F8D02D" p-id="11153"></path><path d="M788.525304 426.108121a14.894545 14.894545 0 0 1 6.749091 1.458424c2.001455 0.977455 4.096 4.204606 5.476849 8.440243a42.542545 42.542545 0 0 1-2.746182 31.278545c-6.733576 12.629333-15.934061 21.100606-22.853818 21.100606-3.165091 0-7.261091-1.380848-11.884606-4.018424l-0.760243-0.449939c-6.299152-3.739152-14.149818-9.867636-15.732363-17.811394-1.05503-5.399273 0.775758-11.589818 5.15103-17.423515 9.976242-13.296485 25.025939-22.574545 36.615757-22.574546" fill="#F8D02D" p-id="11154"></path><path d="M389.180819 244.099879c6.62497 0 13.405091 6.11297 17.92 11.232969 10.038303 11.372606 18.680242 28.935758 24.358788 49.446788 5.197576 18.866424 4.685576 35.622788-1.349818 44.838788-4.390788 6.671515-13.249939 10.969212-26.375757 12.815515a67.490909 67.490909 0 0 1-9.371152 0.698182c-13.730909 0-19.471515-5.026909-22.915879-9.386666-6.500848-8.22303-10.224485-22.279758-10.224485-38.570667 0-22.590061 4.12703-43.380364 11.295031-57.095758 6.671515-12.722424 12.443152-13.529212 14.615272-13.839515a15.32897 15.32897 0 0 1 2.048-0.155151" fill="#F8D02D" p-id="11155"></path><path d="M630.720698 240.081455c0.620606 0 1.241212 0.046545 1.861818 0.155151 5.399273 0.961939 11.093333 3.211636 16.182303 13.172364 3.956364 7.726545 10.100364 25.708606 6.795637 59.174788-2.901333 29.385697-9.852121 42.077091-13.730909 47.010909-2.172121 2.761697-5.430303 6.935273-17.966546 6.935272a77.730909 77.730909 0 0 1-13.34303-1.303272c-16.973576-2.994424-21.410909-9.929697-22.884849-12.22594-6.749091-10.534788-7.292121-30.099394-1.473939-52.332606 4.980364-18.959515 13.932606-36.491636 24.576-48.128 7.13697-7.804121 14.599758-12.458667 19.983515-12.458666" fill="#F8D02D" p-id="11156"></path></svg>;
}
export function ChusaiIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19399" width="24" height="24"><path d="M773.467429 358.454857c86.272-15.469714 142.189714-76.745143 139.958857-123.172571-3.584-74.953143-57.691429-112.621714-174.336-113.097143h-1.499429a25.417143 25.417143 0 0 1-25.307428-22.637714 21.833143 21.833143 0 0 1 20.461714-24.210286l4.242286-0.256c34.706286-2.194286 73.069714-3.474286 93.769142 1.426286 86.308571 20.461714 134.217143 72.502857 138.24 156.105142 3.2 66.486857-46.262857 131.474286-115.876571 182.857143a100.845714 100.845714 0 0 1-2.029714 1.462857c13.476571 23.588571 22.089143 49.92 25.874285 79.030858 13.129143 84.260571 0.914286 136.667429 10.276572 171.373714 9.380571 34.724571 52.041143 53.76 68.882286 92.544 16.822857 38.765714 13.714286 55.771429 8.777142 86.308571-2.907429 18.102857-9.490286 44.580571-19.712 79.396572a18.541714 18.541714 0 0 1-17.792 13.312h-61.641142c-10.24 0-18.541714-8.301714-18.541715-18.541715v-9.325714a18.541714 18.541714 0 0 1 18.742857-18.541714c8.32 0.109714 15.414857-2.084571 21.284572-6.582857 14.829714-11.337143 16.054857-17.664 16.054857-39.716572 0-14.701714-5.339429-29.494857-16.054857-44.379428-42.971429-27.940571-78.902857-49.773714-110.610286-65.828572-3.254857 32.219429-9.691429 61.513143-19.254857 87.881143-10.057143 27.721143-27.538286 62.994286-52.425143 105.801143a18.541714 18.541714 0 0 1-16.036571 9.234286h-48.786286c-10.057143 0-18.285714-8.009143-18.523429-18.066286l-0.219428-8.411429a18.541714 18.541714 0 0 1 17.664-19.017142l25.508571-1.206858c7.533714-0.365714 14.098286-5.248 16.603429-12.361142 8.448-23.990857 11.922286-47.561143 10.422857-70.729143-1.718857-26.130286-10.404571-61.750857-26.075429-106.898286-65.097143-0.585143-197.156571 27.666286-227.565714 30.189714-7.168 0.603429-14.537143 0.548571-22.089143-0.109714a257.883429 257.883429 0 0 0-11.392 59.209143c-1.883429 24.338286-2.048 67.145143-0.512 128.402286a18.541714 18.541714 0 0 1-18.541714 18.998857h-50.669714c-10.24 0-18.541714-8.301714-18.541715-18.541715v-12.726857c0-10.24 8.301714-18.541714 18.541715-18.541714h7.808a17.993143 17.993143 0 0 0 16.896-24.173714 508.617143 508.617143 0 0 1-22.326857-79.890286l-60.928 142.628571c-2.925714 6.820571-9.636571 11.245714-17.060572 11.245715h-67.291428c-10.24 0-18.56-8.301714-18.56-18.541715v-9.472c0-8.996571 6.454857-16.694857 15.305142-18.249142l32.036572-5.686858c4.022857-0.731429 7.716571-2.742857 10.477714-5.778285 13.019429-14.317714 21.394286-32.164571 25.161143-53.522286 9.289143-52.681143 15.177143-58.386286 0-109.037714-4.937143-16.548571-41.179429-32.676571-64.365714-105.984-14.866286-46.921143-28.032-126.628571-39.533715-239.122286a18.541714 18.541714 0 0 0-15.469714-16.420571l-35.620571-5.76c-5.485714-0.896-10.294857-4.205714-13.092572-9.014858L59.977143 293.595429a18.541714 18.541714 0 0 0-0.768-1.225143A22.674286 22.674286 0 0 1 54.857143 279.350857c0-3.584 0.932571-7.277714 2.797714-11.099428 0.987429-2.011429 2.322286-3.84 3.968-5.376l36.845714-34.614858c2.56-2.432 4.406857-5.540571 5.284572-8.96l2.084571-8.283428c1.865143-7.369143 5.961143-14.006857 11.702857-18.980572 11.081143-9.545143 19.254857-15.945143 24.539429-19.2 6.582857-4.041143 20.260571-8.905143 40.996571-14.555428-10.532571-14.738286-16.310857-27.629714-17.334857-38.692572-1.554286-16.585143-2.870857-33.005714 3.84-33.645714 4.498286-0.420571 15.872 11.940571 34.139429 37.083429-1.426286-31.762286 1.773714-45.805714 9.636571-42.093715 7.862857 3.693714 25.088 25.106286 51.748572 64.237715l26.002285 29.622857a129.792 129.792 0 0 1 27.209143 49.792c13.129143 45.714286 25.636571 78.610286 37.485715 98.724571 21.193143 35.876571 47.177143 80.054857 131.620571 73.508572 84.425143-6.528 112.822857-23.625143 169.069714-32.475429a799.451429 799.451429 0 0 1 86.893715-8.429714 115.931429 115.931429 0 0 1 30.08 2.541714z" p-id="19400"></path></svg>
}
export function FusaiIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19190" width="24" height="24"><path d="M276.914 568.812c3.376-52.874 8.656-85.934 76.842-148.87 68.152-62.904 170.586-69.466 182.12-125.184 4.282-20.718 24.53-199.056 56.902-219.776 32.406-20.716 96.308-10.532 96.308-10.532s51.094 27.156 63.062 36.782c11.938 9.626 37.654 48.154 37.654 48.154s-13.438 58.374-28.03 61.31c-14.596 2.906-56.906-7.876-56.906-7.876s-21.03 7-16.654 36.748c4.374 29.782 35.032 83.186 32.404 134.842-2.626 51.684-48.154 122.588-48.154 122.588l6.124 298.584 36.782 8.75s8.312 12.248 7 32.404c-1.312 20.126-24.092 26.844-24.092 26.844h-70.904s-48.716-287.896-51.562-287.96c-2.842-0.062-83.714 217.338-83.714 217.338l35.874 5.25s4.376 12.126 5.126 32.06c0.374 9.75-7.752 41.438-28.312 41.312l-227.836 2.938-0.034-305.706z" fill="#424953" p-id="19191"></path><path d="M752.148 101.234c-11.968-9.626-63.062-36.782-63.062-36.782s-21.56-3.436-45.996-2.248c14.374 0.624 24.654 2.248 24.654 2.248s51.092 27.156 63.03 36.782c11.968 9.626 37.654 48.154 37.654 48.154s-12.436 54.186-26.404 60.748c7.874 1.032 15.188 1.468 19.75 0.562 14.592-2.938 28.03-61.31 28.03-61.31s-25.718-38.528-37.656-48.154zM678.586 795.586l-6.124-298.584s45.53-70.904 48.154-122.588c2.626-51.656-28.032-105.06-32.404-134.842-2.782-18.998 10.812-32.216 16.654-36.748-8.782-1.844-22.466 2.782-22.466 2.782s-19.904 4.218-15.532 33.966c4.376 29.782 35.032 83.186 32.406 134.842-2.626 51.684-48.156 122.588-48.156 122.588l6.126 298.584 36.782 8.75s8.31 12.248 7 32.404c-1.314 20.126-24.094 26.844-24.094 26.844h21.344s22.78-6.718 24.092-26.844c1.312-20.156-7-32.404-7-32.404l-36.782-8.75z" fill="#646C77" p-id="19192"></path><path d="M597.09 7.082c-17.904 53.06 0.062 104.184 0.062 104.184 23.062-58.31 81.934-40.688 81.934-40.688s-70.62-97.09-81.996-63.496z" fill="#646C77" p-id="19193"></path><path d="M687.9 237.042c-25.25-2.344-90.874-9.782-138.652-27.376-7.032 40.53-11.592 76.466-13.374 85.092a48.56 48.56 0 0 1-4.19 11.968c60.31 16.748 150.714 28.186 186.212 32.28-7.312-39.436-26.312-76.466-29.686-99.436-0.124-0.872-0.216-1.714-0.31-2.528z" fill="#F5BA45" p-id="19194"></path><path d="M666.338 234.73c0.062 0.842 0.406 3.966 0.532 4.842 3.282 22.468 21.532 58.344 29.156 96.81 8.56 1.062 15.966 1.938 21.874 2.626-7.312-39.436-26.312-76.466-29.686-99.436-0.126-0.876-0.218-1.716-0.312-2.53-25.252-2.342-21.564-2.312-21.564-2.312z" fill="#FECD57" p-id="19195"></path><path d="M703.9 853.178H276.914c-23.5 0-42.716 19.216-42.716 42.716v85.404c0 23.468 19.216 42.686 42.716 42.686H703.9c23.498 0 42.714-19.216 42.714-42.686v-85.404c0.002-23.5-19.216-42.716-42.714-42.716z" fill="#646C77" p-id="19196"></path><path d="M703.9 853.178h-21.344c23.468 0 42.688 19.216 42.688 42.716v85.404c0 23.468-19.218 42.686-42.688 42.686h21.344c23.498 0 42.714-19.216 42.714-42.686v-85.404c0.002-23.5-19.216-42.716-42.714-42.716z" fill="#798089" p-id="19197"></path></svg>
}
export function BanjueIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28304" width="24" height="24"><path d="M775.12 781.94h-0.38l-642.83-13.57a87.08 87.08 0 0 1-86.78-87v-16.8a87.13 87.13 0 0 1 70.23-85.34c0.35-48.84 15.46-83.92 45-104.41 47.64-33 118.88-16.44 154.56-4.78 3.14-42.63 12.56-87.29 26.26-123.2 22-57.65 54.47-93.24 94-102.93a65.11 65.11 0 0 1 45.32 5.45 67.17 67.17 0 0 1 30.36 32 362.37 362.37 0 0 1 26 50.14q3.57 8.64 6.09 16.56c27.64-2 47-18.42 69.53-45l13.88-16.41a48.64 48.64 0 0 1 56.21-18.33c17.18 6.11 34.21 24 30.6 55.92l-10.26 120.1a16.41 16.41 0 0 1-32.7-2.79l10.25-120.3v-0.5c0.77-6.56 0.61-18.07-9-21.49-5.65-2-14-0.56-18.21 6.1a16.1 16.1 0 0 1-1.3 1.77l-14.53 17.16c-26.12 30.86-51.94 52.48-88.44 56.23 0.38 16.55-4.74 29.17-15.35 37.74-20.35 16.42-47.28 17.76-65.48 3.24-15.15-12.12-19.15-31.71-10.31-49.9 9.58-19.6 30.91-24.12 49.88-24.53-0.35-0.88-0.71-1.78-1.08-2.69A333.25 333.25 0 0 0 482.52 298a15.79 15.79 0 0 1-1.29-2.44c-6.41-15-22.86-23.52-38.25-19.75-36.08 8.85-58.59 49.89-71.12 82.75-14.89 39-24.3 89.52-25.19 135a16.41 16.41 0 0 1-23 14.72 291.79 291.79 0 0 0-55.79-16.46c-26.78-5-63.93-7.29-88.89 10-22.61 15.71-32.88 46.44-30.52 91.35a16.41 16.41 0 0 1-16.39 17.26A54.21 54.21 0 0 0 78 664.59v16.8a54.22 54.22 0 0 0 54.14 54.16h0.35l642.82 13.57C846.7 749.05 905.52 694 911.54 624h-53.65a16.41 16.41 0 0 1 0-32.82h66a21 21 0 0 1 21 21c-0.05 93.63-76.2 169.75-169.77 169.76z m-264.36-402a76.72 76.72 0 0 0-12.82 0.91c-5.86 1-9.43 2.75-10.62 5.17-2.72 5.58-0.7 8.19 1.36 9.83 4.15 3.32 14.08 5.22 24.41-3.12 2.23-1.8 3.46-6.07 3.13-12.69-1.83-0.04-3.66-0.11-5.46-0.11z" fill="#191007" p-id="28305"></path><path d="M211.22 543.37m-26.79 0a26.79 26.79 0 1 0 53.58 0 26.79 26.79 0 1 0-53.58 0Z" fill="#191007" p-id="28306"></path><path d="M770.12 527.52a10.94 10.94 0 0 1-1.48-21.78l184.74-25.45a10.94 10.94 0 1 1 3 21.67l-184.75 25.45a11.19 11.19 0 0 1-1.51 0.11zM753.19 478.14a10.94 10.94 0 0 1-2-21.69l183.37-34a10.94 10.94 0 1 1 4 21.51L755.2 478a11.55 11.55 0 0 1-2.01 0.14zM962.93 570.24h-0.23l-186.44-3.78a10.94 10.94 0 1 1 0.44-21.87l186.45 3.77a10.94 10.94 0 0 1-0.22 21.88z" fill="#191007" p-id="28307"></path><path d="M708.38 543.47m-21.71 0a21.71 21.71 0 1 0 43.42 0 21.71 21.71 0 1 0-43.42 0Z" fill="#191007" p-id="28308"></path><path d="M492.92 656.12a24.53 24.53 0 0 1-17.52-7.28l-59.47-60.3a51.39 51.39 0 0 1 73.19-72.17l5.66 5.74 6.77-6.42a52.61 52.61 0 0 1 33.18-14.27 50.93 50.93 0 0 1 40.73 16.42 51.64 51.64 0 0 1-2.64 71.92l-63 59.67a24.57 24.57 0 0 1-16.9 6.69zM452.52 523a29.5 29.5 0 0 0-21 50.23L491 633.48a2.74 2.74 0 0 0 3.82 0.06l63-59.66a29.66 29.66 0 0 0 1.53-41.3 29.16 29.16 0 0 0-23.35-9.32 30.66 30.66 0 0 0-19.36 8.31l-22.34 21.17-20.72-21a29.43 29.43 0 0 0-21.06-8.74z" fill="#191007" p-id="28309"></path></svg>
}
export function JuesaiIcon() {
    return <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29394" width="24" height="24"><path d="M 187.94 309.84 s 81.83 -64.02 146.19 8.22 c 0 0 24.31 27.05 33.55 60.6 c 0.01 0 -54.77 -130.1 -179.74 -68.82 Z M 187.94 324.57 s 17.8 55.12 54.44 85.25 c 0 0 5.82 10.61 54.44 -5.82 l 54.44 -20.2 s -23.28 18.49 -81.49 37.32 c 0 0 -24.99 10.96 -48.28 -14.38 c 0 0 -27.39 -40.4 -33.55 -82.17 Z" fill="#333333" p-id="29395"></path><path d="M 249.37 293.47 s -38.84 20.49 -26.51 72.53 c 0 0 12.28 43.92 59.38 42.5 c 0 0 46.91 -5.02 50.94 -79.4 c 0 0 -36.42 -45.86 -83.81 -35.63 Z m 41.45 50.61 c -14.08 0 -25.5 -7.67 -25.5 -17.12 c 0 -9.46 11.41 -17.12 25.5 -17.12 s 25.51 7.66 25.51 17.12 c 0 9.45 -11.41 17.12 -25.51 17.12 Z M 788.3 303.17 s -81.83 -64.02 -146.19 8.22 c 0 0 -24.31 27.05 -33.55 60.6 c -0.01 0 54.77 -130.11 179.74 -68.82 Z M 788.3 317.89 s -17.8 55.12 -54.44 85.25 c 0 0 -5.82 10.61 -54.44 -5.82 l -54.44 -20.2 s 23.28 18.49 81.49 37.32 c 0 0 24.99 10.96 48.28 -14.38 c -0.01 0 27.39 -40.4 33.55 -82.17 Z" fill="#333333" p-id="29396"></path><path d="M 726.87 286.79 c -47.4 -10.22 -83.81 35.63 -83.81 35.63 c 4.04 74.38 50.95 79.4 50.95 79.4 c 47.1 1.42 59.38 -42.51 59.38 -42.51 c 12.32 -52.03 -26.52 -72.52 -26.52 -72.52 Z m -41.46 50.62 c -14.08 0 -25.51 -7.67 -25.51 -17.12 c 0 -9.46 11.42 -17.12 25.51 -17.12 c 14.09 0 25.51 7.66 25.51 17.12 c 0 9.45 -11.41 17.12 -25.51 17.12 Z M 536.48 520.41 c -34.59 -11.3 -91.08 -2.74 -91.08 -2.74 c -25.33 8.22 -29.1 17.12 -29.1 17.12 c -6.17 15.07 29.1 7.53 29.1 7.53 c 26.71 -3.43 28.42 19.86 28.42 19.86 c 1.37 5.13 6.17 22.59 6.17 22.59 c 13.69 13.7 20.88 -18.14 20.88 -18.14 c 7.53 -26.36 26.7 -23.63 26.7 -23.63 h 17.47 c 29.44 -7.19 -8.56 -22.59 -8.56 -22.59 Z m -29.95 12.67 c -8.04 0 -14.55 -2.3 -14.55 -5.14 s 6.51 -5.13 14.55 -5.13 c 8.03 0 14.55 2.3 14.55 5.13 c 0 2.84 -6.52 5.14 -14.55 5.14 Z M 76.33 569.71 s 107.16 -54.1 280.41 -23.28 c -0.01 0 -204.41 -10.27 -280.41 23.28 Z M 155.07 629.62 s 81.83 -58.89 196.18 -54.1 c 0 0.01 -125.99 17.81 -196.18 54.1 Z M 238.61 646.74 s 32.53 -56.15 109.22 -48.62 c 0 0.01 -77.03 11.3 -109.22 48.62 Z M 678.57 537.53 s 141.74 -19.86 269.11 38 c -0.01 0 -189 -50.67 -269.11 -38 Z M 682.33 572.79 s 149.62 -2.4 233.16 61.97 c 0 0 -154.75 -67.11 -233.16 -61.97 Z M 665.9 595.73 s 85.25 -6.16 106.82 73.95 c 0 0 -38 -72.58 -106.82 -73.95 Z" fill="#333333" p-id="29397"></path><path d="M 419.9 707.91 s 81.75 49.67 151.09 0 c 0 0 -73.48 87.96 -151.09 0 Z" fill="#333333" p-id="29398"></path></svg>
}