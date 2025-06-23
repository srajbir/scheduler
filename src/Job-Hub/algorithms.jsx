// =============================
// FCFS - First Come First Serve
// =============================
export async function Fcfs(jobsInput) {
  return new Promise((resolve) => {
    const jobs = jobsInput.map(job => ({ ...job })).sort((a, b) => a.arrival - b.arrival);
    const scheduledJobs = [];
    const ghanttChart = [];
    let currentTime = 0;

    for (const job of jobs) {
      if (currentTime < job.arrival) {
        ghanttChart.push({ id: 'idle', start: currentTime, end: job.arrival });
        currentTime = job.arrival;
      }

      const start = currentTime;
      const end = start + job.burst;

      job.waiting = start - job.arrival;
      job.completion = end;
      job.turnaround = end - job.arrival;

      scheduledJobs.push({ ...job });
      ghanttChart.push({ id: job.id, start, end });

      currentTime = end;
    }

    resolve({ scheduledJobs, ghanttChart });
  });
}

// =======================
// SJF - Shortest Job First
// =======================
export async function Sjf(jobsInput) {
  return new Promise((resolve) => {
    const jobs = jobsInput.map(job => ({ ...job }));
    const scheduledJobs = [];
    const ghanttChart = [];
    let time = 0;

    while (jobs.length > 0) {
      const available = jobs.filter(j => j.arrival <= time);

      if (available.length === 0) {
        const nextArrival = Math.min(...jobs.map(j => j.arrival));
        ghanttChart.push({ id: 'idle', start: time, end: nextArrival });
        time = nextArrival;
        continue;
      }

      const nextJob = available.reduce((a, b) => (a.burst < b.burst ? a : b));
      jobs.splice(jobs.indexOf(nextJob), 1);

      const start = time;
      const end = time + nextJob.burst;

      nextJob.waiting = start - nextJob.arrival;
      nextJob.completion = end;
      nextJob.turnaround = end - nextJob.arrival;

      scheduledJobs.push(nextJob);
      ghanttChart.push({ id: nextJob.id, start, end });

      time = end;
    }

    resolve({ scheduledJobs, ghanttChart });
  });
}

// =============================
// SRTF - Shortest Remaining Time First
// =============================
export async function Srtf(jobsInput) {
  return new Promise((resolve) => {
    const jobs = jobsInput.map(job => ({ ...job }));
    const scheduledJobs = [];
    const ghanttChart = [];
    let time = 0;
    let lastId = null;

    while (jobs.some(j => j.remaining > 0)) {
      const available = jobs.filter(j => j.arrival <= time && j.remaining > 0);

      if (available.length === 0) {
        if (lastId !== 'idle') ghanttChart.push({ id: 'idle', start: time, end: time + 1 });
        else ghanttChart[ghanttChart.length - 1].end++;
        time++;
        lastId = 'idle';
        continue;
      }

      const job = available.reduce((a, b) => (a.remaining < b.remaining ? a : b));

      if (lastId !== job.id) {
        ghanttChart.push({ id: job.id, start: time, end: time + 1 });
      } else {
        ghanttChart[ghanttChart.length - 1].end++;
      }

      job.remaining--;
      time++;
      lastId = job.id;

      if (job.remaining === 0) {
        job.completion = time;
        job.turnaround = job.completion - job.arrival;
        job.waiting = job.turnaround - job.burst;
        scheduledJobs.push({ ...job });
      }
    }

    resolve({ scheduledJobs, ghanttChart });
  });
}

// =========================================
// Priority (Non-Preemptive) Scheduling
// =========================================
export async function PriorityNonPreemptive(jobsInput) {
  return new Promise((resolve) => {
    const jobs = jobsInput.map(j => ({ ...j }));
    const scheduledJobs = [];
    const ghanttChart = [];
    let time = 0;

    while (jobs.length > 0) {
      const available = jobs.filter(j => j.arrival <= time);
      if (available.length === 0) {
        const nextArrival = Math.min(...jobs.map(j => j.arrival));
        ghanttChart.push({ id: 'idle', start: time, end: nextArrival });
        time = nextArrival;
        continue;
      }

      const job = available.reduce((a, b) => (a.priority < b.priority ? a : b));
      jobs.splice(jobs.findIndex(j => j.id === job.id), 1);

      const start = time;
      const end = time + job.burst;

      job.waiting = start - job.arrival;
      job.completion = end;
      job.turnaround = end - job.arrival;

      scheduledJobs.push(job);
      ghanttChart.push({ id: job.id, start, end });

      time = end;
    }

    resolve({ scheduledJobs, ghanttChart });
  });
}

// =====================================
// Priority (Preemptive) Scheduling
// =====================================
export async function PriorityPreemptive(jobsInput) {
  return new Promise((resolve) => {
    const jobs = jobsInput.map(j => ({ ...j }));
    const scheduledJobs = [];
    const ghanttChart = [];
    let time = 0;
    let lastId = null;

    while (jobs.some(j => j.remaining > 0)) {
      const available = jobs.filter(j => j.arrival <= time && j.remaining > 0);
      if (available.length === 0) {
        if (lastId !== 'idle') ghanttChart.push({ id: 'idle', start: time, end: time + 1 });
        else ghanttChart[ghanttChart.length - 1].end++;
        time++;
        lastId = 'idle';
        continue;
      }

      const job = available.reduce((a, b) => (a.priority < b.priority ? a : b));

      if (lastId !== job.id) {
        ghanttChart.push({ id: job.id, start: time, end: time + 1 });
      } else {
        ghanttChart[ghanttChart.length - 1].end++;
      }

      job.remaining--;
      time++;
      lastId = job.id;

      if (job.remaining === 0) {
        job.completion = time;
        job.turnaround = job.completion - job.arrival;
        job.waiting = job.turnaround - job.burst;
        scheduledJobs.push({ ...job });
      }
    }

    resolve({ scheduledJobs, ghanttChart });
  });
}

// =========================
// Round Robin Scheduling
// =========================
export async function RoundRobin(jobsInput, timeQuantum = 2) {
  return new Promise((resolve) => {
    const jobs = jobsInput.map(j => ({ ...j }));
    const scheduledJobs = [];
    const ghanttChart = [];
    const queue = [];
    let time = 0;
    let lastId = null;

    while (jobs.some(j => j.remaining > 0) || queue.length > 0) {
      const newlyArrived = jobs.filter(j => j.arrival <= time && j.remaining > 0 && !queue.includes(j));
      queue.push(...newlyArrived);

      if (queue.length === 0) {
        if (lastId !== 'idle') ghanttChart.push({ id: 'idle', start: time, end: time + 1 });
        else ghanttChart[ghanttChart.length - 1].end++;
        time++;
        lastId = 'idle';
        continue;
      }

      const job = queue.shift();
      const execTime = Math.min(timeQuantum, job.remaining);

      if (lastId !== job.id) {
        ghanttChart.push({ id: job.id, start: time, end: time + execTime });
      } else {
        ghanttChart[ghanttChart.length - 1].end += execTime;
      }

      job.remaining -= execTime;
      time += execTime;
      lastId = job.id;

      const arrivingDuringExec = jobs.filter(j => j.arrival > time - execTime && j.arrival <= time && j.remaining > 0 && !queue.includes(j));
      queue.push(...arrivingDuringExec);

      if (job.remaining > 0) {
        queue.push(job);
      } else {
        job.completion = time;
        job.turnaround = job.completion - job.arrival;
        job.waiting = job.turnaround - job.burst;
        scheduledJobs.push({ ...job });
      }
    }

    resolve({ scheduledJobs, ghanttChart });
  });
}
