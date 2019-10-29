// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("chart");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("/data/data.csv"), function(error, healthData) {
  if (error) throw error;

// parse data and convert to integers
healthData.forEach(function(data){
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
});

  // Step 4: Create Scales
  //= ============================================
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.poverty)])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare)])
    .range([height, 0]);

  // Step 5: Create Axes
  // =============================================
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Step 6: Append the axes to the chartGroup 
  // ==============================================
  // Add x axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  // Add y axis  
  chartGroup.append("g")
    .call(yAxis);

  // Step 7: Set circles for datapoints
  // ==============================================
  // circles
  chartGroup.selectAll("circle")
    .data([healthData])
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", d => yScale(d))
    .attr("r", "5")
    .attr("fill", "red")
    .classed("stateCircle chart", true);
    
  // Step 8: Add titles to Axes
  // ==============================================
  chartGroup.append("text")
    // Position the text
    // Center the text:
    // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Poverty %");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Healthcare %"); 
};
