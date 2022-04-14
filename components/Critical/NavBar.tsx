import Logo from './Logo'
import { AppBar, Toolbar, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { COLORS } from '../../constants/colors'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    padding: '0px',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 'none',
  },
  divider: {
    backgroundColor: theme.palette.primary.dark,
    display: 'inline-block',
    verticalAlign: 'middle',
    flex: 'none',
    marginLeft: '22px',
    marginRight: '22px',
  },
  appBar: {
    backgroundColor: COLORS.EDLAW_BLUE,
    height: '80px',
    boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    color: 'white',
    marginRight: '7px',
    height: 30,
  },
  info: {
    display: 'flex',
    marginRight: 120,
    alignItems: 'center',
  },
  typography: {
    display: 'flex',
    flex: 'none',
    color: 'white',
    fontSize: 16,
  },
}))

function NavBar() {
  const classes = useStyles()
  return (
    <AppBar position="static" classes={{ root: classes.appBar }}>
      <Toolbar classes={{ root: classes.toolBar }}>
        <Logo classes={{ root: classes.logo }} />
        <div className={classes.info}>
          <HelpOutlineIcon classes={{ root: classes.icon }} />
          <Typography classes={{ root: classes.typography }}>
            Need help?
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
