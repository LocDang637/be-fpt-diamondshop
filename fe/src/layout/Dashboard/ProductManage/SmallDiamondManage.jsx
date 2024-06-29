import * as React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonCustomize from "../../../components/Button/Button";
import { useRef, useState, useEffect, useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import DiamondCreateModal from "../../../components/Modal/DiamondCreateModal";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { notification } from 'antd';
import SmallDiamondCreateModal from "../../../components/Modal/SmallDiamondCreateModal";


const { confirm } = Modal;


const BasicTable = () => {
    const context = useAuth();

    const [data, setData] = useState([]);
    const [diaOrigin, setDiaOrigin] = useState([]);
    const [diaColor, setDiaColor] = useState([]);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [diaClarity, setDiaClarity] = useState([]);
    const [product, setProduct] = useState([]);

    // ----------------------------------- API GET ALL DIAMOND --------------------------------
    async function loadAllDiamond(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/diamond_small`
            )
                .then((data) => {
                    setData(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiamondOrigin = async () => {
        try {
            const loadData = await axios.get(
                `/dia_origin`)
                .then((data) => {
                    setDiaOrigin(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiaColor = async () => {
        try {
            const loadData = await axios.get(
                `/dia_color`)
                .then((data) => {
                    setDiaColor(data.data);

                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllDiaClarity = async () => {
        try {
            const loadData = await axios.get(
                `/dia_clarity`)
                .then((data) => {
                    setDiaClarity(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const loadAllProduct = async () => {
        try {
            const loadData = await axios.get(
                `/product`)
                .then((data) => {
                    setProduct(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        loadAllDiamond();
        loadAllDiamondOrigin();
        loadAllDiaColor();
        loadAllDiaClarity();
        loadAllProduct();
    }, []);

    // --------------------- HANDLE OPEN CREATE GOLD ----------------------------
    const handleOpenCreateModal = () => {
        setModalCreateVisible(true);
    };

    const handleCreateModal = (values) => {
        setModalCreateVisible(false);
        loadAllDiamond();
    }

    const handleCancelCreateModal = () => {
        setModalCreateVisible(false);
    }

    // --------------------- HANDLE DELETE DIAMOND ----------------------------
    const handleDelete = async (DiaID) => {
        try {
            const response = await axios.delete(`/diamond_small/${DiaID}`);
            if (response.status === 204) {
                openNotificationWithIcon('success', 'Delete success');
                loadAllDiamond();
            }
        } catch (error) {
            console.error(error);
            openNotificationWithIcon('error', 'Delete failed');
        }
    }

    const handleDeleteProduct = async (DiaID) => {
        product.map((item) => {
            if (item.DiamondSmallID === DiaID) {
                try {
                    const response = axios.delete(`/product/${item.ProductID}`);
                    if (response.status === 204) {
                        openNotificationWithIcon('success', 'Delete product success');
                        loadAllProduct();
                    }
                } catch (error) {
                    console.error(error);
                    openNotificationWithIcon('error', 'Delete product failed');
                }
            }
        }
        )
    }


    // --- noti ---
    const showConfirm = (DiaID) => {
        confirm({
            title: 'Delete small diamond ' + DiaID + '?',
            icon: <ExclamationCircleFilled />,
            content: 'WARNING: This will delete all products that contain this diamond. Are you sure?',
            onOk() {
                console.log('Yes');
                handleDeleteProduct(DiaID).then(() => {
                    handleDelete(DiaID);
                }
                );
            },
            onCancel() {
                console.log('No');
            },
        });
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };


    // --------------------- ANT TABLE -----------------------------
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex, field) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            if (field == 'name') {
                return record.userId.fullname.toLowerCase().includes(value.toLowerCase());
            } else if (field == 'phone') {
                return record.userId.phone.toLowerCase().includes(value.toLowerCase());
            } else {
                if (record[dataIndex]) return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            }

        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'DiaSmallID',
            dataIndex: 'DiaSmallID',
            ...getColumnSearchProps('DiaSmallID'),
            key: 'DiaSmallID',
            sorter: (a, b) => a.DiaSmallID.length - b.DiaSmallID.length,
            sortOrder: sortedInfo.columnKey === 'DiaSmallID' ? sortedInfo.order : null,
        },
        {
            title: 'DiaOrigin',
            dataIndex: 'DiaSmallOriginID',
            render: (text, record) => {
                const origin = diaOrigin.find(item => item.DiaOriginID === record.DiaSmallOriginID);
                if (origin) {
                    return (
                        origin.DiaOriginName
                    );
                } else {
                    console.warn(`No origin found for DiaOriginID ${record.DiaOriginID}`);
                    return (
                        <Tag color="red">Unknown Origin</Tag>
                    );
                }
            },
            ...getColumnSearchProps('DiaOriginID'),
        },
        {
            title: 'Weight',
            dataIndex: 'DiaSmallWeight',

        },
        {
            title: 'DiaSmallUnit',
            dataIndex: 'DiaSmallUnit',
        },
        {
            title: 'DiaColorID',
            dataIndex: 'DiaSmallColorID',
            render: (text, record) => {
                const color = diaColor.find(item => item.DiaColorID === record.DiaSmallColorID);
                if (color) {
                    return (color.DiaColorName + '(' + color.DiaColorID + ')');
                } else {
                    console.warn(`No color found for DiaColorID ${record.DiaColorID}`);
                    return (
                        <Tag color="red">Unknown Color</Tag>
                    );
                }
            },
        },
        //button edit
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => showConfirm(record.DiaSmallID)}>DELETE</Button>
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        {contextHolder}
                        <ButtonCustomize
                            variant="contained"
                            // component={RouterLink}
                            nameButton="Add small Diamond"
                            onClick={handleOpenCreateModal}
                            width="20%"
                            startIcon={<AddCircleOutlineIcon />}
                        />

                        <Table columns={columns} dataSource={data} onChange={onChange} />

                        <SmallDiamondCreateModal
                            visible={modalCreateVisible}
                            onCreate={handleCreateModal}
                            onCancel={handleCancelCreateModal}
                        />
                    </>
            }
        </div>
    );
}

export default BasicTable;
