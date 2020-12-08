// Bar chart according to id
//function getPlot(id) {
  // request json data
  d3.json("samples.json").then((data) => {
    console.log(data)

    // Define variables
    // Get sample values by id
    var sampleValues = data.samples.filter(d => d.id.toString() === "940")[0];
    console.log(sampleValues);

    // Get top 10 samples
    var sample = sampleValues.sample_values.slice(0, 10).reverse();
    console.log(sample);

    // Get top 10 OTU IDs
    var topOTU = sampleValues.otu_ids.slice(0,10).reverse();

    // Format OTU ID for bar label
    var otuIDs = topOTU.map(d => "OTU " + d);
    console.log(`OTU IDs: ${otuIDs}`);

    // Get OTU labels
    var otuLabels = sampleValues.otu_labels.slice(0, 10);
    console.log(otuLabels);


    // Create bar chart
    var trace_bar = {
      x: sample,
      y: otuIDs,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };

    var data_bar = [trace_bar];

    var layout_bar = {
      title: "Top 10 OTU for 490",
      yaxis: {
        tickmode: "linear"
      },
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 30
      }
    };

    Plotly.newPlot("bar", data_bar, layout_bar);

    // Create bubble chart
    var trace_bubble = {
      x: sampleValues.otu_ids,
      y: sampleValues.sample_values,
      mode: "markers",
      marker: {
        size: sampleValues.sample_values,
        color: sampleValues.otu_ids
      },
      text: sampleValues.otu_labels
    };

    var data_bubble = [trace_bubble];

    var layout_bubble = {
      title: "Sample 940",
      xaxis: { title: "OTU ID" }
    };

    Plotly.newPlot("bubble", data_bubble, layout_bubble);

  });

//}

// Display sample metadata
function getData(id){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata);

        var idMetadata = metadata.filter(d => d.id.toString() === id)[0];

        // Select demographic panel to put data
        var demographic = d3.select("#sample-metadata");

        // Drop any existing info in demographic panel
        demographic.html("");

        // append id info to panel
        Object.entries(idMetadata).forEach((key) => {
            demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
};

// Change event
function optionChanged(id){
    getPlot(id);
    getData(id);
};

// 