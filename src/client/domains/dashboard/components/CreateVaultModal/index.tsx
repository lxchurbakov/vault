import React from 'react'
import { Form, Input, Button, Modal } from 'antd'

type Props = {
  visible: boolean
  onSubmit: any
  onCancel: any
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export default class AvailableVaults extends React.PureComponent<Props> {
  render () {
    const { visible, onSubmit, onCancel } = this.props

    return (
      <Modal visible={visible} onCancel={onCancel} footer={null}>
        <h1 style={{ marginBottom: 48 }}>Create Vault</h1>

        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            style={{ marginBottom: 20 }}
            label="Vault Name"
            name="name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item

            label="Password"
            name="password"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}