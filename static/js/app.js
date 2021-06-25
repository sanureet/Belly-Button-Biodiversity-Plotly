// access data using d3
// access metadata
function buildmetadata(sample) {
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
}
// build metadata

// buildmetadata(940);
// Bubble Chart
function buildbubblechart(sample) {

    d3.json("samples.json").then((BBdata) => {
        console.log(BBdata);

    var dataSample = BBdata.samples;

    var resultArray = dataSample.filter(sampleObject => sampleObject.id == sample);

    var resultItem = resultArray[0];
    console.log(resultItem);

    var otu_ids = resultItem.otu_ids;
    var otu_labels = resultItem.otu_labels;
    var sample_values = resultItem.sample_values;

    var layoutBubble = {
        margin: { t: 30},
        xaxis: { title: "OTU ID" },
        title: "Bacteria Culture per sample",
        hovermode: "closest",
    };

    var DataBubble = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values,
            }
        }
    ];

    Plotly.newPlot("bubble", DataBubble, layoutBubble);

    });
}
// build bubble chart
// buildbubblechart(940);


// build Bar chart
function buildBarchart(sample) {

    d3.json("samples.json").then((BBdata) => {
        console.log(BBdata);
        var dataSample = BBdata.samples;

        var resultArray = dataSample.filter(sampleObject => sampleObject.id == sample);

        var resultItem = resultArray[0];
        console.log(resultItem);

        var otu_ids = resultItem.otu_ids;
        var otu_labels = resultItem.otu_labels;
        var sample_values = resultItem.sample_values;


        var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        
        
        // Create the Trace
        var trace1 = [{
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            orientation: "h",
            text: otu_labels.slice(0,10).reverse(),
        }];
    
    // Create the data array for the  bar plot
        var bardata = trace1;
    
    // Define the plot layout
        var layout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t:30, l:170},
            xaxis: { title: "Sample Value"},
            yaxis: { title: "sample IDs" },
        };


    
    // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", bardata, layout);



    });   
}
// buildBarchart(940);

//  building dropdown menu
function init() {
    // grab dropdowm references from html

    var dropdownMenu = d3.select("#selDataset");
    d3.json("samples.json").then((BBdata) => {
        console.log(BBdata);
        var dataSample = BBdata.samples;

        // get sample names
        var sampleNames = BBdata.names;

        // adding options to dropdown menu with the help of Tutor
        sampleNames.forEach((sample) => { 
            dropdownMenu
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        buildmetadata(940);
        buildBarchart(940);
        buildbubblechart(940);



    });


}

function optionChanged(sample) {
    buildmetadata(sample);
    buildBarchart(sample);
    buildbubblechart(sample);

}




init();

