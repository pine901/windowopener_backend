import { useRef, useState } from "react";
import { Modal, Input, Form, Select } from "antd";
import constants from "../config/constants";

export default function UserModal(props) {
    const [form] = Form.useForm();
    const formRef = useRef();
    const [requiredMark] = useState("optional");
    return (
        <Modal
            title="Add New User"
            visible={props.isModalVisible}
            onOk={form.submit}
            onCancel={props.handleCancel}
        >
            <Form
                form={form}
                ref={formRef}
                layout="vertical"
                initialValues={{ requiredMarkValue: requiredMark }}
                onFinish={props.onSubmit}
                requiredMark={requiredMark}
            >
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Full Name"
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select Role"
                        optionFilterProp="children"
                    >
                        <Select.Option key={1} value="admin">Admin</Select.Option>
                        <Select.Option key={2} value="customer">App User</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Password"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
