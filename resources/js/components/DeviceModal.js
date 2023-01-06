import { useRef, useState } from "react";
import { Modal, Input, Form, Select } from "antd";

export default function DeviceModal(props) {
    const [form] = Form.useForm();
    const formRef = useRef();
    const [requiredMark] = useState("optional");
    return (
        <Modal
            title="Add New Device"
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
                    label="Alias"
                    name="alias"
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Alias"
                    />
                </Form.Item>
                <Form.Item
                    label="DeviceID"
                    name="device_address"
                    rules={[{ required: true }]}
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Device ID"
                    />
                </Form.Item>
                <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select Type"
                        optionFilterProp="children"
                    >
                        <Select.Option key={1} value="1">Opener</Select.Option>
                        <Select.Option key={2} value="2">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location"
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Location"
                    />
                </Form.Item>
                <Form.Item label="Method" name="is_auto" rules={[{ required: true }]}>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select Method"
                        optionFilterProp="children"
                    >
                        <Select.Option key={1} value="Yes">Auto</Select.Option>
                        <Select.Option key={2} value="No">Manaul</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Low Temperature"
                    name="low_temperature"
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Location"
                    />
                </Form.Item>
                <Form.Item
                    label="High Temperature"
                    name="high_temperature"
                >
                    <Input
                        style={{ width: "100%" }}
                        placeholder="Location"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
