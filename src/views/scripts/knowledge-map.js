/**
 * Fetches the knowledge map JSON and returns it as an object
 * 
 * @returns {Array<object>} the knowledge map object
 */
async function fetchKnowledgeMaps() {
  const response = await fetch('/api/knowledge-map', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

/**
 * Sums the line changes for each developer
 * 
 * @param {object} data 
 * @returns {object} developer line changes
 */
function sumDeveloperLineChanges(data, key='counts') {
  const dataValues = {};

  data.forEach(item => 
    Object.keys(item[key]).forEach(name =>
      !dataValues[name]
        ? dataValues[name] = item[key][name]
        : dataValues[name] = dataValues[name] + item[key][name]));

  return dataValues;
}

/**
 * Initialize the charts by mapping to fetched data into arrays and passes these to Chart.js
 */
async function init() {
  const mapData = await fetchKnowledgeMaps();
  const labels = new Set(mapData.map(item => Object.keys(item.counts)).reduce((a,b) => a.concat(b), []));
  const ctx = document.getElementById('context');
  const dataValuesCounts = sumDeveloperLineChanges(mapData);
  const dataValuesFileCounts = sumDeveloperLineChanges(mapData, key="fileCounts");

  // Chart.js data
  const data = {
    labels: [...labels],
    datasets: [
      {
        label: 'Line changes',
        data: [...labels].map(item => dataValuesCounts[item]),
        backgroundColor: [...labels].map(item => '#' + generateColour(item)),
        hoverOffset: 4
      },
      {
        label: 'File changes',
        data: [...labels].map(item => dataValuesFileCounts[item]),
        backgroundColor: [...labels].map(item => '#' + generateColour(item)),
        hoverOffset: 4
      },
    ]
  };

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data,
    options: {
      plugins: {
        title: {
            display: true,
            text: 'Line and file change chart'
        },
        tooltip: {
          callbacks: {
              label: function(context) {
                const totalCount = context.dataset.data.reduce((a, b) => a + b, 0);

                if (context.datasetIndex === 0) {
                  return `${context.formattedValue} total line changes (${(context.parsed / totalCount * 100).toFixed(2)}%) [${context.label}]`;
                } else {
                  return `${context.formattedValue} total file changes (${(context.parsed / totalCount * 100).toFixed(2)}%) [${context.label}]`;
                }
              }
          }
        }
      }
    }
  });

  // colour input change listener
  document.getElementById('colour-shift').addEventListener('change', (event) => {
    const value = Number(event.target.value);
    chart.data.datasets[0].backgroundColor = [...labels].map(item => '#' + generateColour(item, value));
    chart.data.datasets[1].backgroundColor = [...labels].map(item => '#' + generateColour(item, value));
    chart.update();
  });
}

init();