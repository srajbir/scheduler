import { useSelector, useDispatch } from "react-redux";
import { setSelectedId } from "./JobSlice";
import { useState } from "react";
import "./scheduler.css";

const OutputTable = () => {
  const dispatch = useDispatch();
  const jobsScheduled = useSelector((state) => state.jobs.jobsScheduled);
  const selectedId = useSelector((state) => state.jobs.selectedId);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  if (jobsScheduled.length === 0) return null;

  const sortedJobs = [...jobsScheduled].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? dir : a[sortConfig.key] < b[sortConfig.key] ? -dir : 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleRowClick = (id) => {
    dispatch(setSelectedId(selectedId === id ? null : id));
  };

  const headers = [
    { label: "ID", key: "id" },
    { label: "Arrival", key: "arrival" },
    { label: "Burst", key: "burst" },
    { label: "Priority", key: "priority" },
    { label: "Waiting", key: "waiting" },
    { label: "Completion", key: "completion" },
    { label: "Turnaround", key: "turnaround" },
    { label: "Remaining", key: "remaining" },
  ];

  return (
    <div className="input-table-container">
      <h2 className="section-heading">Job Statistics</h2>
      <div className="output-table-scroll">
        <table className="output-table">
          <thead>
            <tr>
              {headers.map(({ label, key }) => (
                <th key={key} onClick={() => handleSort(key)}>
                  <div className="sortable-header">
                    <span className="header-content">
                      {label}
                      <span className="sort-arrows">
                        <span className={`arrow up ${sortConfig.key === key && sortConfig.direction === "asc" ? 'active' : ''}`}>▲</span>
                        <span className={`arrow down ${sortConfig.key === key && sortConfig.direction === "desc" ? 'active' : ''}`}>▼</span>
                      </span>
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedJobs.map((job) => (
              <tr
                key={job.id}
                data-id={job.id}
                className={job.id === selectedId ? "highlight-row" : ""}
                onClick={() => handleRowClick(job.id)}
              >
                <td>{job.id}</td>
                <td>{job.arrival}</td>
                <td>{job.burst}</td>
                <td>{job.priority ?? '-'}</td>
                <td>{job.waiting}</td>
                <td>{job.completion}</td>
                <td>{job.turnaround}</td>
                <td>{job.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutputTable;
