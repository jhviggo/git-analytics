async function fetchHotspots() {
  const response = await fetch('/api/hotspots', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

async function drawHotspots() {
  var width = 800
  var height = 600
  var svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  const data = await fetchHotspots()
  
  var packLayout = d3.pack()
    .size([width, height])
    .padding(2)

  var rootNode = d3.hierarchy(data)

  rootNode.sum(function(d) {
    return d.value;
  });

  packLayout(rootNode);

  // Read data

  var Tooltip = d3.select("#container")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  
  var mouseover = function() {
    Tooltip
      .style("opacity", 1)
      .style("display", "block");
  }
  var mousemove = function(e, i) {
    Tooltip
      .html('<u>' + i.data.fileName + '</u>' + "<br>" + i.data.changeCount + " file changes" + "<br>" + i.data.lineCount + " line changes")
      .style("left", (e.clientX + 10) + "px")
      .style("top", (e.clientY + 10) + "px");
  }
  var mouseleave = function() {
    Tooltip
      .style("opacity", 0)
      .style("display", "none");
  }
  

  // Initialize the circle: all located at the center of the svg area
  svg.append("g")
    .selectAll("circle")
    .data(rootNode.children)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", (d) => d.r)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .style("fill-opacity", 0.8)
    .attr("stroke", "black")
    .style("fill", (d) => {
      return '#' + generateColour(d.data.fileName.substring(0, d.data.fileName.lastIndexOf('/') + 1));
    })
    .style("stroke-width", 1)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
}

drawHotspots();