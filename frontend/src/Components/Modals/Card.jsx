import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Color from "color";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditStudentModal from "./EditStudent";
import DeleteStudentModal from "./DeleteStudent";
import Divider from "@material-ui/core/Divider";
import NewStudentModal from "./NewStudent";

const useStyles = makeStyles((theme) => ({
    root: ({ color }) => ({
        minWidth: 200,
        textAlign: "center",
        borderRadius: 6,
        transition: "0.2s",
        boxShadow: "none",
        "&:hover": {
            transform: "scale(1.1)",
            boxShadow: `0 6px 12px 0 ${Color(color)
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)}`,
        },
    })
}));

export default function StudentCards(props) {
    const { id, name, email, bloodGrp, gender, place, image, getData } = props;
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root} variant="outlined">
                <CardContent justify="center" style={{ marginBottom: "5px" }}>
                    <img width="300px" height="200px" src={image} alt = "image"/>
                    <div style={{ marginLeft: "20px", textAlign: "left" }}>
                        <Typography>
                           <b>Name - </b> {name}
                        </Typography>
                        <Typography>
                        <b>Email - </b> {email}
                        </Typography>
                        <Typography>
                        <b>Place - </b>   {place}
                        </Typography>
                        <Typography >
                        <b>Blood Group - </b>  {bloodGrp}
                        </Typography>
                        <Typography>
                        <b>Gender - </b>   {gender}
                        </Typography>
                    </div>
                </CardContent>
                <Divider />

                <CardActions>
                    <EditStudentModal
                        id={id}
                        name={name}
                        email={email}
                        bloodGrp={bloodGrp}
                        gender={gender}
                        place={place}
                        image={image}
                        getData={getData}
                    />
                    <DeleteStudentModal getData={getData} id={id} />
                </CardActions>
            </Card>
        </>
    );
}
