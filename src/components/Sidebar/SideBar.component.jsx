import React from 'react'
import { Menu } from 'semantic-ui-react'
import './SideBar.css'
// import UserInfo from './UserInfo/UserInfo.component'
import UserInfo_component from './UserInfo/UserInfo_component'
import Channels_component from './UserInfo/Channels/Channels_component'
import PrivateChat from './PrivateChat/PrivateChat'

export const SideBar = () => {
  return (
    <Menu vertical fixed="left" borderless size="large" className="side_bar">
      <UserInfo_component />
      <Channels_component />
      <PrivateChat/>
    </Menu>
  )
}

export default SideBar
