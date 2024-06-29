import React, { useEffect, useState } from 'react';
import { Modal, Select, Button } from 'antd';
import axios from "axios";

const { Option } = Select;

const CreateModal = ({ visible, onCreate, onCancel, deliveryEmployeeList, orderIDUpdate }) => {
    const [employeeId, setEmployeeId] = useState(null);
    const [status, setStatus] = useState(1);

    const handleEmployeeChange = (value) => {
        setEmployeeId(value);
    };

    const handleStatusChange = (value) => {
        setStatus(parseInt(value));
    };

    const handleUpdate = () => {
        console.log("orderupdate: " + orderIDUpdate);
        console.log("employeeID: " + employeeId);
        try {
            axios.put(`/order/${orderIDUpdate}`, {
                EmployeeIDShip: employeeId,
                OrdStatus: status
            }).then((response) => {
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (deliveryEmployeeList.length > 0) {
            setEmployeeId(deliveryEmployeeList[0].EmployeeID); // Setting first employeeId as default
        }
    }, [deliveryEmployeeList]);

    return (
        <Modal
            visible={visible}
            title="Create Entry"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleUpdate}
        >
            <div style={{ marginBottom: 16 }}>
                <label>Employee:</label>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select employee"
                    onChange={handleEmployeeChange}
                    value={employeeId}
                >
                    {deliveryEmployeeList.map((employee) => (
                        <Option key={employee.EmployeeID} value={employee.EmployeeID}>
                            {employee.EmpName}
                        </Option>
                    ))}
                </Select>
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

export default CreateModal;
