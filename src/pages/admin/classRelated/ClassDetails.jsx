import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getClassDetails,
  getClassStudents,
  getSubjectList
} from "../../../redux/sclassRelated/sclassHandle";

import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const tabs = [
  { id: "1", label: "Details" },
  { id: "2", label: "Subjects" },
  { id: "3", label: "Students" },
  { id: "4", label: "Teachers" }
];

const ClassDetails = () => {
  const { id: classID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subjectsList, sclassStudents, sclassDetails, loading, response, getresponse } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  const [activeTab, setActiveTab] = useState("1");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, type) => {
    console.log(deleteID, type);
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const subjectColumns = [
    { id: 'name', label: 'Subject Name', minWidth: 170 },
    { id: 'code', label: 'Subject Code', minWidth: 100 },
  ];

  const subjectRows = subjectsList?.map(subject => ({
    name: subject.subName,
    code: subject.subCode,
    id: subject._id
  })) || [];

  const SubjectsButtonHaver = ({ row }) => (
    <div className="flex gap-2">
      <button onClick={() => deleteHandler(row.id, "Subject")}><DeleteIcon className="text-red-500" /></button>
      <BlueButton onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}>View</BlueButton>
    </div>
  );

  const subjectActions = [
    {
      icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
      action: () => navigate("/Admin/addsubject/" + classID)
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
      action: () => deleteHandler(classID, "SubjectsClass")
    }
  ];

  const studentColumns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
  ];

  const studentRows = sclassStudents?.map(student => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id
  })) || [];

  const StudentsButtonHaver = ({ row }) => (
    <div className="flex gap-2">
      <button onClick={() => deleteHandler(row.id, "Student")}><PersonRemoveIcon className="text-red-500" /></button>
      <BlueButton onClick={() => navigate("/Admin/students/student/" + row.id)}>View</BlueButton>
      <PurpleButton onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}>Attendance</PurpleButton>
    </div>
  );

  const studentActions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
      action: () => navigate("/Admin/class/addstudents/" + classID)
    },
    {
      icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
      action: () => deleteHandler(classID, "StudentsClass")
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "1":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Class Details</h2>
            <p className="text-lg">This is Class <span className="font-semibold">{sclassDetails?.sclassName}</span></p>
            <p>Number of Subjects: {subjectsList.length}</p>
            <p>Number of Students: {sclassStudents.length}</p>
            <div className="flex gap-4 mt-4">
              {getresponse && (
                <GreenButton onClick={() => navigate("/Admin/class/addstudents/" + classID)}>Add Students</GreenButton>
              )}
              {response && (
                <GreenButton onClick={() => navigate("/Admin/addsubject/" + classID)}>Add Subjects</GreenButton>
              )}
            </div>
          </div>
        );
      case "2":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Subjects List:</h2>
            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
            <SpeedDialTemplate actions={subjectActions} />
          </div>
        );
      case "3":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Students List:</h2>
            <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
            <SpeedDialTemplate actions={studentActions} />
          </div>
        );
      case "4":
        return (
          <div className="text-lg">Teachers</div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-4 py-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="sticky top-0 bg-white z-10 border-b mb-6">
            <div className="flex gap-4 p-4 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
            {renderTabContent()}
          </div>
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default ClassDetails;
