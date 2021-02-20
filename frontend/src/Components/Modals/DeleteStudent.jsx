import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function DeleteStudentModal(props) {
    const { id, getData } = props;

    const handleDelete = () => {
        var data = JSON.stringify({ _id: `${id}` });

        var config = {
            method: 'delete',
            url: 'http://localhost:5000/api/student/deleteStudent',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                getData();
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    };

    return (
        <div>
                <Button size='small' color = "secondary" onClick={handleDelete}>
                    DELETE
                </Button>
        </div>
    );
}
