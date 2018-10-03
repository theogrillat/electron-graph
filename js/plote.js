var st = new SpeedTest();

st.test({
    onStart: function () {
        console.log("Testing connection speed");
    },
    onEnd: function (results) {
        alert("Speed: " + results.mbps + " Mbps");
        console.log("Test took " + results.time.run + " seconds");
    }
});

function parseData(createGraph) {
    Papa.parse("./data/test.csv", {
        download: true,
        complete: function(results) {
            // console.log("Finished:", results.data);
            createGraph(results.data);
        }
    });
}

function createGraph(data) {
    var test = ['Test'];
    var download = ['Descendant'];
    var upload = ['Ascendant'];
    var ping = ['Latence'];

    for (var i = 1; i < data.length-1; i++) {
        test.push(data[i][0]);
        download.push(parseInt(data[i][7]/1000000));
        upload.push(parseInt(data[i][8]/1000000));
        ping.push(parseInt(data[i][6]));
    }

    console.log(ping);

    console.log(test);
    console.log(download);

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                download,
                upload,
                ping
            ],
            types: {
                Descendant: 'area-spline',
                Ascendant: 'area-spline',
                Latence: 'step'
            },
            axes: {
                Descendant: 'y',
                Ascendant: 'y',
                Latence: 'y2'
            }
        },
        axis: {
            y: {
                tick: {
                    format: function (d) { return d + " Mb/s"; }
                }
            },
            y2: {
                tick: {
                    format: function (d) { return d + " ms"; }
                },
                show: true
            }
        },
        grid: {
            y: {
                lines: [
                    {value: 100, text: '100 Mb/s'},
                    {value: 50, text: '50 Mb/s'}
                    // {value: 40, text: '40 Mb/s'},
                    // {value: 30, text: '30 Mb/s'},
                    // {value: 20, text: '20 Mb/s'},
                    // {value: 15, text: '15 Mb/s'},
                    // {value: 10, text: '10 Mb/s'},
                    // {value: 5, text: '5 Mb/s'}
                ]
            }
        }
    });
}

parseData(createGraph);


$( "#target" ).click(function() {
    const exec = require('child_process').exec;

    function execute(command, callback) {
        exec(command, (error, stdout, stderr) => { 
            callback(stdout); 
        });
    };

    // call the function
    execute('start sh --login -e ./test.sh', (output) => {
        console.log(output);
    });
  });