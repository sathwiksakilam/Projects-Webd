import React from 'react'
import { Segment,Header,Input,Icon} from 'semantic-ui-react'

const Message_Header = (props) => {
  return (
     <Segment clearing>
        <Header floated='left' fluid='true' as='h2' >
            <span>
                {(props.isPrivateChat ? "@":"#") + props.channelName}
                {!props.isPrivateChat && <Icon name="star outline"/>}
            </span>
            <Header.Subheader>{props.uniqueUsers} User{props.uniqueUsers===1?"":"s"}</Header.Subheader>
        </Header>
        <Header floated='right'>
        {/* onChange={props.searchTermChange} */}
            <Input name="search" icon="search" placeholder="Search Messages" size='mini'/>
        </Header>
     </Segment>
  )
}

export default Message_Header
