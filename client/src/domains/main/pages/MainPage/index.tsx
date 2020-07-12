import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'

export default () => {
  return (
    <Layout>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="books">Books</Menu.Item>
          <Menu.Item key="films">Films</Menu.Item>
        </Menu>
      </Layout.Header>

      <Layout.Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </Layout.Content>
    </Layout>

  )
}
