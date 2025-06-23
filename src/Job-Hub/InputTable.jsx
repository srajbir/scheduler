import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateInputJob, removeJob } from './JobSlice';
import JobInputForm from './JobInputForm';
import './scheduler.css';

function InputTable() {
  const jobs = useSelector((state) => state.jobs.jobsInput);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (id, field, value) => {
    const key = `${id}-${field}`;
    let isInvalid = false;

    if (value === "") {
      isInvalid = true;
    } else {
      const num = parseInt(value);
      if (field === "arrival" && (isNaN(num) || num < 0)) isInvalid = true;
      if (field === "burst" && (isNaN(num) || num <= 0)) isInvalid = true;
    }

    setErrors((prev) => ({
      ...prev,
      [key]: isInvalid,
    }));

    dispatch(updateInputJob({
      id,
      field,
      value: value === "" ? "" : parseInt(value),
    }));
  };

  const handleRemove = (id) => {
    dispatch(removeJob(id));
  };

  const getBorderClass = (id, field) => {
    return errors[`${id}-${field}`] ? "input-error-border" : "";
  };

  return (
    <div className="input-table-container">
      <div className="table-header">
        <h2>Job Input Table</h2>
        <button className="add-button" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Close Form' : 'Add Job'}
        </button>
      </div>

      {showForm && <JobInputForm />}

      {jobs.length > 0 && (
        <table className="job-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Arrival</th>
              <th>Burst</th>
              <th>Priority</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>
                  <input
                    type="number"
                    value={job.arrival}
                    min="0"
                    onChange={(e) => handleChange(job.id, 'arrival', e.target.value)}
                    className={`form-input ${getBorderClass(job.id, 'arrival')}`}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={job.burst}
                    min="1"
                    onChange={(e) => handleChange(job.id, 'burst', e.target.value)}
                    className={`form-input ${getBorderClass(job.id, 'burst')}`}
                  />
                </td>
                <td>
                  <select
                    value={job.priority}
                    onChange={(e) => handleChange(job.id, 'priority', e.target.value)}
                    className="form-input"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleRemove(job.id)}>
                    <img src="/bin.svg" alt="Remove" className="bin-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InputTable;
