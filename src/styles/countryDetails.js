import { makeStyles } from '@material-ui/core/styles';

export const countryDetailsStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
      },
    card: {
        maxWidth: 275,
        margin:10
    },
    title: {
        fontSize: 14,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
