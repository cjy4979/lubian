import React, { useEffect, useState } from 'react';
import List from '@/components/schedule/List';
import Header from '@/components/header/Header';
import './index.css';
import { Typography, Divider, Nav, Toast } from '@douyinfe/semi-ui';
import Icon, { IconPlusCircle } from '@douyinfe/semi-icons';
import { Pagination } from 'antd';
import { getCookie } from '@/utils/auth';
import { history } from 'umi';
//工作人员页（和赛程页有重复，可以优化掉）

export default function index() {
  const { Title } = Typography;
  const [listData, setListData] = useState([]);
  const [type, setType] = useState(['复赛']);
  const [page, setPge] = useState(1);
  const [total, setTotal] = useState();

  useEffect(() => {
    if (getCookie('rights') === '0') {
      Toast.warning('无权限');
      history.push('/statistics');
    } else {
      setPge(1);
      fetch('/api/schedule?type=' + type + '&page=' + page + '&size=4')
        .then((response) => response.json())
        .then((data) => {
          setListData(data.data);
          setTotal(data.total['COUNT(*)']);
        });
    }
  }, []);

  //选择赛程
  const onClickType = (data: any) => {
    setType([data.itemKey]);
    setPge(1);
    fetch('/api/schedule?type=' + data.itemKey + '&page=1&size=4')
      .then((response) => response.json())
      .then((data) => {
        setListData(data.data);
        setTotal(data.total['COUNT(*)']);
      });
  };

  const onChange = (e: number) => {
    setPge(e);
    fetch('/api/schedule?type=' + type + '&page=' + e + '&size=4')
      .then((response) => response.json())
      .then((data) => {
        setListData(data.data);
      });
  };

  const t24 = [
    // { itemKey: '预赛', text: '预赛', icon:<Icon svg={<YusaiIcon />}size="large" /> },
    {
      itemKey: '初赛',
      text: '初赛',
      icon: <Icon svg={<ChusaiIcon />} size="large" />,
    },
    {
      itemKey: '复赛',
      text: '复赛',
      icon: <Icon svg={<FusaiIcon />} size="large" />,
    },
    {
      itemKey: '半决',
      text: '半决赛',
      icon: <Icon svg={<BanjueIcon />} size="large" />,
    },
    {
      itemKey: '决赛',
      text: '决赛',
      icon: <Icon svg={<JuesaiIcon />} size="large" />,
    },
  ];

  return (
    <div style={{ height: '100hv' }}>
      <div>
        <Header selectedKeys={['Work']} />
      </div>
      <div className="main">
        <div className="left">
          <Nav
            bodyStyle={{ height: '100%' }}
            items={t24}
            selectedKeys={type}
            defaultIsCollapsed={true}
            footer={{
              collapseButton: true,
            }}
            onClick={(data) => onClickType(data)}
          />
        </div>
        <div className="right">
          <div className="content">
            {listData.map((item) => {
              return <List key={item['id']} {...item} selectedKey={'work'} />;
            })}
          </div>
          <Pagination
            total={total}
            pageSize={4}
            current={page}
            onChange={(e) => onChange(e)}
            style={{ marginBottom: '15px', marginTop: '15px' }}
            hideOnSinglePage
          ></Pagination>
          <div style={{ height: '5px', width: '100%', visibility: 'hidden' }}>
            {' '}
            鲁辩
          </div>
        </div>
      </div>
    </div>
  );
}

