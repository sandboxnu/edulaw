import Logo from './Logo'
import { AppBar, Toolbar, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { PhoneOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
    height: '114px',
    boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    marginRight: '7px',
    height: 30,
  },
  info: {
    display: 'flex',
    position: 'absolute',
    right: 30,
    height: 33,
    flex: 2,
  },
  typography: {
    display: 'inline-block',
    verticalAlign: 'middle',
    flex: 'none',
  },
}))

function NavBar() {
  const classes = useStyles()
  return (
    <AppBar position="static" classes={{ root: classes.appBar }}>
      <Toolbar classes={{ root: classes.toolBar }}>
        <Logo classes={{ root: classes.logo }} />
        <div className={classes.info}>
          <PhoneOutlined classes={{ root: classes.icon }} />
          <Typography variant="body2" classes={{ root: classes.typography }}>
            (617)-910-5829
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            classes={{ root: classes.divider }}
          />
          <Typography variant="body2" classes={{ root: classes.typography }}>
            edlawproject@publiccounsel.net
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
