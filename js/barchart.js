/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// Append an SVG to the hardcoded bar div with correct bounds.
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Calculates the maximum score count in the data.
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Set a linear scale for the y-axis.
let yScale1 = d3.scaleLinear()
            // Set bounds from 0 up to the maximum y value.
            .domain([0,maxY1])
            // Confine it to the margins we set.
            .range([height-margin.bottom,margin.top]); 

// Scales the x-axis in bands (buckets).
let xScale1 = d3.scaleBand()
            // There are as many bands as there are data values for x.
            .domain(d3.range(data1.length))
            // Confine it to the margins we set.
            .range([margin.left, width - margin.right])
            // Add a bit of padding.
            .padding(0.1); 

// Add a placeholder.
svg1.append("g")
    // Shift it by the margin.
   .attr("transform", `translate(${margin.left}, 0)`) 
   // Set the y-axis.
   .call(d3.axisLeft(yScale1)) 
   // Set the font size.
   .attr("font-size", '20px'); 

// Add a placeholder.
svg1.append("g")
    // Shift it by the margin.
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    // Set the x-axis.
    .call(d3.axisBottom(xScale1) 
            // Set x-axis values to the grade letter names.
            .tickFormat(i => data1[i].name))
    // Set the font size.
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// Select the bar chart.
const tooltip1 = d3.select("#hard-coded-bar")
                // Add a div to it.
                .append("div") 
                // Set the id of the div to "tooltip1".
                .attr('id', "tooltip1") 
                // Make it invisible.
                .style("opacity", 0) 
                // Set the class of the div to "tooltip".
                .attr("class", "tooltip"); 

// Define the mouseover1 event handler.
const mouseover1 = function(event, d) {
  // Format the tooltip text.
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          // Make it visible.
          .style("opacity", 1);  
}

// Define the mousemove event handler.
const mousemove1 = function(event, d) {
  // Offset it from the left when mouse is moved.
  tooltip1.style("left", (event.pageX)+"px") 
          // Offset it from the top when mouse is moved.
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// Hide the tooltip when the mouse leaves the bar.
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// Select all the bars in the chart.
svg1.selectAll(".bar") 
    // Bind the data.
   .data(data1) 
   // Enter into data without an element.
   .enter()  
   // Give the data a bar.
   .append("rect") 
      // Set its class.
     .attr("class", "bar") 
     // Give it an x-value.
     .attr("x", (d,i) => xScale1(i)) 
     // Give it a y-value.
     .attr("y", (d) => yScale1(d.score)) 
     // Set the bar height.
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     // Set the bar width.
     .attr("width", xScale1.bandwidth()) 
     // Handle mouseover event.
     .on("mouseover", mouseover1) 
     // Handle mousemove event. 
     .on("mousemove", mousemove1)
     // Handle mouseleave event.
     .on("mouseleave", mouseleave1);


// CSV Bar chart

const svg2 = d3.select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/barchart.csv").then((data) => {

  /*

    Axes

  */

  let maxY2 = d3.max(data, function(d) { return d.score; });

  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]); 

  let xScale2 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale2)) 
    .attr("font-size", '20px'); 

  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data[i].name))
      .attr("font-size", '20px'); 

  /* 

    Scatter

  */

  svg2.selectAll(".bar") 
    .data(data) 
    .enter()  
    .append("rect") 
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover1) 
      .on("mousemove", mousemove1)
      .on("mouseleave", mouseleave1);
});
