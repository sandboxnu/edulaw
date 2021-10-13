import Logo from './Logo'
import { AppBar, Toolbar, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        padding: '0px',
        justifyContent: 'space-between'
    },
    logo: {
        flex: 'none'
    },
    divider: {
        // color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.dark,
        // borderStyle: 'inset',
        // borderWidth: '1px'
        display: 'inline-block',
        verticalAlign: 'middle',
        flex: 'none'
    },
    appBar: {
        height: '114px'
    }
}));

export default function NavBar() {
    const classes = useStyles(); // TODO: Fix console warning -- has to do with SSR
    return (
        <AppBar position="static" classes={{ root: classes.appBar }}>
            <Toolbar classes={{ root: classes.toolBar }}>
                <Logo classes={{root: classes.logo}}/>
                <div style={{display: 'flex', position: 'absolute', right: 30, height: 33, flex: 2}}>
                    <Typography variant='body2' style={{display: 'inline-block', verticalAlign: 'middle', flex: 'none'}}>(123)-456-7890</Typography>
                    <Divider orientation='vertical' variant="middle" classes={{root: classes.divider}}></Divider>
                    <Typography variant='body2' style={{display: 'inline-block', verticalAlign: 'middle', flex: 'none'}}>edu@law.com</Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}