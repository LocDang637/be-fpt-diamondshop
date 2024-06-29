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
import GoldCreateModal from "../../../components/Modal/GoldCreateModal";
import GoldUpdateModal from "../../../components/Modal/GoldUpdateModal";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { notification } from 'antd';



const { confirm } = Modal;
const BasicTable = () => {
    const context = useAuth();

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCreateVisible, setModalCreateVisible] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [product, setProduct] = useState();

    // ----------------------------------- API GET ALL GOLD --------------------------------
    async function loadAllGold(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/gold`
            )
                .then((data) => {
                    setData(data.data);
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
        loadAllGold();
        loadAllProduct();
    }, []);

    // --------------------- HANDLE OPEN CREATE GOLD ----------------------------
    const handleOpenCreateModal = () => {
        setModalCreateVisible(true);
    };

    const handleCreateModal = (values) => {
        setModalCreateVisible(false);
        loadAllGold();
    }

    const handleCancelCreateModal = () => {
        setModalCreateVisible(false);
    }

    // --------------------- HANDLE DELETE GOLD ----------------------------
    const handleDelete = async (GoldID) => {
        try {
            const response = await axios.delete(`/gold/${GoldID}`);
            if (response.status === 204) {
                openNotificationWithIcon('success', 'Delete Gold successfully');
                loadAllGold();
            }
        } catch (error) {
            console.error(error);
            openNotificationWithIcon('error', 'Delete Gold failed');
        }
    }

    const handleDeleteProduct = async (GoldID) => {
        product.map((item) => {
            if (item.GoldID == GoldID) {
                axios.delete(`/product/${item.ProductID}`)
                    .then((data) => {
                        console.log(data.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
        )
    }


    // --- noti ---
    const showConfirm = (GoldID) => {
        confirm({
            title: 'Delete diamond ' + GoldID + '?',
            icon: <ExclamationCircleFilled />,
            content: 'WARNING: This will delete all products that contain this diamond. Are you sure?',
            onOk() {
                console.log('Yes');
                handleDeleteProduct(GoldID).then(() => {
                    handleDelete(GoldID);
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
            title: 'GoldID',
            dataIndex: 'GoldID',
            ...getColumnSearchProps('GoldID'),
            key: 'GoldID',
            sorter: (a, b) => a.GoldID.length - b.GoldID.length,
            sortOrder: sortedInfo.columnKey === 'GoldID' ? sortedInfo.order : null,
        },
        {
            title: 'GoldTypeID',
            dataIndex: 'GoldTypeID',
            ...getColumnSearchProps('GoldTypeID'),
        },
        {
            title: 'GoldAgeID',
            dataIndex: 'GoldAgeID',
            ...getColumnSearchProps('GoldAgeID'),
        },
        {
            title: 'GoldWeight',
            dataIndex: 'GoldWeight',

        },
        {
            title: 'GoldUnit',
            dataIndex: 'GoldUnit',
        },
        //button edit
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => showConfirm(record.GoldID)}>DELETE</Button>
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            {contextHolder}
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        <ButtonCustomize
                            variant="contained"
                            // component={RouterLink}
                            nameButton="Add Gold"
                            width="15%"
                            onClick={handleOpenCreateModal}
                            startIcon={<AddCircleOutlineIcon />}
                        />


                        <div className="table-container"><Table columns={columns} dataSource={data} onChange={onChange} /></div>

                        <GoldCreateModal
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
