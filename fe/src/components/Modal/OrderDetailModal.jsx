import React, { useEffect, useState, useRef } from 'react';
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'
import moment from 'moment';


const numberToVND = (number) => {
    //check if number is string
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};


const OrderDetailModal = ({ visible, onCancel, orderDetailList }) => {


    const loadAllOrderDetails = () => {

    };

    useEffect(() => {
        console.log(orderDetailList);
    }, []);

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
            title: 'OrderDetailID',
            dataIndex: 'OrderDetailID',
            ...getColumnSearchProps('OrderDetailID'),
            key: 'OrderDetailID',
            sorter: (a, b) => a.OrderDetailID.length - b.OrderDetailID.length,
            sortOrder: sortedInfo.columnKey === 'OrderDetailID' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'ProductID',
            dataIndex: 'ProductID',
            key: 'ProductID',
            sorter: (a, b) => moment(a.ProductID).unix() - moment(b.ProductID).unix(),
            sortOrder: sortedInfo.columnKey === 'ProductID' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantity',
            ...getColumnSearchProps('Quantity'),
            sorter: (a, b) => a.Quantity.length - b.Quantity.length,
            sortOrder: sortedInfo.columnKey === 'Quantity' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'GoldID',
            dataIndex: 'GoldPriceID',
            ...getColumnSearchProps('GoldPriceID'),
            key: 'GoldPriceID',
            sorter: (a, b) => a.GoldPriceID.length - b.GoldPriceID.length,
            sortOrder: sortedInfo.columnKey === 'GoldPriceID' ? sortedInfo.order : null,
            width: '8%'
        },

        {
            title: 'DiaSmallPriceID',
            dataIndex: 'DiaSmallPriceID',
            key: 'DiaSmallPriceID',
            sorter: (a, b) => a.DiaSmallPriceID.length - b.DiaSmallPriceID.length,
            sortOrder: sortedInfo.columnKey === 'DiaSmallPriceID' ? sortedInfo.order : null,
            width: '8%',
        },
        {
            title: 'SalePrice',
            dataIndex: 'SalePrice',
            key: 'SalePrice',
            sorter: (a, b) => a.SalePrice.length - b.SalePrice.length,
            sortOrder: sortedInfo.columnKey === 'SalePrice' ? sortedInfo.order : null,
            width: '8%',
            render: (SalePrice) => numberToVND(SalePrice)
        }
    ];

    return (
        <Modal
            visible={visible}
            title="Create Entry"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            width='60%'
        //onOk={}
        >
            <div style={{ backgroundColor: '#ffffff', overflowX: 'auto' }}>


                <div className="table-container">
                    <Table columns={columns} dataSource={orderDetailList} />
                </div>

            </div>
        </Modal>
    )


};

export default OrderDetailModal;