import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        background: 'black',
        color: 'white'
    },
    teacherprofile : {
        height: '50vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        borderRadius: 10,
    },
    teacherListHeader: {
        height: '15%',
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
        width: '340px',
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