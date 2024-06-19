import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSchedules } from '../store/scheduleSlice';

const ScheduleList = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedules.schedules);
  const scheduleStatus = useSelector((state) => state.schedules.status);

  useEffect(() => {
    if (scheduleStatus === 'idle') {
      dispatch(fetchSchedules());
    }
  }, [scheduleStatus, dispatch]);

  return (
    <div>
      <h2>Schedule List</h2>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>{schedule.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleList;
