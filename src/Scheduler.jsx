import React, { useState } from 'react';
import Scheduler, { SchedulerData, ViewTypes, DemoData } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import withDragDropContext from './WithDndContext';

const Basic = () => {
  // eslint-disable-next-line
const schedulerData = new SchedulerData(new moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), ViewTypes.Week, false, false, {
    views: [
      {
        viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false,
      },
      {
        viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false,
      },
      {
        viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false,
      },
      {
        viewName: 'Year', viewType: ViewTypes.Year, showAgenda: false,
      },
    ],
    eventItemPopoverEnabled: false,
  });
  schedulerData.localeMoment.locale('en');
  schedulerData.setResources(DemoData.resources);
  schedulerData.setEvents(DemoData.events);

  const [state, setState] = useState({
    viewModel: schedulerData,
  });

  const prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    setState({
      viewModel: schedulerData,
    });
  };

  const nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    setState({
      viewModel: schedulerData,
    });
  };

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    setState({
      viewModel: schedulerData,
    });
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    setState({
      viewModel: schedulerData,
    });
  };

  const eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };

  const ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  const ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
  // eslint-disable-next-line
  if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {
      let newFreshId = 0;
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      const newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start,
        end,
        resourceId: slotId,
        bgColor: 'purple',
      };
      schedulerData.addEvent(newEvent);
      setState({
        viewModel: schedulerData,
      });
    }
  };

  const updateEventStart = (schedulerData, event, newStart) => {
  // eslint-disable-next-line
  if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
      schedulerData.updateEventStart(event, newStart);
    }
    setState({
      viewModel: schedulerData,
    });
  };

  const updateEventEnd = (schedulerData, event, newEnd) => {
  // eslint-disable-next-line
  if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    setState({
      viewModel: schedulerData,
    });
  };

  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
  // eslint-disable-next-line
  if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      setState({
        viewModel: schedulerData,
      });
    }
  };

  const demoButtonClicked = eventItem => {
    alert(`You just clicked demo button. event title: ${eventItem.title}`);
  };

  // eslint-disable-next-line
  const eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => (
  // <React.Fragment>
  //     <h3>{title}</h3>
  //     <h5>{start.format("HH:mm")} - {end.format("HH:mm")}</h5>
  //     <img src="./icons8-ticket-96.png" />
  // </React.Fragment>
    <div style={{ width: '300px' }}>
      <Row type="flex" align="middle">
        <Col span={2}>
          <div className="status-dot" style={{ backgroundColor: statusColor }} />
        </Col>
        <Col span={22} className="overflow-text">
          <span className="header2-text" title={title}>{title}</span>
        </Col>
      </Row>
      <Row type="flex" align="middle">
        <Col span={2}>
          <div />
        </Col>
        <Col span={22}>
          <span className="header1-text">
            {start.format('HH:mm')}
            {' '}
            -
            {' '}
            {end.format('HH:mm')}
          </span>
        </Col>
      </Row>
      <Row type="flex" align="middle">
        <Col span={2}>
          <div />
        </Col>
        <Col span={22}>
          {/* eslint-disable-next-line */}
          <Button onClick={() => { () => { demoButtonClicked(eventItem); }; }}>Demo</Button>
        </Col>
      </Row>
    </div>
  );

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    setState({
      viewModel: schedulerData,
    });
  };

  const slotClickedFunc = (schedulerData, slot) => {
    alert(`You just clicked a ${schedulerData.isEventPerspective ? 'task' : 'resource'}.{id: ${slot.slotId}, name: ${slot.slotName}}`);
  };

  const { viewModel } = state;
  return (
    <div>
      <Scheduler
        schedulerData={viewModel}
        prevClick={prevClick}
        nextClick={nextClick}
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
        eventItemClick={eventClicked}
        viewEventClick={ops1}
        viewEventText="Ops 1"
        viewEvent2Text="Ops 2"
        viewEvent2Click={ops2}
        updateEventStart={updateEventStart}
        updateEventEnd={updateEventEnd}
        moveEvent={moveEvent}
        newEvent={newEvent}
        slotClickedFunc={slotClickedFunc}
        eventItemPopoverTemplateResolver={eventItemPopoverTemplateResolver}
        toggleExpandFunc={toggleExpandFunc}
      />
    </div>
  );
};

export default withDragDropContext(Basic);