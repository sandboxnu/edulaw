import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface MenuItemProps {
  label: string;
}

const SubMenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return (
    <ListItemButton sx={{ width: '100%' }}>
      <ListItemText 
        primary={<Typography variant="h6">{label}</Typography>} 
        sx={{ pl: 4 }} 
      />
    </ListItemButton>
  );
}

export default SubMenuItem;