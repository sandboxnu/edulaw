import React from 'react'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HomeOutlined, PlayCircleFilled } from '@material-ui/icons'; 

// todo: fix console error

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: "20px",
  },
  listItemIcon: {
    minWidth: '40px'
  }
}));

const StyledListItem = withStyles({
  root: {
    "&.Mui-selected": {
      background: 'linear-gradient(to right, #5064C7 0%, #5064C7 2%, #FFFFFF 2%, #FFFFFF 100%)',
      boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.15)',
    },
  },
})(ListItem);

function SideProgrssBar() { // todos: (for down the road) -- routing +  upon completion of section change icon to green checkmark
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event: any, index: number) => {  // todo: figure out actual type 
    setSelectedIndex(index);
  };

  const ProgressItem = ( text: string, index: number ) => {
    return (
      <StyledListItem 
        button
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
        >
        <ListItemIcon className={classes.listItemIcon}>
          <PlayCircleFilled style={{ color: `${selectedIndex === index ? '#5064C7' : '#E2E2E2'}` }}/>
        </ListItemIcon>
        <ListItemText 
          classes={{primary: classes.listItemText}}
          primary={text}/>
      </StyledListItem>
    );
  }
//margin='0 auto'
  return (
    <Box position='absolute' top='5%' left='10%' borderColor="#B8B8B8" borderRadius={3} sx={{width: '80%', bgcolor: "white"}}>
      <List dense={true}>
        <StyledListItem 
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <HomeOutlined/>
          </ListItemIcon>
          <ListItemText 
            classes={{primary: classes.listItemText}}
            primary='Home'/>
        </StyledListItem>
        {ProgressItem("ContactInfo", 1)}
        {ProgressItem("Additional Info", 2)}
        {ProgressItem("District and School", 3)}
        {ProgressItem("Student or Group Details", 4)}
        {ProgressItem("Concerns", 5)}
      </List>
    </Box>
  )
}

export default SideProgrssBar
