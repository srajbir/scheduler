import { createSlice } from "@reduxjs/toolkit";
let initialJobs = [
  { id: 1, arrival: 0, burst: 5, priority: 2, waiting: 0, completion: 0, turnaround: 0, remaining: 5 },
  { id: 2, arrival: 2, burst: 3, priority: 1, waiting: 0, completion: 0, turnaround: 0, remaining: 3 },
  { id: 3, arrival: 12, burst: 3, priority: 4, waiting: 0, completion: 0, turnaround: 0, remaining: 3 },
  { id: 4, arrival: 4, burst: 1, priority: 3, waiting: 0, completion: 0, turnaround: 0, remaining: 1 }
];

let nextId = Math.max(...initialJobs.map(job => job.id)) + 1;

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    selectedId: null,
    jobsInput: initialJobs,
    jobsScheduled: [],
    ghanttChart: [],
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    addJob: (state, action) => {
      const { arrival, burst, priority } = action.payload;
      if (
        typeof arrival !== 'number' || arrival < 0 ||
        typeof burst !== 'number' || burst <= 0 ||
        typeof priority !== 'number' || priority < 1 || priority > 10
      ) {
        return;
      }

      state.jobsInput.push({
        id: nextId++,
        arrival,
        burst,
        priority,
        waiting: 0,
        completion: 0,
        turnaround: 0,
        remaining: burst,
      });
    },

    removeJob: (state, action) => {
      state.jobsInput = state.jobsInput.filter(job => job.id !== action.payload);
    },

    updateInputJob: (state, action) => {
      const { id, field, value } = action.payload;
      const job = state.jobsInput.find(j => j.id === id);
      if (job) {
        if (value === "") {
          job[field] = ""; // allow temporary empty value
        } else {
          job[field] = parseInt(value);
          if (field === 'burst') {
            job.remaining = parseInt(value);
          }
        }
      }
    },

    setJobsScheduled: (state, action) => {
      state.jobsScheduled = action.payload;
    },

    setGhanttChart: (state, action) => {
      state.ghanttChart = action.payload;
    }
  }
});

export const {
  addJob, removeJob, updateInputJob, setJobsScheduled, setGhanttChart, setSelectedId
} = jobSlice.actions;

export default jobSlice.reducer;
