import React, { useEffect, useState } from 'react';
import { Modal, Select, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import axios from "axios";
import { notification } from 'antd';

const { Option } = Select;

const DiamondCreateModal = ({ visible, onCreate, onCancel }) => {
    const [DiaOriginID, setDiaOriginID] = useState(null);
    const [DiaColorID, setDiaColorID] = useState(null);
    const [DiaWeight, setDiaWeight] = useState(1);
    const [DiaOriginList, setDiaOriginList] = useState([]);
    const [DiaColorList, setDiaColorList] = useState([]);

    useEffect(() => {
        if (visible) {
            setDiaOriginID(null);
            setDiaColorID(null);
            setDiaWeight(1);
        }
    }, [visible]);

    const loadDiaOriginList = async () => {
        try {
            const response = await axios.get(`/dia_origin`);
            setDiaOriginList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadDiaColorList = async () => {
        try {
            const response = await axios.get(`/dia_color`);
            setDiaColorList(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadDiaOriginList();
        loadDiaColorList();
    }, []);

    const handleCreateDiamond = async () => {
        //check if all fields are filled
        if (!DiaOriginID || !DiaColorID || !DiaWeight) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //check DiaID existed else continue
        const DiaID = DiaOriginID + DiaColorID + DiaWeight + 'LY';
        try {
            const response = await axios.get(`/diamond`);
            const list = response.data;

            // Check if DiaID already exists in the list
            const existingDiamond = list.find(diamond => diamond.DiamondID === DiaID);

            if (existingDiamond) {
                openNotificationWithIcon('error', 'DiamondID already exists');
                return;
            }
        } catch (error) {
            console.error(error);
        }

        //create diamond
        try {
            axios.post(`/diamond_small`, {
                DiaSmallID: DiaID,
                DiaSmallOriginID: DiaOriginID,
                DiaSmallColorID: DiaColorID,
                DiaSmallWeight: DiaWeight,
                DiaSmallPicture: 'picture',
                DiaSmallUnit: 'Ly',
            }).then((response) => {
                openNotificationWithIcon('success', 'Create diamond successfully');
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
    }


    //ant noti
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
            title="Create Gold"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleCreateDiamond}
        >
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <label>Dia Origin:</label>
                {DiaOriginList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select diamond origin"
                        onChange={(value) => setDiaOriginID(value)}
                        value={DiaOriginID}
                    >
                        {DiaOriginList.map((diaOrigin) => (
                            <Option key={diaOrigin.DiaOriginID} value={diaOrigin.DiaOriginID}>
                                {diaOrigin.DiaOriginName} : {diaOrigin.DiaOriginID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Dia Color:</label>
                {DiaColorList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select diamond color"
                        onChange={(value) => setDiaColorID(value)}
                        value={DiaColorID}
                    >
                        {DiaColorList.map((diaColor) => (
                            <Option key={diaColor.DiaColorID} value={diaColor.DiaColorID}>
                                {diaColor.DiaColorName} : {diaColor.DiaColorID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Diamond Weight:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={20} defaultValue={1} onChange={(value) => setDiaWeight(value)} />
            </div>
        </Modal>
    );
};

export default DiamondCreateModal;
