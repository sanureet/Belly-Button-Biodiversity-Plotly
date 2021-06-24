// access data using d3
d3.json("samples.json").then((BBdata) => {
    console.log(BBdata);

    //  for sample 940 only
    var  metadata = BBdata.metadata;


    // filter metadata for 940 sample
    var metadataArray = metadata.filter(sampleObject => sampleObject.id == sample);
    var data = metadataArray[0];
    console.log(data);

    // update panel in index.html
    var panel = d3.select("#sample-metadata");

    // clear out
    panel.html("");

    // get key value pair from metadata

    Object.entries(data).forEach(([key,value]) => {
        panel.append("h5").text(`${key}: ${value}`);
    });




});

// Bar Chart

function init() {
    slice_sampleValues = metadataArray.sample_values.slice(0,10);
    slice_otu_ids = metadataArray.otu_ids.slice(0,10);
    slice_otu_labels = metadataArray.otu_labels.slice(0,10);
    console.log(slice_otu_ids);
    console.log(slice_sampleValues)


    
// Create the Trace
    var trace1 = [{
        x: slice_sampleValues,
        y: slice_otu_ids,
        type: "bar",
        text: slice_otu_labels,
    }];
  
  // Create the data array for the plot
    var bardata = [trace1];
  
  // Define the plot layout
    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: { title: "Sample Value"},
        yaxis: { title: "sample IDs" }
    };


  
  // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar-plot", bardata, layout)


// dropdown menu

    var dropdownMenu = d3.select("#selDataset").node();

    var inputValue = dropdownMenu.value;
    console.log(inputValue);

    // filter dataset
    dataset = metadata.filter(sampleObject => sampleObject.id === inputValue) [0];
    console.log(dataset);

    SampleValues = dataset.sample_values;
    otuIds = dataset.otu_ids;
    OtuLabels = dataset.otu_labels


// bubble chart
    var ids = data.otu_ids;
    var labels = data.otu_labels;
    var values = data.sample_values;


    var layoutBubble = {
        margin: { t: 0},
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
    };

    var DataBubble = [
        {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values,
            }
        }
    ];

    Plotly.newPlot("bubble", DataBubble, layoutBubble);


    init();





}