import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  TextField,
} from '@mui/material';

import {
  Delete as DeleteIcon,
  NoteAdd as NoteAddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { noticesList, loading, error, response } = useSelector(state => state.notice);
  const { currentUser } = useSelector(state => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const rowsPerPage = 10;

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    }
  }, [currentUser?._id, dispatch]);

  const deleteHandler = async (deleteID, address) => {
    try {
      await dispatch(deleteUser(deleteID, address));
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } catch (err) {
      setMessage('Error deleting notice');
      setShowPopup(true);
    }
  };

  // Filter notices by search term (title/details)
  const filteredNotices = Array.isArray(noticesList)
    ? noticesList.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.details.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredNotices.length / rowsPerPage);

  // Paginate filtered notices
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination range helper (max 5 pages)
  const getPaginationRange = () => {
    const totalPageButtons = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = startPage + totalPageButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - totalPageButtons + 1, 1);
    }

    const range = [];
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    return range;
  };

  // Action menu for each notice row
  const ActionMenu = ({ noticeId }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <>
        <Tooltip title="More Actions">
          <IconButton
            onClick={handleClick}
            size="small"
            className="text-gray-600 hover:text-gray-800"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: { mt: 1.5, minWidth: 140, borderRadius: 2, py: 1, bgcolor: "background.paper" },
          }}
        >
          <MenuItem
            onClick={() => {
              deleteHandler(noticeId, "Notice");
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" className="text-red-600" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };

  // Top-level actions for all notices
  const topActions = [
    {
      icon: <NoteAddIcon className="text-blue-600" />,
      name: 'Add New Notice',
      action: () => navigate('/Admin/addnotice'),
      type: 'add',
    },
    {
      icon: <DeleteIcon className="text-red-600" />,
      name: 'Delete All Notices',
      action: () => deleteHandler(currentUser._id, 'Notices'),
      type: 'delete',
    },
  ];

  return (
    <div className="w-full px-6 py-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="max-w-md w-full"
            InputProps={{ className: 'text-gray-700' }}
          />
          <div className="flex space-x-3">
            {topActions.map(({ icon, name, action, type }, idx) => (
              <button
                key={idx}
                onClick={action}
                className={`flex items-center space-x-2 px-5 py-2 rounded-md font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  type === 'delete'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-400'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-400'
                }`}
                aria-label={name}
                type="button"
              >
                {icon}
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        ) : response ? (
          <div className="text-right mb-6">
            <button
              onClick={() => navigate('/Admin/addnotice')}
              className="bg-green-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-700 transition"
            >
              Add Notice
            </button>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No notices found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full text-left text-gray-700 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Details</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedNotices.map(({ _id, title, details, date }) => {
                  const dateString = new Date(date).toISOString().substring(0, 10);
                  return (
                    <tr key={_id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{title}</td>
                      <td className="px-6 py-4">{details}</td>
                      <td className="px-6 py-4">{dateString}</td>
                      <td className="px-6 py-4 text-center">
                        <ActionMenu noticeId={_id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <nav
              className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 bg-white border-t border-gray-200"
              aria-label="Table navigation"
            >
              <span className="text-sm text-gray-600 mb-3 sm:mb-0">
                Showing{' '}
                <span className="font-semibold text-gray-800">
                  {(currentPage - 1) * rowsPerPage + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-gray-800">
                  {Math.min(currentPage * rowsPerPage, filteredNotices.length)}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-gray-800">{filteredNotices.length}</span>{' '}
                notices
              </span>

              <ul className="inline-flex items-center space-x-1 text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    className="px-4 py-2 border rounded-l-md bg-white text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Previous page"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {getPaginationRange()[0] > 1 && (
                  <>
                    <li>
                      <button
                        onClick={() => setCurrentPage(1)}
                        className={`px-4 py-2 border ${
                          currentPage === 1
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        aria-current={currentPage === 1 ? 'page' : undefined}
                      >
                        1
                      </button>
                    </li>
                    {getPaginationRange()[0] > 2 && (
                      <li>
                        <span className="px-2 py-2 text-gray-500 select-none">...</span>
                      </li>
                    )}
                  </>
                )}

                {getPaginationRange().map(page => (
                  <li key={page}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border ${
                        page === currentPage
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                {getPaginationRange()[getPaginationRange().length - 1] < totalPages && (
                  <>
                    {getPaginationRange()[getPaginationRange().length - 1] < totalPages - 1 && (
                      <li>
                        <span className="px-2 py-2 text-gray-500 select-none">...</span>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`px-4 py-2 border ${
                          currentPage === totalPages
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        aria-current={currentPage === totalPages ? 'page' : undefined}
                      >
                        {totalPages}
                      </button>
                    </li>
                  </>
                )}

                <li>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    className="px-4 py-2 border rounded-r-md bg-white text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Next page"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {showPopup && (
          <Popup message={message} onClose={() => setShowPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default ShowNotices;
