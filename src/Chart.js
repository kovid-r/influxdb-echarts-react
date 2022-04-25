import React from 'react';
import ReactECharts from 'echarts-for-react';

var colorPalette = ['#7570b3','#e7298a','#1b9e77','#d95f02','#66a61e'];

// Mock time values for measurements
var arr = [], i, j;
for(i=0; i<24; i++) {
  for(j=0; j<4; j++) {
    arr.push(i + ":" + (j===0 ? "00" : 15*j) );
  }
}

arr = arr.reverse().slice(0,49).reverse();

function Chart({ chartData }) {
  return (
    <>
      <ReactECharts
        option = {{
          title: {
            text: 'Line Chart for All Hosts from 1 to 5'
          },
          color: colorPalette,
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: chartData.filter(function (chartData) {
            //   return chartData.host === "host1";
            // }).map((val) => val._stop)
            
            // data: Array.from(Array(chartData.filter(function (chartData) {
            //   return chartData.host === "host1";
            // }).length).keys())

            data: arr
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Host 1',
              type: 'line',
              data: chartData.filter(function (chartData) {
                return chartData.host === "host1";
              }).map((val) => val._value)
            },
            {
              name: 'Host 2',
              type: 'line',
              data: chartData.filter(function (chartData) {
                return chartData.host === "host2";
              }).map((val) => val._value)
            },
            {
              name: 'Host 3',
              type: 'line',
              data: chartData.filter(function (chartData) {
                return chartData.host === "host3";
              }).map((val) => val._value)
            },
            {
              name: 'Host 4',
              type: 'line',
              data: chartData.filter(function (chartData) {
                return chartData.host === "host4";
              }).map((val) => val._value)
            },
            {
              name: 'Host 5',
              type: 'line',
              data: chartData.filter(function (chartData) {
                return chartData.host === "host5";
              }).map((val) => val._value)
            }
          ]
        }}
      />
      <ReactECharts
        option={{
          title: {
            text: 'Area Chart for Host 2'
          },
          xAxis: {
            type: 'category',
            toolbox: {
              show : true,
          },
          // data: chartData.filter(function (chartData) {
          //     return chartData.host === "host1";
          //   }).map((val) => val._stop.substring(19,29)),
          
          // data: Array.from(Array(chartData.filter(function (chartData) {
          //       return chartData.host === "host1";
          //    }).length).keys())

          data: arr
          },
          yAxis: {
            type: 'value',
          },
          axisLabel: {
            textStyle: { fontSize: 10 },
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              type: 'dotted',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: colorPalette,
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          series: [
            {
              data: chartData.filter(function (chartData) {
                return chartData.host === "host1";
              }).map((val) => val._value),
              type: 'bar',
              areaStyle: {}
            },
          ],
        }}
      />
    </>
      
  );
}

export default Chart;

