import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {
  Form, Input, DatePicker, Select, Typography, Button, InputNumber, Checkbox,
} from 'antd';
import { setMessage } from '../redux/actions/message';
import userService from '../services/user.service';
import getDoctors from '../redux/actions/user';
import getPatients from '../redux/actions/patients';

const EditAppointment = () => {
  const history = useHistory();
  const { Option } = Select;
  const { Title } = Typography;
  const { user: currentUser } = useSelector(state => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const { message } = useSelector(state => state.message);
  const { doctors } = useSelector(state => state.user);
  const { patients } = useSelector(state => state.patients);
  const dispatch = useDispatch();
  const alert = useAlert();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
      lg: {
        offset: 0,
      },
    },
  };

  useEffect(() => {
    if (doctors.length === 0 && currentUser) {
      setLoadingDoctors(true);
      dispatch(getDoctors())
        .then(() => {
          setLoadingDoctors(false);
        })
        .catch(() => {
          dispatch(setMessage('Unable to get doctors list'));
        });
    }
    if (patients.length === 0 && currentUser) {
      setLoadingPatients(true);
      dispatch(getPatients())
        .then(() => {
          setLoadingPatients(false);
        })
        .catch(() => {
          dispatch(setMessage('Unable to get Patient list'));
        });
    }
  }, []);

  const onFinish = values => {
    setLoading(true);
    setSuccessful(false);
    // eslint-disable-next-line
     Object.keys(values).forEach(key => values[key] === undefined && delete values[key]);
    // eslint-disable-next-line
    values.scheduleDateTime = values.scheduleDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS").split('T').join(" ");
    if (values.reminderPeriod !== undefined) {
      // eslint-disable-next-line
    values.reminderPeriod = values.reminderPeriod.format("YYYY-MM-DDTHH:mm:ss.SSS").split('T').join(" ");
    }
    console.log(values);
    if (values) {
      userService.postAppointment(values)
        .then(v => {
          if (v.status === 201 || v.status === 200) {
            setLoading(false);
            setSuccessful(true);
            alert.show('Appointment created', {
              type: 'success',
              timeout: 2000,
            });
          } else {
            dispatch(setMessage('Something went wrong'));
            setLoading(false);
            setSuccessful(false);
          }
        })
        .catch(() => {
          dispatch(setMessage('Something went wrong'));
          setLoading(false);
          setSuccessful(false);
        });
    } else {
      setLoading(false);
    }
  };

  const options = doctors.map(doctor => (
    <Option
      key={doctor.id}
      value={doctor.name}
    >
      {doctor.name}
    </Option>
  ));

  const patientOptions = patients.map(patient => (
    <Option
      key={patient.id}
      value={`${patient.firstName} ${patient.lastName}`}
    >
      {`${patient.firstName} ${patient.lastName}`}
    </Option>
  ));

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (successful) {
    return <Redirect to="/appointments" />;
  }
  const newPatient = () => {
    history.push('/patient/new');
  };

  return (
    <div className="container mt-4">
      <Title className="text-center mb-5">Edit Appointment</Title>
      {message && (
      <div className="form-group">
        <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
          {message}
        </div>
      </div>
      )}
      {/* eslint-disable-next-line */}
      <Form {...formItemLayout} className="p-5 border" name="newpatient" onFinish={onFinish} >
        <Form.Item
          label="Appointment Date"
          name="scheduleDateTime"
          rules={[
            {
              required: true,
              message: 'Please input registration date',
            },
          ]}
        >
          <DatePicker
            showTime
            allowClear
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label="Select Doctor"
          name="doctor"
          rules={[
            {
              required: true,
              message: 'Please Select Doctor',
            },
          ]}
        >
          <Select allowClear showSearch>
            {loadingDoctors ? <Option>Loading..</Option> : options }
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Patient"
          name="patient"
          showSearch
          rules={[
            {
              required: true,
              message: 'Please Select Patient',
            },
          ]}
        >
          <Select
            allowClear
          >
            {loadingPatients ? <Option>Loading..</Option> : patientOptions }
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button
            type="dashed"
            block
            onClick={newPatient}
            style={{
              width: '100%',
            }}
          >
            Create New Patient
          </Button>
        </Form.Item>

        <Form.Item
          label="Select Appointment Type"
          name="appointmentType"
          rules={[
            {
              required: true,
              message: 'Please Select Appointment Type',
            },
          ]}
        >
          <Select allowClear>
            <Option value="ASSESSMENT">ASSESSMENT</Option>
            <Option value="ADMISSION">ADMISSION</Option>
            <Option value="INTERVENTION">INTERVENTION</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Patient Status"
          name="patientStatus"
        >
          <Select allowClear>
            <Option value="TAKEN_ADMISSION">TAKEN ADMISSION</Option>
            <Option value="TAKEN_EARLY_INTERVENTION">TAKEN EARLY INTERVENTION</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Appointment fee(Rs/-)"
          name="appointmentFees"
          rules={[
            {
              required: true,
              message: 'Please Input Appointment Fee',
            },
          ]}
        >
          <InputNumber
            allowClear
            style={{
              width: '100%',
            }}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Payment Mode"
          name="paymentMode"
          rules={[
            {
              required: true,
              message: 'Please Select Payment Mode',
            },
          ]}
        >
          <Select allowClear>
            <Option value="CASH">CASH</Option>
            <Option value="CHEQUE">CHEQUE</Option>
            <Option value="DEMAND_DRAFT">DEMAND DRAFT</Option>
            <Option value="ONLINE">ONLINE</Option>
            <Option value="OTHER">OTHER</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Payment Reference"
          name="paymentReference"
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item name="reminderYes" valuePropName="checked" wrapperCol={{ offset: 6 }}>
          <Checkbox>Reminder</Checkbox>
        </Form.Item>

        <Form.Item
          label="Reminder Period"
          name="reminderPeriod"
        >
          <DatePicker
            showTime
            allowClear
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item name="remindAll" valuePropName="checked" wrapperCol={{ offset: 6 }}>
          <Checkbox>ReminderAll</Checkbox>
        </Form.Item>

        <div className="d-flex flex-column">
          <Form.Item className="text-center" wrapperCol={{ offset: 0 }}>
            <Button htmlType="cancel" onClick={history.goBack} style={{ margin: '0 8px' }}>
              Cancel
            </Button>
            <Button htmlType="submit" disabled={loading || loadingDoctors} type="primary">
              {loading && (
              <span className="spinner-border spinner-border-sm" />
              )}
              <span> Submit</span>
            </Button>
          </Form.Item>
        </div>

      </Form>
    </div>
  );
};

export default EditAppointment;
