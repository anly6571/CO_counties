
import * as d3 from "d3";
import "./styles.css";

var w = 900;
var h = 700;

var svg = d3.select("div#container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .style("background-color","#c9e8fd")
    .attr("viewBox", "0 0 " + w + " " + h)
    .classed("svg-content", true);

var projection = d3.geoMercator().translate([w/2, h/2]).scale(5300).center([-105.5,39]) //40, 104
var path = d3.geoPath().projection(projection);
    
// load data  
var coloMap = d3.json("CO-counties.geojson");
//var names = coloMap


Promise.all([coloMap]).then((res)=>  {

  //console.log(res)
  //console.log(path.centroid(res[0].features[0]))  

svg.selectAll("path")
    .data(res[0].features)
    .enter()
    .append("path")
    .attr("class","county")
    .attr("d", path);

svg.append("g")
      .attr("fill", "red")
    .selectAll()
      .data(res[0].features)
      .enter()
        .append("rect")
        .attr("transform", d => `translate(${path.centroid(d)})`)
          // .attr("cx", d => path.centroid(d)[0])
          // .attr("cy", d => path.centroid(d)[1])
          .attr("height", 10)
          .attr('width', 1000);
      

  let coordinates = projection([-104.990251, 39.7392358]);
  svg.append("circle")
  .attr("cx", coordinates[0])
  .attr("cy", coordinates[1])
  .attr("r", 5)
  .style("fill", "red");
      }); 
//path.centroid(res);