import React, { useState } from 'react';
import Kalend, { CalendarView } from 'kalend';
import NewAppointment from './NewAppointment';
import 'kalend/dist/styles/index.css';
import moment from 'moment';
import { Modal, Button } from 'antd';

export default function Calendar() {

    const [visible, setVisible] = useState(false);
    const [newAppointVisible, setNewAppointVisible] = useState(false);
    const [newDate, setnewDate] = useState('');


    const events = [
        {
            id: 1,
            startAt: moment().format(),
            endAt: '2022-02-24T14:06:04+05:30',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'test',
            color: 'blue',
            calendarID: 'work'
        },
        {
            id: 2,
            startAt: moment().format(),
            endAt: '2022-02-24T16:06:04+05:30',// optional
            summary: 'test',
            color: 'blue',
        },
        {
            id: 3,
            startAt: moment().format(),
            endAt: '2022-02-24T16:06:04+05:30',// optional
            summary: 'test',
            color: 'blue',
        },
        {
            id: 4,
            startAt: moment().format(),
            endAt: '2022-02-24T16:06:04+05:30',// optional
            summary: 'test',
            color: 'blue',
        }, {
            id: 5,
            startAt: moment().format(),
            endAt: '2022-02-24T16:06:04+05:30',// optional
            summary: 'test',
            color: 'blue',
        }, {
            id: "dsjfh",
            startAt: moment().format(),
            endAt: '2022-02-24T16:06:04+05:30',// optional
            summary: 'test',
            color: 'blue',
        }
    ]
    const onClick =() =>{
        console.log("Hello")
    }

    const onNewEventClick = (data) => {
        setnewDate(data.day);
        console.log(data);
        setNewAppointVisible(true)
      };
    
      // Callback for event click
      const onEventClick = (data) => {
        setVisible(true);
        console.log(data);
      };

      // Callback after dragging is finished
  const onEventDragFinish = (
    prev,
    current,
    data
  ) => {
    console.log(prev);
    console.log(current);
 console.log(data);
  };


  return (
      <>
      <Modal
        title="Appointment Details"
        centered
        onCancel={() => setVisible(false)}
        visible={visible}
        footer={[
            <Button key="back" type="danger">
              Delete
            </Button>,
            <Button
              key="link"
              href="https://google.com"
              type="primary"
              onClick={onClick}
            >
              Edit Appointment
            </Button>,
          ]}
        width={1000}
      >
      </Modal>
      <Modal
        title="New Appointment"
        centered
        onCancel={() => setNewAppointVisible(false)}
        visible={newAppointVisible}
        footer={null}
        width={1000}
      >
          <NewAppointment newDate={newDate} />
      </Modal>
      

      <Kalend
      onNewEventClick={onNewEventClick}
      initialView={CalendarView.DAY}
      onEventDragFinish={onEventDragFinish}
      timeFormat={'12'}
      events={events}
      initialDate={new Date().toISOString()}
      onEventClick={onEventClick}
      hourHeight={60}
    />
      </>
   
  )
}
