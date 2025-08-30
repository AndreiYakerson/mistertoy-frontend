
import { useEffect, useState } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service-local';

ChartJS.register(ArcElement, Tooltip, Legend);



export function ToyChart() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState(null)

  useEffect(() => {
    toyService.getChartData()
      .then(data => {

        setData(data)
        setLabels(data.labels)
      })
      
  }, [])



  if (!data) return <div className='loading'></div>;
  return <Doughnut data={data} />;
}

