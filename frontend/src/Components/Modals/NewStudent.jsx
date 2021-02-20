import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#e3f2fd',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default function NewStudentModal(props) {
    const { getData } = props;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGrp, setBloodGrp] = useState('');
    const [avatar, setAvatar] = useState(
        'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
    );
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewStudent = () => {
        axios
            .post('http://localhost:5000/api/student/addStudent', {
                name: name,
                email: email,
                bloodGrp: bloodGrp,
                city: city,
                imageLink: avatar,
                gender: gender,
            })
            .then((res) => {
                getData();
                // setFlag(true);
            })
            .catch((err) => {
                console.log(err);
                // setFlag(false);
                // alert(err);
            });
        setDefault();
        handleClose();
    };

    const setDefault = () => {
        setName('');
        setEmail('');
        setGender('');
        setCity('');
        setBloodGrp('');
        setAvatar(
            'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
        );
    };

    return (
        <div>
            <Button onClick={handleOpen} style = {{backgroundColor : "white"}}>Add Student</Button>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                    <div className={classes.paper}>
                        <h2 style={{ marginTop: '0px' }}>
                            New Student Details.
                        </h2> 
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>             
                         Name : <input style  ={{padding : "10px"}} onChange = {(e)=> setName(e.target.value)}></input><br/>
                         </div> 
                         <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                         Email : <input style  ={{padding : "10px"}} onChange = {(e)=> setEmail(e.target.value)}></input><br/>
                         </div>
                         <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                         City : <input style  ={{padding : "10px"}} onChange = {(e)=> setCity(e.target.value)}></input><br/>
                         </div>
                         <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                         Gender : <input style  ={{padding : "10px"}} onChange = {(e)=> setGender(e.target.value)}></input><br/>
                         </div>
                         <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                         Bloodgroup : <input style  ={{padding : "10px"}} onChange = {(e)=> setBloodGrp(e.target.value)}></input><br/>
                         </div>
                         <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                         Avatar : <input style  ={{padding : "10px"}} onChange = {(e)=> setAvatar(e.target.value)}></input><br/>
                         </div>
                                <Button
                                    variant='contained'
                                    style={{ marginTop: '10px' }}
                                    onClick={handleNewStudent}
                                >
                                    Save
                                </Button>
                                {/* <Button
                                    variant='contained'
                                    color='secondary'
                                    style={{ marginTop: '10px' }}
                                    onClick={handleClose}
                                >
                                    Cancle
                                </Button> */}
                    </div>
            </Modal>
        </div>
    );
}
