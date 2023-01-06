import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Row, Col, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/Authenticate/actions";

function Profile() {
    const dispatch = useDispatch();
    const { email, name, wrongOldPassword } = useSelector((state) => state.authenticateReducer);
    const onSubmit = (values) => {
        dispatch({
            type: actions.UPDATE_PROFILE,
            payload: values,
        });
    };
    const onChangePassword = (values) => {
        dispatch({
            type: actions.CHANGE_PASSWORD,
            payload: values
        })
    };
    const deleteAccount = () => {
        Modal.confirm({
            title: "Do you really want to delete your acccount?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch({
                    type: actions.DELETE_ACCOUNT,
                });
            },
            onCancel() {},
        });
    };
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Your Profile">
                        <Form
                            layout="vertical"
                            initialValues={{
                                email: email,
                                firstName: name.split(" ")[0],
                                lastName: name.split(" ")[1],
                            }}
                            onFinish={onSubmit}
                        >
                            <Form.Item label="First name" name="firstName">
                                <Input placeholder="Nick" />
                            </Form.Item>
                            <Form.Item label="Last name" name="lastName">
                                <Input placeholder="Drewe" />
                            </Form.Item>
                            <Form.Item label="Email address" name="email">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Change password">
                        <Form layout="vertical" onFinish={onChangePassword}>
                            <Form.Item
                                label="Old password"
                                name="old_password"
                                hasFeedback
                                validateStatus={wrongOldPassword && "error"}
                                help={wrongOldPassword && "Old password is wrong."}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input old password!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="New password"
                                name="new_password"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input new password!",
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirm password"
                                name="confirm_password"
                                hasFeedback
                                dependencies={["new_password"]}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("new_password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "The two passwords that you entered do not match!"
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Change Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={12} style={{ marginTop: "1rem" }}>
                    <Card title="Delete account">
                        <Button
                            danger
                            style={{ width: "50%" }}
                            onClick={deleteAccount}
                        >
                            Delete account
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
