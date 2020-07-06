import React from 'react'

import ContentContainer from '@/components/elements/ContentContainer'
import ContentSection from '@/components/elements/ContentSection'

import { Breadcrumb, Button, Typography } from 'antd'

export default () => {
  return (
    <ContentContainer style={{ paddingTop: 24 }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="#">Dashboard</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <ContentSection
        style={{ marginTop: 36 }}
        title="Available Vaults"
        right={<Button>Create</Button>}
      >
        <Typography.Text disabled>No Vaults Available</Typography.Text>
      </ContentSection>
    </ContentContainer>
  )
}