import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {
  Form, Input, Select, Button, InputNumber,
} from 'antd';
import { setMessage } from '../redux/actions/message';
import userService from '../services/user.service';
import getDoctors from '../redux/actions/user';
import getPatients from '../redux/actions/patients';

const NewAppointment = (props) => {
  console.log(props.newDate);
  const { Option } = Select;
  const { user: currentUser } = useSelector(state => state.auth);
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const { message } = useSelector(state => state.message);
  const { doctors } = useSelector(state => state.user);
  const { patients } = useSelector(state => state.patients);
  const dispatch = useDispatch();
  const { id } = useParams();
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
  }, [dispatch]);

  const onFinish = values => {
    setLoading(true);
    setSuccessful(false);
    // eslint-disable-next-line
     Object.keys(values).forEach(key => values[key] === undefined && delete values[key]);
    // eslint-disable-next-line
    values.scheduleDateTime = values.scheduleDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS").split('T').join(" ");
    // if (values.reminderPeriod !== undefined) {
    // eslint-disable-next-line
    // values.reminderPeriod = values.reminderPeriod.format("YYYY-MM-DDTHH:mm:ss.SSS").split('T').join(" ");
    // }
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

  const patientOptions = patients.map(patient => (
    <Option
      key={patient.id}
      value={`${patient.firstName} ${patient.lastName}`}
    >
      {`${patient.pid} ${patient.firstName} ${patient.lastName}`}
    </Option>
  ));

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }
  if (successful) {
    return <Redirect to={`/calendar/${id}`} />;
  }

  return (
    <div className="container mt-4">
      {message && (
      <div className="form-group">
        <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
          {message}
        </div>
      </div>
      )}
      {/* eslint-disable-next-line */}
      <Form {...formItemLayout} name="newpatient" onFinish={onFinish} >
        <Form.Item
          label="Appointment Date"
          name="scheduleDateTime"
        >
            <Input placeholder={props.newDate} disabled />
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
            showSearch
          >
            {loadingPatients ? <Option>Loading..</Option> : patientOptions }
          </Select>
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
        {/* <Form.Item name="reminderYes" valuePropName="checked" wrapperCol={{ offset: 6 }}>
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
        </Form.Item> */}

        <div className="d-flex flex-column">
          <Form.Item className="text-center" wrapperCol={{ offset: 0 }}>
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

export default NewAppointment;
