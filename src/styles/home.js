import { makeStyles } from '@material-ui/core/styles';

export const homeStyles = makeStyles(theme => ({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper: {
        padding:20 
    }
}));
