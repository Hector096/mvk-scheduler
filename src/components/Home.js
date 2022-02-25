import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../redux/actions/message';
import { List, Button  } from 'antd';
import { useAlert } from 'react-alert';
import getDoctors from '../redux/actions/user';

const Home = () => {
  const history = useHistory();
  const { message } = useSelector(state => state.message);
  const { user: currentUser } = useSelector(state => state.auth);
  const { doctors } = useSelector(state => state.user);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(getDoctors())
        .then(() => { 
          setLoadingDoctors(false);
        })
        .catch((err) => {
          console.log(err);
          dispatch(setMessage('Unable to get doctors list'));
        });
    }
  }, [dispatch]);

  const newAppointment= (id) =>{
    history.push( `/calendar/${id}`)

  }
  const newPatient = () => {
    history.push('/patient/new');
  };

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="p-5">
       {message && (
      <div className="form-group">
        <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
          {message}
        </div>
      </div>
      )}
       <Button type="primary" onClick={newPatient} className="mb-3" style={{ width: '100%', fontSize: '15px' }}>
       Create New Patient
      </Button>
        <List
    itemLayout="horizontal"
    style={{height: '75vh', overflow: 'auto'}}
    size="large"
    dataSource={doctors}
    renderItem={item => (
      <List.Item
        key={item.id}
        className="border mb-2 p-4"
        actions={[
          <Button type="primary" size='large' onClick={()=>{newAppointment(item.id)}} >Book</Button>,
        ]}
      >
        <List.Item.Meta
          title={<h3>{item.name}</h3>}
          description={item.position}
        />
      </List.Item>
    )}
  />
    </div>
  );
};

export default Home;