import React, { useState, useEffect } from 'react';
import './index.css';
import StudentCards from './Components/Modals/Card';
import NewStudentModal from "./Components/Modals/NewStudent"
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import Login from './Components/login_register';

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '40px',
        paddingRight: '40px',
    },
});

export default function App() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    let [page, setPage] = useState(1);
    let [limit] = useState(4);
    let [total, setTotal] = useState(0);

    const getInitialData = () => {
        axios
            .get('http://localhost:5000/api/student')
            .then((res) => {
                console.log(res.data.length);
                setTotal(res.data.length);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getInitialData();
    }, [data]);

    const getData = () => {
        let url = 'http://localhost:5000/api/student/pagination';

        axios
            .get(url, { params: { page: page, limit: limit } })
            .then((res) => {
                setData(res.data.current);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData();
    }, [page, limit]);

    return (
        <div>
            {/* <div><Login/></div> */}
            <div style = {{fontSize : "35px", fontWeight : "bold",textAlign : "center"}}>Student's Data</div>
            <br/>
            <div style = {{textAlign : "center"}}> <NewStudentModal/> </div>
            <br/>
            <br/>
        
            <div>
                <Grid container spacing={4} className={classes.gridContainer}>
                    {data &&
                        data.map((student) => (
                            <Grid item xs={12} sm={6} md={3} key={student._id}>
                                {' '}
                                <StudentCards
                                    id={student._id}
                                    name={student.Name}
                                    email={student.Email}
                                    place={student.City}
                                    bloodGrp={student.BloodGrp}
                                    gender={student.Gender}
                                    image={student.ImageLink}
                                    getData={() => getData()}
                                />{' '}
                            </Grid>
                        ))}
                </Grid>
            </div>

            <div>
                <br></br>
                {
                    <Grid container justify='center'>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            color='secondary'
                            size='large'
                            onChange={(e, value) => setPage(value)}
                        />
                    </Grid>
                }
                <br></br>
            </div>
        </div>
    );
}
