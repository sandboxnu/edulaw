import React from 'react'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider';
// todo: finish this component (Connie)

function RightsPrsMenu() {
  return (
    <Box> 
      <List>
        <ListItem button>
          <ListItemText primary='Student Rights'/>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary='About PRS'/>
        </ListItem>
        <Collapse>

        </Collapse>
        <Divider />
      </List>
    </Box>
  )
}

export default RightsPrsMenu
