import axios from 'axios';
import authHeader from './auth.header';

// eslint-disable-next-line
const getDoctors = () => axios.get(`${process.env.REACT_APP_BASE_GCC_URL}/rest/v2/entities/sec$User`, { headers: {"Authorization" : "Bearer 1b1b226f-3aa7-40e1-9bb1-811f0b4809fb"} });

// eslint-disable-next-line
const getPatients = () => axios.get(`${process.env.REACT_APP_BASE_GCC_URL}/rest/v2/entities/gccirculus_Patient`,{ headers: {"Authorization" : "Bearer 1b1b226f-3aa7-40e1-9bb1-811f0b4809fb"} });
// eslint-disable-next-line
const getAppointments = () => axios.get(`${process.env.REACT_APP_BASE_URL}/rest/v2/entities/appointment_Appointment`,{ headers: authHeader() });

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
    return axios.post(`${process.env.REACT_APP_BASE_GCC_URL}/rest/v2/entities/gccirculus_Patient`, values, { headers: { Authorization: 'Bearer 1b1b226f-3aa7-40e1-9bb1-811f0b4809fb' } });
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
  getAppointments,
  getPatients,
  postPatient,
  postAppointment,
  deleteAppointment,
};
