// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("/assets/data/data.csv", function(healthData) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.poverty)])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(healthData)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.poverty);})
      .attr("cy", function(d) { return y(d.healthcare);})
      .attr("r", 1.5)
      .style("fill", "#69b3a2")
});

//     .attr("cx", (d, i) => xScale(i))
//     .attr("cy", d => yScale(d))

// .attr("cx", function (d) { return x(d.GrLivArea); } )
// .attr("cy", function (d) { return y(d.SalePrice); } )





// // @TODO: YOUR CODE HERE!
// // Step 1: Set up our chart
// //= ================================
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Step 2: Create an SVG wrapper,
// // append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// // =================================
// var svg = d3
//   .select("#scatter");
  
// svg.append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight)

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Step 3:
// // Import data from the data.csv file
// // =================================

// d3.csv("/assets/data/data.csv", function(healthData) {
//   // if (error) throw error;
//   console.log(healthData);

// // parse data and convert to integers
// healthData.poverty = +healthData.poverty;
// healthData.healthcare = +healthData.healthcare;
// });

//   // Step 4: Create Scales
//   //= ============================================
//   var xScale = d3.scaleLinear()
//     .domain([0, d3.max(healthData, d => d.poverty)])
//     .range([0, width]);

//   var yScale = d3.scaleLinear()
//     .domain([0, d3.max(healthData, d => d.healthcare)])
//     .range([height, 0]);

//   // Step 5: Create Axes
//   // =============================================
//   var xAxis = d3.axisBottom(xScale);
//   var yAxis = d3.axisLeft(yScale);

//   // Step 6: Append the axes to the chartGroup 
//   // ==============================================
//   // Add x axis
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(xAxis);

//   // Add y axis  
//   chartGroup.append("g")
//     .call(yAxis);

//   // Step 7: Set circles for datapoints
//   // ==============================================
//   // circles
//   chartGroup.selectAll("circle")
//     .data([healthData])
//     .enter()
//     .append("circle")
//     .attr("cx", (d, i) => xScale(i))
//     .attr("cy", d => yScale(d))
//     .classed("stateCircle", true);
    
//   // Step 8: Add titles to Axes
//   // ==============================================
//   chartGroup.append("text")
//     // Position the text
//     // Center the text:
//     // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
//     .attr("text-anchor", "middle")
//     .attr("font-size", "16px")
//     .text("Poverty %");

//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x",0 - (height / 2))
//     .attr("dy", "1em")
//     .style("text-anchor", "middle")
//     .text("Healthcare %"); 

