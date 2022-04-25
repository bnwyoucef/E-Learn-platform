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
        
    } 
}))

export default useStyles;