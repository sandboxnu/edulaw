import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

interface MenuItemProps {
  label: string
  link: string
}

const SubMenuItem: React.FC<MenuItemProps> = ({ label, link }) => {
  return (
    <Link href={link} passHref>
      <ListItemButton sx={{ width: '100%' }}>
        <ListItemText
          primary={
            <Typography variant="h6">
              <ul style={{ listStyleType: 'disc' }}>
                <li>{label}</li>
              </ul>
            </Typography>
          }
          sx={{ pl: 7 }}
        />
      </ListItemButton>
    </Link>
  )
}

export default SubMenuItem
