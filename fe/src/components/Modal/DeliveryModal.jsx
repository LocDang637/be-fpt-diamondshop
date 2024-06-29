import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import axios from "axios";
import dayjs from 'dayjs';
import { notification } from 'antd';
import { Typography } from "antd";


const { Option } = Select;

const DeliveryModal = ({ visible, onCreate, onCancel, data }) => {
    const [status, setStatus] = useState(1);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [shipPrice, setShipPrice] = useState('');


    // Load data into form when empData changes
    useEffect(() => {
        if (data) {
            setName(data.CusName);
            setAddress(data.CusAddress);
            setTotalPrice(data.TotalPrice);
            setPhone(data.CusPhone);
            setNote(data.OrdNote);
            setShipPrice(data.ShipPrice);
        }
    }, [data]);

    const handleStatusChange = (value) => {
        setStatus(parseInt(value));
    };

    const handleUpdate = () => {
        try {
            axios.put(`/order/${data.OrderID}`, {
                OrdStatus: status
            }).then((response) => {
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
    };

    //ant notify
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    return (
        <Modal
            visible={visible}
            title="Update employee"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpdate}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Name:</label>
                <Typography>{name}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Address:</label>
                <Typography>{address}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Total Price:</label>
                <Typography>{totalPrice}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Phone:</label>
                <Typography>{phone}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Note:</label>
                <Typography>{note}</Typography>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Ship Price:</label>
                <Typography>{shipPrice}</Typography>
            </div>
            <div>
                <label>Status:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select status"
                    onChange={handleStatusChange}
                >
                    <Option value="2">Confirm</Option>
                    <Option value="3">Delivering</Option>
                    <Option value="4">Cancelled</Option>
                    <Option value="5">Complete</Option>
                </Select>
            </div>

        </Modal>
    );
};

export default DeliveryModal;
