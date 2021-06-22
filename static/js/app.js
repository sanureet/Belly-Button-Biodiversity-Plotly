// access data using d3
d3.json("samples.json").then((BBdata) => {
    console.log(BBdata);

    //  for sample 940 only
    var  metadata = BBdata.metadata;


    // filter metadata for 940 sample
    var metadataArray = metadata.filter(sampleObject => sampleObject.id == 940);
    var oneResult = metadataArray[0];
    console.log(oneResult);

    // update panel in index.html
    var panel = d3.select("#sample-metadata");

    // clear out
    panel.html("");

    // get key value pair from metadata

    Object.entries(oneResult).forEach(([key,value]) => {
        panel.append("h5").text(`${key}: ${value}`);
    });




});