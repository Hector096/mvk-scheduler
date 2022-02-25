import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {
  Form, Input, DatePicker, Select, Typography, Button, InputNumber,
} from 'antd';
import { setMessage } from '../redux/actions/message';
import userService from '../services/user.service';

const NewPatient = () => {
  const { Option } = Select;
  const { Title } = Typography;
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message } = useSelector(state => state.message);
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useSelector(state => state.auth);

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
    },
  };

  const onFinish = values => {
    // eslint-disable-next-line
    values.birthDate = values.birthDate.format("YYYY-MM-DDTHH:mm:ss.SSS").split('T').join(" ");
    // eslint-disable-next-line
    values.registrationDate = values.registrationDate.format("YYYY-MM-DDTHH:mm:ss.SSS").split('T').join(" ");
    // eslint-disable-next-line
    Object.keys(values).forEach(key => values[key] === undefined && delete values[key]);

    if (values) {
      userService.postPatient(values)
        .then(v => {
          if (v.status === 201 || v.status === 200) {
            setLoading(false);
            setSuccessful(true);
            alert.show('Patient created', {
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

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }
  if (successful) {
    return <Redirect to="/appointments/new" />;
  }

  return (
    <div className="container mt-4">
      <Title className="text-center mb-5">Create New Patient</Title>
      {message && (
      <div className="form-group">
        <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
          {message}
        </div>
      </div>
      )}
      {/* eslint-disable-next-line */}
      <Form {...formItemLayout} className="p-5 border" name="newpatient" onFinish={onFinish} >
        <div className=" align-items-center">
          <Form.Item
            label="Registration Date"
            name="registrationDate"
            rules={[
              {
                required: true,
                message: 'Please input registration date',
              },
            ]}
          >
            <DatePicker
              allowClear
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

        </div>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input FirstName',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input Last name',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please Select Gender',
            },
          ]}
        >
          <Select allowClear>
            <Option value="Male">MALE</Option>
            <Option value="FEMALE">FEMALE</Option>
            <Option value="OTHER">OTHER</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cast" name="cast">
          <Select allowClear>
            <Option value="GENERAL">General</Option>
            <Option value="OBC">OBC</Option>
            <Option value="SC_ST">SC/ST</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Birth Date"
          name="birthDate"
          rules={[
            {
              required: true,
              message: 'Please input Birth Date',
            },
          ]}
        >
          <DatePicker
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label="Father's Name"
          name="fathersName"
          rules={[
            {
              required: true,
              message: 'Please input Father name',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Father's Age(years)"
          name="fathersAge"
          rules={[
            {
              required: true,
              message: 'Please input Father Age',
            },
          ]}
        >
          <InputNumber
            allowClear
            min={0}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label="Mother's Name"
          name="mothersName"
          rules={[
            {
              required: true,
              message: 'Please input Mother name',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Mother's Age(years)"
          name="mothersAge"
          rules={[
            {
              required: true,
              message: 'Please input Mother Age',
            },
          ]}
        >
          <InputNumber
            allowClear
            min={0}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          label="Family income"
          name="familyIncome"
          rules={[
            {
              required: true,
              message: 'Please input Family Income',
            },
          ]}
        >
          <Input
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input Email',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="primaryPhoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input Mobile number',
            },
          ]}
        >
          <Input
            allowClear

          />
        </Form.Item>

        <Form.Item
          label="Postal Address"
          name="postalAddress"
          rules={[
            {
              required: true,
              message: 'Please input Postal address',
            },
          ]}
        >
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item
          label="Father's qualification"
          name="fatherQualification"
          rules={[
            {
              required: true,
              message: 'Please Select Father qualification',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Mother's qualification"
          name="motherQualification"
          rules={[
            {
              required: true,
              message: 'Please Select Mother qualification',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Id Proof type"
          name="idProofType"
          rules={[
            {
              required: true,
              message: 'Please Select ID Proof Type',
            },
          ]}
        >
          <Select allowClear>
            <Option value="Voter Card">Voter Card</Option>
            <Option value="Aadhaar Card">Aadhaar Card</Option>
            <Option value="Pan Card">Pan Card</Option>
            <Option value="Driving Licence">Driving Licence</Option>
            <Option value="Passport">Passport</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Id proof number"
          name="idProofNumber"
          rules={[
            {
              required: true,
              message: 'Please input ID Proof Number',
            },
          ]}
        >
          <Input
            allowClear
          />
        </Form.Item>

        <Form.Item label="Department" name="department">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Other Department" name="otherDepartment">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Specialist" name="specialist">
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Consultant" name="consultant">
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Assessment fee(Rs/-)"
          name="assessmentFee"
          rules={[
            {
              required: true,
              message: 'Please Input Assessment Fee',
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

        <Form.Item label="Mode of referral" name="referralMode">
          <Select allowClear>
            <Option value="Self Family">Self Family</Option>
            <Option value="Manovikas Kendra">Manovikas Kendra</Option>
            <Option value="Student">Student</Option>
            <Option value="Website">Website</Option>
            <Option value="Self">Self</Option>
            <Option value="Relative">Relative</Option>
            <Option value="School">School</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Referral name" name="referralName">
          <Input allowClear />
        </Form.Item>
        <Form.Item className="text-center" wrapperCol={{ offset: 0 }}>
          <Button htmlType="cancel" onClick={history.goBack} style={{ margin: '0 8px' }}>
            Cancel
          </Button>
          <Button htmlType="submit" disabled={loading} type="primary">
            {loading && (
              <span className="spinner-border spinner-border-sm" />
            )}
            <span> Submit</span>
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default NewPatient;
