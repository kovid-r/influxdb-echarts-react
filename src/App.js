import React, { useEffect, useState } from 'react';
import { InfluxDB } from '@influxdata/influxdb-client';
import Chart from './Chart';

export default function App() {
  const [chartData, setChartData] = useState([]);
  const [isCompleted, setCompleted] = useState(false);
  const token = '';
  const org = '';
  const url = '';

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
