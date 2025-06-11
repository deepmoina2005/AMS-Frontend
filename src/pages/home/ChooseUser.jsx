import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, School, Group } from "@mui/icons-material";
import { loginUser } from "../../redux/userRelated/userHandle";
import Popup from "../../components/Popup";

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Adminlogin");
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Studentlogin");
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate("/Teacherlogin");
      }
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Student") {
        navigate("/Student/dashboard");
      } else if (currentRole === "Teacher") {
        navigate("/Teacher/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center pb-10">
          Choose Your Role
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Admin Card */}
          <div
            onClick={() => navigateHandler("Admin")}
            className="bg-white text-gray-800 hover:bg-indigo-100 p-8 rounded-2xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-gray-200"
          >
            <div className="mb-4 text-5xl text-indigo-600">
              <AccountCircle fontSize="inherit" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Admin</h2>
            <p className="text-sm text-gray-600">
              Login as an administrator to manage platform data and users.
            </p>
          </div>

          {/* Student Card */}
          <div
            onClick={() => navigateHandler("Student")}
            className="bg-white text-gray-800 hover:bg-indigo-100 p-8 rounded-2xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-gray-200"
          >
            <div className="mb-4 text-5xl text-indigo-600">
              <School fontSize="inherit" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Student</h2>
            <p className="text-sm text-gray-600">
              Login as a student to access classes, assignments, and progress.
            </p>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => navigateHandler("Teacher")}
            className="bg-white text-gray-800 hover:bg-indigo-100 p-8 rounded-2xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border border-gray-200"
          >
            <div className="mb-4 text-5xl text-indigo-600">
              <Group fontSize="inherit" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Teacher</h2>
            <p className="text-sm text-gray-600">
              Login as a teacher to create and manage learning content.
            </p>
          </div>
        </div>
      </div>

      {loader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 text-white text-lg font-medium">
          <div className="flex items-center gap-3">
            <svg
              className="animate-spin h-6 w-6 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Please Wait...
          </div>
        </div>
      )}

      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default ChooseUser;
