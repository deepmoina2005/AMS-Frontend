import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import pic from "../../assets/smile.png";
import { deleteUser, updateUser } from "../../redux/userRelated/userHandle";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../redux/userRelated/userSlice";
import { Button, Collapse } from "@mui/material";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const [showTab, setShowTab] = useState(false);
  const buttonText = showTab ? "Cancel" : "Edit profile";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { currentUser } = useSelector((state) => state.user);
  const { currentUser, response, error } = useSelector((state) => state.user);
  const address = "Admin";

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState(currentUser.schoolName);

  const fields =
    password === ""
      ? { name, email, schoolName }
      : { name, email, password, schoolName };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, currentUser._id, address));
  };

  const deleteHandler = () => {
    try {
      dispatch(deleteUser(currentUser._id, "Students"));
      dispatch(deleteUser(currentUser._id, address));
      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="vh-100" style={{ flex: 1 }}>
        <MDBContainer>
          <MDBRow className="justify-content-center">
            <MDBCol md="9" lg="7" xl="5" className="mt-5">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: "180px", borderRadius: "10px" }}
                        src={pic}
                        alt="Generic placeholder image"
                        fluid
                      />
                    </div>
                    <div className="flex-grow-1 ms-3" style={{flexDirection:"row"}}>
                      <MDBCardTitle style={{fontSize:25}}>Name: <h5>{currentUser.name}</h5></MDBCardTitle>

                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2">
                        <div>
                          <MDBCardTitle style={{fontSize:25}} className="mb-0">Email: <h5>{currentUser.email}</h5></MDBCardTitle>
                        </div>
                        <div className="px-3">
                          <MDBCardTitle style={{fontSize:25}} className="mb-0">School Name: <h5>{currentUser.schoolName}</h5></MDBCardTitle>
                        </div>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Button variant="contained" color="error" onClick={deleteHandler}>
          Delete
        </Button>
        <Button
          variant="contained"
          sx={styles.showButton}
          onClick={() => setShowTab(!showTab)}
        >
          {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          {buttonText}
        </Button>
      </div>

      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <div className="register">
          <form className="registerForm" onSubmit={submitHandler}>
            <span className="registerTitle">Edit Details</span>
            <label>Name</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />

            <label>School</label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your school name..."
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
              autoComplete="name"
              required
            />

            <label>Email</label>
            <input
              className="registerInput"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <label>Password</label>
            <input
              className="registerInput"
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />

            <button className="registerButton" type="submit">
              Update
            </button>
          </form>
        </div>
      </Collapse>
    </div>
  );
};

export default AdminProfile;

const styles = {
  attendanceButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    },
  },
};
