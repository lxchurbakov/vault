import _ from 'lodash'

import React from 'react'
import { Input } from 'antd'

type User = { name: string, age: number }

export default ({ user, onChange }: { user: User, onChange: any }) => {
  const { name, age } = user

  const setName = (name) => onChange({ ...user, name })
  const setAge = (age) => onChange({ ...user, age })

  return (
    <div>
      <Input value={name} onChange={setName} />
      <Input type="text" value={age} onChange={setAge} />
    </div>
  )
}