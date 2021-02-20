import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#eceff1',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function EditStudentModal(props) {
    const { id, name, email, bloodGrp, gender, place, image, getData } = props;
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newCity, setNewCity] = useState(place);
    const [newGender, setNewGender] = useState(gender);
    const [newBloodGrp, setNewBloodGrp] = useState(bloodGrp);
    const [newAvatar, setNewAvatar] = useState(image);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditStudent = () => {
        axios
            .put(`http://localhost:5000/api/student/editStudent`, {
                _id: id,
                name: newName,
                email: newEmail,
                bloodGrp: newBloodGrp,
                city: newCity,
                imageLink:
                    newAvatar ||
                    'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
                gender: newGender,
            })
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
        handleClose();
    };

    return (
        <div>
                <Button
                    size='small'
                    onClick={() => {
                        handleOpen();
                    }}
                >
                    Edit
                </Button>
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
                {/* <Fade in={open}> */}
                    <div className={classes.paper}>
                        <h2 style={{ marginTop: '0px' }}>
                            Edit Student Details.
                        </h2>
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                            Name :  <input style  ={{padding : "10px"}}  value={newName} onChange={(e) => setNewName(e.target.value)}></input>
                        </div>
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                            Email :  <input style  ={{padding : "10px"}}  value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></input>
                        </div>
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                            City :  <input style  ={{padding : "10px"}}  value={newCity} onChange={(e) => setNewCity(e.target.value)}></input>
                        </div>
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                            Gender :  <input style  ={{padding : "10px"}} value={newGender} onChange={(e) => setNewGender(e.target.value)}></input>
                        </div>
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                            Blood Group :  <input style  ={{padding : "10px"}}  value={newBloodGrp} onChange={(e) => setNewBloodGrp(e.target.value)}></input>
                        </div>
                        <div style = {{marginTop : "20px", marginBottom : "10px"}}>
                            Avatar :  <input style  ={{padding : "10px"}} value={newAvatar} onChange={(e) => setNewAvatar(e.target.value)}></input>
                        </div>

                        <Divider />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleEditStudent}
                                >
                                    Save
                                </Button>
                                {/* <Button
                                    variant='contained'
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button> */}
                    </div>
                {/* </Fade> */}
            </Modal>
        </div>
    );
}
