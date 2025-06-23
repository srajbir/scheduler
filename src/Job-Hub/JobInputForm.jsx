import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addJob } from './JobSlice';
import './scheduler.css';

function JobInputForm() {
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const a = parseInt(arrival);
    const b = parseInt(burst);

    setIsValid(
      !isNaN(a) && a >= 0 &&
      !isNaN(b) && b > 0
    );
  }, [arrival, burst]);

  const handleAddJob = () => {
    dispatch(addJob({
      arrival: parseInt(arrival),
      burst: parseInt(burst),
      priority: priority ? parseInt(priority) : 5,
    }));

    setArrival("");
    setBurst("");
    setPriority("");
  };

  const getBorderClass = (field, isValid) => {
    if (field === "") return "";
    return isValid ? "" : "input-error-border";
  };

  return (
    <div className="form-container">
      <div className="form-inner-container">
        <input
          className={`form-input ${getBorderClass(arrival, !isNaN(parseInt(arrival)) && parseInt(arrival) >= 0)}`}
          type="number"
          value={arrival}
          placeholder="Arrival Time"
          onChange={(e) => setArrival(e.target.value)}
          min="0"
        />
        <input
          className={`form-input ${getBorderClass(burst, !isNaN(parseInt(burst)) && parseInt(burst) > 0)}`}
          type="number"
          value={burst}
          placeholder="Burst Time"
          onChange={(e) => setBurst(e.target.value)}
          min="1"
        />
        <select className={`form-input ${priority ? 'select-active' : 'select-placeholder'}`} value={priority}
          onChange={(e) => setPriority(e.target.value)} >
          <option value="" disabled hidden>Priority</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => ( <option key={num} value={num}>{num}</option> ))}
        </select>

        <button
          className="form-add-button"
          onClick={handleAddJob}
          disabled={!isValid}
          style={{ opacity: isValid ? 1 : 0.6, cursor: isValid ? 'pointer' : 'not-allowed' }}
        >
          Add Job
        </button>
      </div>
    </div>
  );
}

export default JobInputForm;
