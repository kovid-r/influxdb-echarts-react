import React, { useEffect, useState } from 'react';
import { InfluxDB } from '@influxdata/influxdb-client';
import Chart from './Chart';

export default function App() {
  const [chartData, setChartData] = useState([]);
  const [isCompleted, setCompleted] = useState(false);
  const token =
    'v96hkhxEFt0zeXtfPk4heXIUOItCU6em867gAE00R1Gvq8LGE1KsBZNkHjMrejRL6vMDi4sNvhA3QbHwRNv8ow==';
  const org = 'kovid.rathee@gmail.com';
  const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';

  const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

  const fluxQuery = `from(bucket: "influxdb-echarts-react")|> range(start: 0)`;

  function fetchData() {
    queryApi.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const o = tableMeta.toObject(row);
        setChartData((v) => [...v, o]);
      },
      error: (error) => {
        window.console.error(error);
        window.console.log('\nFinished ERROR');
      },
      complete: () => {
        setCompleted(true);
        window.console.log('\nFinished SUCCESS');
      },
    });
  }

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Chart chartData={chartData} isCompleted={isCompleted} />
    </div>
  );
}
