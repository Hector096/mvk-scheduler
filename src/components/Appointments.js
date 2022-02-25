// import React, { useState, useEffect } from 'react';
// import {
//   Table, Button, Spin, Alert,
// } from 'antd';
// // eslint-disable-next-line
// import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import { Redirect, useHistory } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useAlert } from 'react-alert';
// import { setMessage } from '../redux/actions/message';
// import UserService from '../services/user.service';
// import { refreshLogin } from '../redux/actions/auth';

// const Appointments = () => {
//   const [content, setContent] = useState('');
//   const history = useHistory();
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const { message } = useSelector(state => state.message);
//   const [successful, setSuccessful] = useState(false);
//   const { user: currentUser } = useSelector(state => state.auth);
//   const localUser = JSON.parse(localStorage.getItem('user'));

//   const newAppointment = () => {
//     history.push('/appointments/new');
//   };

//   const editAppointment = id => {
//     history.push(`/appointments/${id}`);
//   };

//   const onSelectChange = record => {
//     if (record.id) {
//       UserService.deleteAppointment(record.id).then(v => {
//         if (v.status === 201 || v.status === 200) {
//           setLoading(false);
//           setSuccessful(true);
//           alert.show('Appointment Deleted Successfully!', {
//             type: 'success',
//             timeout: 2000,
//           });
//         } else {
//           dispatch(setMessage('Something went wrong'));
//           setLoading(false);
//           setSuccessful(false);
//         }
//       })
//         .catch(() => {
//           dispatch(setMessage('Something went wrong'));
//           setLoading(false);
//           setSuccessful(false);
//         });
//     }
//   };
//   const columns = [
//     {
//       title: '',
//       dataIndex: 'action',
//       width: '50px',
//       render: (_, record) => (
//         <>
//           <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} className="me-2" onClick={() => { onSelectChange(record); }} />
//         </>
//       ),
//     },
//     {
//       title: '',
//       dataIndex: 'action',
//       width: '50px',
//       render: (_, record) => (
//         <>
//           <EditOutlined style={{ fontSize: '20px' }} onClick={() => { editAppointment(record.id); }} />
//         </>
//       ),
//     },
//     {
//       title: 'Patient Name',
//       dataIndex: 'patient_name',
//     },
//     {
//       title: 'Doctor Name',
//       dataIndex: 'doctor_name',
//     },
//     {
//       title: 'Date and Time',
//       dataIndex: 'scheduleDateTime',
//       sorter: {
//         compare: (a, b) => a.scheduleDateTime - b.scheduleDateTime,
//         multiple: 3,
//       },
//       render: scheduleDateTime => (<>{new Date(scheduleDateTime).toUTCString().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</>),
//     },
//     {
//       title: 'Appointment Type',
//       dataIndex: 'appointmentType',
//       sorter: {
//         compare: (a, b) => a.appointmentType - b.appointmentType,
//         multiple: 2,
//       },
//     },
//     {
//       title: 'Patient Status',
//       dataIndex: 'patientStatus',
//       sorter: {
//         compare: (a, b) => a.patientStatus - b.patientStatus,
//         multiple: 1,
//       },
//     },
//   ];

//   useEffect(() => {
//     if (currentUser) {
//       dispatch(refreshLogin(localUser.refresh_token)).then(() => {
//         UserService.getAppointments().then(
//           response => {
//             setLoading(false);
//             setContent(response.data.map(data => Object.assign(data, { key: data.id })));
//           },
//           error => {
//             setLoading(false);
//             const message = (error.response
//                 && error.response.data
//                 && error.response.data.message)
//               || error.message
//               || error.toString();
//             setContent(message);
//           },
//         );
//       })
//         .catch(() => {
//           localStorage.removeItem('user');
//         });
//     }
//   }, []);

//   // if (!currentUser) {
//   //   return <Redirect to="/login" />;
//   // }
//   // eslint-disable-next-line
//   const appointments = content

//   return (
//     <div className="container mt-4 border p-3">
//       {message && (
//       <div className="form-group">
//         <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
//           {message}
//         </div>
//       </div>
//       )}
//       <Button onClick={newAppointment} type="primary" style={{ marginBottom: 8, width: '100%', fontSize: '15px' }}>
//         Create New Appointment
//       </Button>
//       {loading && (
//         <Spin tip="Loading...">
//           <Alert
//             message="Alert message title"
//             description="Further details about the context of this alert."
//             type="info"
//           />
//         </Spin>
//       )}
//       <Table
//         hideDefaultSelections
//         className="border p-2"
//         columns={columns}
//         dataSource={appointments}
//         pagination={{ defaultPageSize: 6 }}
//       />
//     </div>
//   );
// };

// export default Appointments;
