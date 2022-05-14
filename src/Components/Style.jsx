import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        background: 'black',
        color: 'white'
    },
    teacherprofile : {
        height: '400px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        borderRadius: 10,
        border : '1px solid #E5E5E5'
    },
    teacherListHeader: {
        height: '70px',
        display: 'flex',
        alignItems: "center",
        marginLeft: 10,
    },
    teacherSearch: {
        width: '50%',
        height: '30px',
        borderRadius: 10,
        backgroundColor: 'rgba(216, 216, 216, 0.8)',
        border:'none',
    },
    chosenTeacher: {
        
    },
    nouvelHeader: {
        backgroundColor: 'white',
        width: '100%',
        height: '140px',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#2196F3',
        },
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}))

export default useStyles;