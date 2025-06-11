import { useEffect } from 'react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import SeeNotice from '../../components/SeeNotice';
import Students from '../../assets/books.png';
import Classes from '../../assets/class.png';
import Teachers from '../../assets/teacher.png';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllStudents(adminID));
      dispatch(getAllSclasses(adminID, 'Sclass'));
      dispatch(getAllTeachers(adminID));
    }
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList?.length || 0;
  const numberOfClasses = sclassesList?.length || 0;
  const numberOfTeachers = teachersList?.length || 0;

  const stats = [
    {
      label: 'Total Students',
      image: Students,
      count: numberOfStudents,
      duration: 2.5,
    },
    {
      label: 'Total Classes',
      image: Classes,
      count: numberOfClasses,
      duration: 5,
    },
    {
      label: 'Total Teachers',
      image: Teachers,
      count: numberOfTeachers,
      duration: 2.5,
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-between h-52 text-center"
          >
            <img src={stat.image} alt={stat.label} className="w-20 h-20 mb-2" />
            <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
            <p className="text-2xl text-green-600 font-bold">
              <CountUp start={0} end={stat.count} duration={stat.duration} />
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <SeeNotice />
      </div>
    </div>
  );
};

export default AdminHomePage;
