/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const svg = d3.select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => {

  /*

    Axes

  */

  let maxY = d3.max(data, function(d) { return d.score; });

  let yScale = d3.scaleLinear()
              .domain([0,maxY])
              .range([height-margin.bottom,margin.top]); 

  let xScale = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale)) 
    .attr("font-size", '20px'); 

  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale) 
              .tickFormat(i => data[i].day))
      .attr("font-size", '20px'); 


  
  /*

    Events

  */

  const mouseover2 = function(event, d) {
    // Format the tooltip text.
    tooltip1.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
            // Make it visible.
            .style("opacity", 1);  
  }

  /* 

    Bars 

  */

  svg.selectAll(".bar") 
    .data(data) 
    .enter()  
    .append("circle") 
      .attr("class", "bar") 
      .attr("cx", (d,i) => xScale(i) + margin.left) 
      .attr("cy", (d) => yScale(d.score)) 
      .attr("r", 20)
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove1)
      .on("mouseleave", mouseleave1);
});






