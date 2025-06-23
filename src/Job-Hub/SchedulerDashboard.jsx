import Scheduler from './Scheduler';
import OutputTable from './OutputTable';
import GanttChart from './GanttChart';
import './scheduler.css';
import { useSelector } from 'react-redux';

const SchedulerDashboard = () => {

    const jobsInput = useSelector((state) => state.jobs.jobsInput);

    if (jobsInput.length === 0) return null;
    
    return (
        <div className="scheduler-dashboard-container">
            <h2 className='section-heading'>Job Scheduler</h2>
            <Scheduler />
            <OutputTable />
            <GanttChart />
        </div>
    );
};

export default SchedulerDashboard;
