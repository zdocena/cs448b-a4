
function draw(data) {
  "use strict";


  var margin = 100,
      width = 1100,
      height = 500,
      radius = 15;




  // Create a time extent from the dates.
  // D3 uses the "date" property from the data in
  // order to calculate the minimum and
  // maximum dates.
  var x_extent = d3.extent(data, function(d) {
    return d.date;
  });

  // Creates a time scale using the x_extent
  // defined above
  var x_scale = d3.time.scale()
    .range([margin, width - margin])
    .domain(x_extent);

  // Create a similarity extent from the
  // similarities.
  // D3 uses the "similarity" property from
  // the data in order to calculate the minimum
  // and maximum similarities.
  var y_extent = d3.extent(data, function(d) {
    return d.similarity;
  });

  // Creates a similarity scale using the y_extent.
  // defined above.
  var y_scale = d3.scale.linear()
    .range([height - margin, margin])
    .domain(y_extent);

  // Append an SVG element to #content
  var content = d3.select("#content")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Add an x-axis representing the date.
  var x_axis = d3.svg.axis()
    .scale(x_scale);


  // Construct a line.
  var line = d3.svg.line()
    .x(function(d) {
      return x_scale(d.date);
    })
    .y(function(d) {
      return y_scale(d.similarity);
    });

  // Render a line.
  d3.select("svg")
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "#019cde")
    .attr("stroke-width", "15px")
    .attr("d", line(data));

  // Display nodes for every article.
  content.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .append("title")
    .text(function(d) {
      return "test";
    });

  // Select all of the circles and plot them
  // according to date vs. similarity.
  d3.selectAll("circle")
    .attr("cx", function(d) {
      return x_scale(d.date);
    })
    .attr("cy", function(d) {
      return y_scale(d.similarity);
    })
    .attr("r", radius);

$('svg circle').tipsy({
        gravity: 'w',
        html: true,
        title: function() {
          //var d = this.__data__, c = colors(d.i);
          return "sup fool";
        }
      });



}

d3.json("data.json", draw);

$(document).ready(function() {
  var $dateSlider = $("#date-slider"),
      $min = $("#min"),
      $max = $("#max"),
      minDate = 1,
      maxDate = 10;

  $dateSlider.slider({
    range: true,
    min: minDate,
    max: maxDate,
    values: [2, 8],
    create: function(event, ui) {
      console.log("create");
    },
    slide: function(event, ui) {
      var delay = function() {
        var handleIndex = $(ui.handle).index(),
            label = handleIndex === 1 ? "#min" : "#max",
            $label = $(label);

        $label.html("November 3, 2012")
          .position({
            my: "center bottom",
            at: "center top",
            of: ui.handle,
            offset: "0, -10"
          });
      };

      setTimeout(delay, 5);
    }
  });

$("#min").html("November 3, 2012").position({
  my: "center bottom",
  at: "center top",
  of: $("#date-slider a:eq(0)"),
  offset: "0, -10"
});

$("#max").html("November 25, 2012").position({
  my: "center bottom",
  at: "center top",
  of: $("#date-slider a:eq(1)"),
  offset: "0, -10"
});


});

