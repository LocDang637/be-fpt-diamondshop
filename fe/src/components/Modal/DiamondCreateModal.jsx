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
    const [DiaClarityID, setDiaClarityID] = useState(null);
    const [DiaOriginList, setDiaOriginList] = useState([]);
    const [DiaColorList, setDiaColorList] = useState([]);
    const [DiaClarityList, setDiaClarityList] = useState([]);
    const [DiaCut, setDiaCut] = useState('Round');

    useEffect(() => {
        if (visible) {
            setDiaOriginID(null);
            setDiaColorID(null);
            setDiaWeight(1);
            setDiaClarityID(null);
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

    const loadDiaClarityList = async () => {
        try {
            const response = await axios.get(`/dia_clarity`);
            setDiaClarityList(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        loadDiaOriginList();
        loadDiaColorList();
        loadDiaClarityList();
    }, []);

    const handleCreateDiamond = async () => {
        //check if all fields are filled
        if (!DiaOriginID || !DiaColorID || !DiaClarityID || !DiaWeight) {
            openNotificationWithIcon('error', 'Please fill all fields');
            return;
        }
        //check DiaID existed else continue
        const DiaID = DiaOriginID + DiaColorID + DiaClarityID
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
            axios.post(`/diamond`, {
                DiamondID: DiaID,
                DiaOriginID,
                DiaColorID,
                DiaClarityID,
                DiaWeight,
                DiaPicture: 'picture',
                DiaUnit: 'Ly',
                DiaCut: DiaCut
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
                <label>Dia Clarity:</label>
                {DiaClarityList.length > 0 && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select diamond clarity"
                        onChange={(value) => setDiaClarityID(value)}
                        value={DiaClarityID}
                    >
                        {DiaClarityList.map((diaClarity) => (
                            <Option key={diaClarity.DiaClarityID} value={diaClarity.DiaClarityID}>
                                {diaClarity.DiaClarityName} : {diaClarity.DiaClarityID}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Diamond Weight:</label>
                <InputNumber style={{ width: '100%' }} min={1} max={20} defaultValue={1} onChange={(value) => setDiaWeight(value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label>Diamond Cut:</label>
                {/* Select from round, oval, marquise, pear, heart, emerald, princess, radiant */}
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select diamond cut"
                    onChange={(value) => setDiaCut(value)}
                    value={DiaCut}
                >
                    <Option value="Round">Round</Option>
                    <Option value="Oval">Oval</Option>
                    <Option value="Marquise">Marquise</Option>
                    <Option value="Pear">Pear</Option>
                    <Option value="Heart">Heart</Option>
                    <Option value="Emerald">Emerald</Option>
                    <Option value="Princess">Princess</Option>
                    <Option value="Radiant">Radiant</Option>
                </Select>
            </div>
        </Modal>
    );
};

export default DiamondCreateModal;
