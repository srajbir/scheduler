import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fcfs, Sjf, Srtf, PriorityNonPreemptive, PriorityPreemptive, RoundRobin, } from './algorithms';
import { setJobsScheduled, setGhanttChart } from './JobSlice';
import './scheduler.css';

const Scheduler = () => {
  const dispatch = useDispatch();
  const jobsInput = useSelector((state) => state.jobs.jobsInput);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [timeQuantum, setTimeQuantum] = useState('');
  const [loading, setLoading] = useState(false);
  const [quantumError, setQuantumError] = useState(false);

  if (jobsInput.length === 0) return null;

  // 🧠 Validate all job fields before running
  const isJobsInputValid = jobsInput.every(job =>
    job.arrival !== "" && job.burst !== "" && job.priority !== "" &&
    typeof job.arrival === "number" && job.arrival >= 0 &&
    typeof job.burst === "number" && job.burst > 0 &&
    typeof job.priority === "number" && job.priority >= 1 && job.priority <= 10
  );

  const handleRun = async () => {
    if (!selectedAlgorithm || !isJobsInputValid) return;

    if (selectedAlgorithm === 'Round Robin') {
      const tq = parseInt(timeQuantum);
      if (!timeQuantum || isNaN(tq) || tq <= 0) {
        setQuantumError(true);
        return;
      }
      setQuantumError(false);
    }

    setLoading(true);
    let result = { scheduledJobs: [], ghanttChart: [] };

    try {
      switch (selectedAlgorithm) {
        case 'FCFS':
          result = await Fcfs(jobsInput);
          break;
        case 'SJF':
          result = await Sjf(jobsInput);
          break;
        case 'SRTF':
          result = await Srtf(jobsInput);
          break;
        case 'Priority Non-Preemptive':
          result = await PriorityNonPreemptive(jobsInput);
          break;
        case 'Priority Preemptive':
          result = await PriorityPreemptive(jobsInput);
          break;
        case 'Round Robin':
          result = await RoundRobin(jobsInput, parseInt(timeQuantum));
          break;
        default:
          break;
      }

      dispatch(setJobsScheduled(result.scheduledJobs));
      dispatch(setGhanttChart(result.ghanttChart));
    } catch (err) {
      console.error('Error running algorithm:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scheduler-container">
      <div className="scheduler-form-row">
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          className="scheduler-form-select"
        >
          <option value="" disabled hidden>Select Algorithm</option>
          <option>FCFS</option>
          <option>SJF</option>
          <option>SRTF</option>
          <option>Priority Non-Preemptive</option>
          <option>Priority Preemptive</option>
          <option>Round Robin</option>
        </select>

        {selectedAlgorithm === 'Round Robin' && (
          <input
            type="number"
            min="1"
            placeholder="Time Quantum"
            value={timeQuantum}
            onChange={(e) => {
              const val = e.target.value;
              setTimeQuantum(val);
            
              const parsed = parseInt(val);
              setQuantumError(val === "" || isNaN(parsed) || parsed <= 0);
            }}
            className={`time-quantum ${quantumError ? 'input-error-border' : ''}`}
          />
        )}
        
        <button
          onClick={handleRun}
          disabled={
            loading ||
            jobsInput.length === 0 ||
            !selectedAlgorithm ||
            !isJobsInputValid ||
            (selectedAlgorithm === "Round Robin" && (!timeQuantum || parseInt(timeQuantum) <= 0))
          }
          className="scheduler-button"
        >
          {loading ? 'Running...' : 'Run Algorithm'}
        </button>
      </div>
    </div>
  );
};

export default Scheduler;