export function YusaiIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="11150"
      width="24"
      height="24"
    >
      <path
        d="M523.604092 436.813576h-1.039515c-69.104485 0.620606-143.778909 63.379394-224.038788 188.338424a119.575273 119.575273 0 0 0 19.549091 152.560485l13.203394 12.179394a97.512727 97.512727 0 0 0 66.218667 25.863757c19.502545 0 39.098182-5.833697 55.994181-17.671757l6.981819-4.887273a100.181333 100.181333 0 0 1 57.530181-18.121697 100.227879 100.227879 0 0 1 57.344 17.997576l4.499394 3.13406a96.814545 96.814545 0 0 0 55.420122 17.392485 96.907636 96.907636 0 0 0 63.58109-23.722666l18.835394-16.290909a121.37503 121.37503 0 0 0 22.698667-157.137455c-76.675879-119.77697-148.914424-179.634424-216.777697-179.634424m0 49.912242c21.845333 0 46.483394 11.23297 73.24703 33.419637 31.976727 26.499879 66.125576 67.956364 101.500122 123.190303a71.478303 71.478303 0 0 1-13.374061 92.547878l-18.773333 16.259879-0.031031 0.015515v0.015515a47.166061 47.166061 0 0 1-57.809454 3.072l-4.499394-3.118545a149.581576 149.581576 0 0 0-85.860849-26.965333 149.550545 149.550545 0 0 0-86.140121 27.151515h-0.015515l-0.03103 0.015515-6.950788 4.871758a47.476364 47.476364 0 0 1-27.368727 8.641939c-12.039758 0-23.552-4.499394-32.380122-12.629333l-13.218909-12.194909a69.554424 69.554424 0 0 1-11.403636-88.901819c37.236364-57.949091 73.014303-101.546667 106.340848-129.551515 28.004848-23.536485 53.573818-35.591758 76.024243-35.84h0.744727m-285.944242-97.497212c-19.254303 0-37.143273 6.950788-49.772606 19.316364-25.956848 25.444848-21.286788 77.001697 5.740606 110.855757 14.723879 18.432 35.995152 28.796121 57.91806 28.796121 18.323394 0 37.112242-7.245576 52.922182-23.055515 34.753939-34.753939 30.952727-77.187879-5.740606-110.855757-18.819879-17.314909-40.711758-25.05697-61.067636-25.05697m550.865454-13.017212c-28.547879 0-57.716364 17.501091-76.489697 42.511515-25.165576 33.481697-21.47297 80.554667 25.010425 108.125091l0.015515 0.015515c13.451636 7.974788 26.220606 11.450182 38.074181 11.450182 29.168485 0 52.720485-20.976485 66.901334-47.522909 19.93697-37.360485 11.015758-90.701576-25.05697-108.140606a64.744727 64.744727 0 0 0-28.454788-6.438788M389.180819 194.218667c-2.947879 0-5.957818 0.201697-8.998787 0.620606C333.729668 201.386667 311.325789 255.069091 311.325789 315.174788c0 54.892606 28.237576 97.854061 83.052606 97.85406 5.197576 0 10.627879-0.372364 16.290909-1.179151 65.536-9.18497 85.069576-61.688242 68.887273-120.335515-15.127273-54.768485-48.190061-97.31103-90.375758-97.31103M630.720698 190.169212c-41.921939 0.015515-78.661818 43.938909-92.827151 97.838546-15.313455 58.352485-1.117091 114.920727 63.968969 126.370909 7.819636 1.396364 15.142788 2.063515 22.000485 2.063515 50.269091 0 75.170909-36.367515 81.361455-98.940121C712.237304 246.380606 687.459607 199.261091 641.255486 191.115636a60.509091 60.509091 0 0 0-10.534788-0.930909M237.675365 439.125333c9.24703 0 18.944 4.235636 27.306667 11.915637 8.533333 7.835152 13.498182 15.794424 13.622303 21.845333 0.155152 6.438788-5.833697 13.389576-9.417697 16.973576-5.585455 5.585455-11.527758 8.440242-17.640728 8.440242-6.935273 0-13.824-3.661576-18.928485-10.038303a57.095758 57.095758 0 0 1-11.884606-30.021818c-0.698182-8.952242 1.50497-13.436121 2.094546-14.056727 3.211636-3.165091 8.766061-5.057939 14.832485-5.05794m550.865454-13.001697a14.894545 14.894545 0 0 1 6.749091 1.458425c2.001455 0.961939 4.096 4.189091 5.476849 8.424727a42.542545 42.542545 0 0 1-2.746182 31.278545c-6.733576 12.629333-15.934061 21.116121-22.853818 21.116122-3.165091 0-7.261091-1.396364-11.884606-4.018425l-0.760243-0.465454c-6.299152-3.723636-14.149818-9.852121-15.732363-17.795879-1.05503-5.399273 0.775758-11.589818 5.15103-17.423515 9.976242-13.296485 25.025939-22.574545 36.615757-22.574546M389.165304 244.115394c6.62497 0 13.405091 6.097455 17.92 11.217454 10.038303 11.372606 18.680242 28.951273 24.358788 49.446788 5.197576 18.866424 4.685576 35.638303-1.349818 44.838788-4.390788 6.671515-13.249939 10.969212-26.375758 12.815515a67.490909 67.490909 0 0 1-9.371151 0.698182c-13.730909 0-19.471515-5.011394-22.915879-9.386666-6.500848-8.22303-10.224485-22.279758-10.224485-38.570667 0-22.574545 4.12703-43.364848 11.295031-57.080243 6.671515-12.722424 12.443152-13.529212 14.615272-13.839515a15.32897 15.32897 0 0 1 2.048-0.155151m241.539879-4.018424c0.620606 0 1.241212 0.062061 1.861818 0.170666 5.399273 0.946424 11.093333 3.211636 16.182303 13.156849 3.956364 7.742061 10.100364 25.708606 6.795637 59.190303-2.901333 29.385697-9.852121 42.061576-13.730909 47.010909-2.172121 2.761697-5.430303 6.935273-17.966546 6.935273a77.730909 77.730909 0 0 1-13.34303-1.318788c-16.973576-2.978909-21.410909-9.929697-22.884849-12.22594-6.749091-10.519273-7.292121-30.099394-1.473939-52.317091 4.980364-18.959515 13.932606-36.507152 24.576-48.128 7.13697-7.819636 14.599758-12.474182 19.983515-12.474181"
        fill="#444444"
        p-id="11151"
      ></path>
      <path
        d="M663.488698 682.635636c-4.980364 0-9.774545-1.985939-13.28097-5.523394l-65.008484-65.473939a18.711273 18.711273 0 0 1 26.546424-26.375758l65.008485 65.47394a18.711273 18.711273 0 0 1-13.265455 31.899151m-99.234909-99.250424c-5.026909 0-9.852121-2.01697-13.374061-5.60097l-22.760727-23.226181a18.711273 18.711273 0 0 1 26.717091-26.205091l22.760727 23.226182a18.711273 18.711273 0 0 1-13.34303 31.80606"
        fill="#444444"
        p-id="11152"
      ></path>
      <path
        d="M237.675365 439.125333c9.24703 0 18.944 4.220121 27.306667 11.900122 8.533333 7.835152 13.498182 15.794424 13.622303 21.860848 0.155152 6.423273-5.833697 13.389576-9.417697 16.958061-5.585455 5.585455-11.527758 8.440242-17.640728 8.440242-6.935273 0-13.824-3.661576-18.928485-10.038303a57.095758 57.095758 0 0 1-11.884606-30.021818c-0.698182-8.952242 1.50497-13.436121 2.094546-14.056727 3.211636-3.165091 8.766061-5.042424 14.832485-5.042425"
        fill="#F8D02D"
        p-id="11153"
      ></path>
      <path
        d="M788.525304 426.108121a14.894545 14.894545 0 0 1 6.749091 1.458424c2.001455 0.977455 4.096 4.204606 5.476849 8.440243a42.542545 42.542545 0 0 1-2.746182 31.278545c-6.733576 12.629333-15.934061 21.100606-22.853818 21.100606-3.165091 0-7.261091-1.380848-11.884606-4.018424l-0.760243-0.449939c-6.299152-3.739152-14.149818-9.867636-15.732363-17.811394-1.05503-5.399273 0.775758-11.589818 5.15103-17.423515 9.976242-13.296485 25.025939-22.574545 36.615757-22.574546"
        fill="#F8D02D"
        p-id="11154"
      ></path>
      <path
        d="M389.180819 244.099879c6.62497 0 13.405091 6.11297 17.92 11.232969 10.038303 11.372606 18.680242 28.935758 24.358788 49.446788 5.197576 18.866424 4.685576 35.622788-1.349818 44.838788-4.390788 6.671515-13.249939 10.969212-26.375757 12.815515a67.490909 67.490909 0 0 1-9.371152 0.698182c-13.730909 0-19.471515-5.026909-22.915879-9.386666-6.500848-8.22303-10.224485-22.279758-10.224485-38.570667 0-22.590061 4.12703-43.380364 11.295031-57.095758 6.671515-12.722424 12.443152-13.529212 14.615272-13.839515a15.32897 15.32897 0 0 1 2.048-0.155151"
        fill="#F8D02D"
        p-id="11155"
      ></path>
      <path
        d="M630.720698 240.081455c0.620606 0 1.241212 0.046545 1.861818 0.155151 5.399273 0.961939 11.093333 3.211636 16.182303 13.172364 3.956364 7.726545 10.100364 25.708606 6.795637 59.174788-2.901333 29.385697-9.852121 42.077091-13.730909 47.010909-2.172121 2.761697-5.430303 6.935273-17.966546 6.935272a77.730909 77.730909 0 0 1-13.34303-1.303272c-16.973576-2.994424-21.410909-9.929697-22.884849-12.22594-6.749091-10.534788-7.292121-30.099394-1.473939-52.332606 4.980364-18.959515 13.932606-36.491636 24.576-48.128 7.13697-7.804121 14.599758-12.458667 19.983515-12.458666"
        fill="#F8D02D"
        p-id="11156"
      ></path>
    </svg>
  );
}

