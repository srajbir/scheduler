import { useSelector, useDispatch } from 'react-redux';
import { setSelectedId } from './JobSlice';
import './GanttChart.css';

function GanttChart() {
  const rawChartData = useSelector((state) => state.jobs.ghanttChart);
  const selectedId = useSelector((state) => state.jobs.selectedId);
  const dispatch = useDispatch();

  const mergedChartData = [];
  for (let i = 0; i < rawChartData.length; i++) {
    const current = rawChartData[i];
    const last = mergedChartData[mergedChartData.length - 1];
    if (last && last.id === current.id) {
      last.end = current.end;
    } else {
      mergedChartData.push({ ...current });
    }
  }

  if (!mergedChartData.length) return;

  const handleBlockClick = (id) => {
    if (id === 'idle') return;
    dispatch(setSelectedId(selectedId === id ? null : id));
  };

  const isMobile = window.innerWidth <= 768;
  const BLOCK_UNIT_WIDTH = isMobile ? 20 : 40;
  const MAX_BLOCK_WIDTH = isMobile ? 200 : 400;

  
  return (
    <div className="gantt-wrapper">
      <h2 className="gantt-heading">Execution Timeline</h2>
  
      <div className="gantt-scroll">
        <div className="gantt-container">
          <div className="gantt-row">
            {mergedChartData.map((block, index) => {
              const width = Math.min((block.end - block.start) * BLOCK_UNIT_WIDTH, MAX_BLOCK_WIDTH);
              return (
                <div
                  key={index}
                  className={`gantt-block ${block.id === 'idle' ? 'idle' : 'process'} ${selectedId === block.id ? 'active' : ''}`}
                  style={{ width: `${width}px` }}
                  onClick={() => handleBlockClick(block.id)}
                >
                  {block.id === 'idle' ? 'Idle' : `P${block.id}`}
                </div>
              );
            })}
          </div>
          
          <div className="gantt-timeline">
            {mergedChartData.map((block, index) => {
              const width = Math.min((block.end - block.start) * BLOCK_UNIT_WIDTH, MAX_BLOCK_WIDTH);
              return (
                <span
                  key={index}
                  className="time-label"
                  style={{ width: `${width}px` }}
                >
                  {block.start}
                </span>
              );
            })}
            <span className="time-label">{mergedChartData.at(-1).end}</span>
          </div>
        </div>
      </div>
          
      {/* Highlight output table row */}
      <style>{`
        .output-table tbody tr[data-id="${selectedId}"] {
          background-color: rgba(39, 59, 122, 0.15) !important;
          transform: scale(1.01);
        }
        body.dark-mode .output-table tbody tr[data-id="${selectedId}"] {
          background-color: rgba(90, 120, 240, 0.15) !important;
        }
      `}</style>
    </div>
  );

}

export default GanttChart;
