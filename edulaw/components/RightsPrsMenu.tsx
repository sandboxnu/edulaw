import React from 'react'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

// todo: finish this component (Connie)

function RightsPrsMenu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ width: '300px' }}> 
      <List>
        <ListItem 
          button
        >
          <ListItemText primary='Student Rights'/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding dense={true}>
            <ListItem button>
              <ListItemText 
                primary={<Typography variant="h6">School Discipline & Education</Typography>}/>
            </ListItem>
            <ListItem button>
              <ListItemText primary='Special Education'/>
            </ListItem>
            <ListItem button>
              <ListItemText primary='Bullying'/>
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        <ListItem 
          button
          onClick={handleClick}
        >
          <ListItemText primary='About PRS'/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding dense={true}>
            <ListItem button>
              <ListItemText primary='How do I file a complaint?'/>
            </ListItem>
            <ListItem button>
              <ListItemText primary='When can I file a complaint?'/>
            </ListItem>
            <ListItem button>
              <ListItemText primary='Who can file a complaint?'/>
            </ListItem>
            <ListItem button>
              <ListItemText primary='What happens when I file?'/>
            </ListItem>
          </List>
        </Collapse>

        <Divider />
      </List>
    </Box>
  )
}

export default RightsPrsMenu