export function ChusaiIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6679"
      width="24"
      height="24"
    >
      <path
        d="M527.507 78.68c-236.322 0-428.588 192.277-428.588 428.624 0 236.299 192.264 428.588 428.588 428.588 236.35 0 428.614-192.288 428.614-428.588C956.12 270.957 763.856 78.68 527.507 78.68zM527.507 880.724c-205.922 0-373.441-167.517-373.441-373.419 0-205.935 167.518-373.465 373.441-373.465s373.467 167.532 373.467 373.465C900.974 713.205 733.431 880.724 527.507 880.724z"
        p-id="6680"
      ></path>
      <path
        d="M508.656 631.675 390 631.675l106.334-142.933c15.916-19.576 23.357-42.543 22.128-68.38-4.902-52.753-35.33-81.341-90.771-85.013-65.929 3.66-101.833 38.924-106.687 105.016 0 22.981 12.195 27.81 22.403 27.81 13.477 0 20.594-7.142 20.594-20.505 2.337-45.524 20.917-68.783 56.447-71.109 32.236 2.314 48.503 17.941 49.634 47.648 0 19.576-7.644 38.32-22.829 55.882l-113.074 152.55c-6.437 7.706-9.555 14.144-9.555 19.953 0.931 8.446 5.859 18.53 24.165 18.53l160.015 0 0.177-0.025c10.738-1.32 17.148-8.348 18.481-20.933C526.08 639.455 519.72 633.069 508.656 631.675z"
        p-id="6681"
      ></path>
      <path
        d="M725.097 547.265l-18.884 0L706.213 372.111c0-24.051-11.466-36.773-33.165-36.773-14.057 0-25.671 6.424-34.624 19.247L523.542 544.863c-7.568 11.328-11.215 19.45-11.215 24.83 0 7.756 3.57 17.022 20.617 17.022l128.462 0 0 63.79c0 9.404 3.872 20.619 22.379 20.619 18.53 0 22.428-11.215 22.428-20.619l0-63.79 19.209-0.025c10.762-1.318 17.176-8.349 18.508-20.933C742.57 555.034 736.184 548.648 725.097 547.265zM661.406 547.265l-91.575 0 91.575-159.337L661.406 547.265z"
        p-id="6682"
      ></path>
    </svg>
  );
}
export function FusaiIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7963"
      width="24"
      height="24"
    >
      <path d="M489.511311 326.023308" p-id="7964"></path>
      <path
        d="M512.001535 61.372789c-248.877277 0-450.629257 201.727421-450.629257 450.625164 0 248.868067 201.75198 450.630281 450.629257 450.630281 248.873184 0 450.625164-201.762213 450.625164-450.630281C962.621583 263.095094 760.874719 61.372789 512.001535 61.372789L512.001535 61.372789zM512.001535 926.574087c-228.965785 0-414.576133-185.631838-414.576133-414.574087 0-228.970902 185.610348-414.574087 414.576133-414.574087 228.961692 0 414.569994 185.603185 414.569994 414.574087C926.571529 740.942249 740.963227 926.574087 512.001535 926.574087L512.001535 926.574087zM284.046776 667.923212l82.226746 0L366.273523 372.402615 302.984081 372.402615l0-19.435655c29.402657-4.983501 51.828412-12.957103 69.270666-22.924105l23.422456 0 0 337.88138 75.748195 0 0 25.415856L284.046776 693.340091 284.046776 667.923212zM527.236518 675.398464c123.092479-106.147552 171.930791-180.901093 171.930791-246.682285 0-45.349861-22.923082-80.732719-74.254168-80.732719-31.397081 0-59.802014 19.435655-80.733743 45.349861l-18.438954-17.442254c27.409257-30.399357 58.306964-52.326762 102.161774-52.326762 63.290465 0 100.666724 41.36306 100.666724 104.155175 0 76.247568-58.805314 152.495136-155.485237 242.696508 19.934005-1.49505 40.865733-2.990101 59.802014-2.990101l113.125477 0 0 25.913183L527.236518 693.339068 527.236518 675.398464z"
        p-id="7965"
      ></path>
    </svg>
  );
}
export function BanjueIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="8925"
      width="24"
      height="24"
    >
      <path
        d="M745.982 226.6235l-81.6804 28.5757c-21.7917-95.2801-73.5201-141.568-155.1831-138.8483-136.1439 2.7197-204.2081 115.712-204.2081 338.9757 43.5517-73.5037 114.3521-111.6324 212.3674-114.3521 152.4644 8.1603 234.1437 96.6564 245.0401 265.4556-10.8964 171.5364-96.6564 264.0957-257.2954 277.7119-193.3117 0-289.9517-132.0479-289.9517-396.1436 2.7197-296.7675 102.0959-445.1676 298.1274-445.1676C632.9897 48.2877 710.5905 109.5516 745.982 226.6235zM308.991 561.5043c2.7197 166.0805 68.0643 251.8559 196.0325 257.2964 103.4557-5.4395 157.9192-73.5201 163.3597-204.2081-2.7197-130.688-57.1843-197.3924-163.3597-200.1121C398.847 419.9363 333.5025 468.9439 308.991 561.5043z"
        p-id="8926"
      ></path>
    </svg>
  );
}
export function JuesaiIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="10725"
      width="24"
      height="24"
    >
      <path
        d="M758.2382 647.2643c-8.1756 149.76-98.0316 228.7043-269.5516 236.8799-152.4797 0-245.0401-72.1439-277.7119-216.448l93.9356-24.5125c16.3359 111.6324 74.88 167.4404 175.616 167.4404 122.5114 0 183.7752-57.1679 183.7752-171.52-8.1756-98.0163-70.8004-149.7436-187.8559-155.1995-38.1276 0-62.6401 0-73.5201 0l0-73.503744c10.88 0 24.4961 0 40.8484 0 117.0555-2.7197 178.3194-54.4481 183.7752-155.1995-5.4559-87.1199-51.7437-132.0479-138.8636-134.7676-92.5757 2.7197-148.3837 54.4645-167.4404 155.1995l-89.8396-28.5921C264.0783 113.6323 348.4785 45.568 484.607 42.8319c155.1831 5.4559 235.5036 76.2399 240.9595 212.3684-2.7197 89.856-49.0076 151.1199-138.8636 183.7916C695.5981 471.6636 752.7823 541.0877 758.2382 647.2643z"
        p-id="10726"
      ></path>
    </svg>
  );
}
