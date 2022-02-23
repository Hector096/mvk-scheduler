import axios from 'axios';
import authHeader from './auth.header';

const API_URL = 'https://frozen-river-95471.herokuapp.com/';

// eslint-disable-next-line
const getDoctors = () => axios.get(`${process.env.REACT_APP_BASE_GCC_URL}/rest/v2/entities/sec$User`, { headers: {"Authorization" : "Bearer 2bb61cb6-0fc9-4249-bf0f-62dfc515b1e9"} });

const getDoctor = id => axios.get(`${API_URL}api/v1/doctors/${id}`, { headers: authHeader() });
// eslint-disable-next-line
const getPatients = () => axios.get(`${process.env.REACT_APP_BASE_GCC_URL}/rest/v2/entities/gccirculus_Patient`,{ headers: {"Authorization" : "Bearer 2bb61cb6-0fc9-4249-bf0f-62dfc515b1e9"} });
// eslint-disable-next-line
const getAppointments = () => axios.get(`${process.env.REACT_APP_BASE_URL}/rest/v2/entities/appointment_Appointment`,{ headers: authHeader() });

const getAppointment = (userId, appointmentId) => axios.get(`${API_URL}api/v1/users/${userId}/appointments/${appointmentId}`, { headers: authHeader() });

const postAppointment = values => {
  const load = {
    appointmentType: values.appointmentType,
    paymentMode: values.paymentMode,
    reminderPeriod: values.reminderPeriod,
    paymentReference: values.paymentReference,
    reminderYes: values.reminderYes,
    scheduleDateTime: values.scheduleDateTime,
    remindAll: values.remindAll,
    appointmentFees: values.appointmentFees,
    patientStatus: values.patientStatus,
    doctor: { doctorName: values.doctor },
    patient: { patientName: values.patient },
  };
  try { return axios.post(`${process.env.REACT_APP_BASE_URL}/rest/v2/entities/appointment_Appointment`, load, { headers: authHeader() }); } catch (err) {
    return err.toString();
  }
};
const postPatient = values => {
  try {
    return axios.post(`${process.env.REACT_APP_BASE_GCC_URL}/rest/v2/entities/gccirculus_Patient`, values, { headers: { Authorization: 'Bearer 2bb61cb6-0fc9-4249-bf0f-62dfc515b1e9' } });
  } catch (err) {
    return err.toString();
  }
};

const deleteAppointment = appointmentId => {
  try { return axios.delete(`${process.env.REACT_APP_BASE_URL}/rest/v2/entities/appointment_Appointment/${appointmentId}`, { headers: authHeader() }); } catch (err) {
    return err.toString();
  }
};
export default {
  getDoctors,
  getDoctor,
  getAppointments,
  getPatients,
  getAppointment,
  postPatient,
  postAppointment,
  deleteAppointment,
};
