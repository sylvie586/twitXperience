function getdata(days) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               drawcharts(JSON.parse(xmlhttp.responseText));
           }
           else {
               alert('It\'s not very effective...');
               return false;
           }
        }
    };

    xmlhttp.open('GET', 'http://localhost:31337/getstats?days='+days, true);
    xmlhttp.send();
}

// -----------------------------------------------------------------------------------------------------

function drawcharts(data) {

//  collect incoming data and arrange them into two arrays

  var findings = new Array();

  for(var t in data.findings) {
    findings.push({
                    'searchword': data.findings[t].searchword,
                    'tweets': data.findings[t].tweets,
                    'height': data.findings[t].tweets
                  });
                  console.log(data.findings[t].tweets);
  }
  
//  if the columns would be too high to display, halve their heights
  
  do {
    var largest = 0;
    for (t in findings)
      if (findings[t].height > largest) largest = findings[t].height;
    if (largest > 300)
      for (t in findings)
        findings[t].height = Math.floor(findings[t].height / 2);
  } while(largest > 300);
  

//  here comes the aeroplane

d3.select('.chart').selectAll('*').remove();

d3.select('.chart')
  .selectAll('div')
    .data(findings)
  .enter().append('div')
    .style('height', function(d) { return d.height + 'px'; })
    .html(function(d) { return d.searchword + '<br /><b>' + d.tweets + '</b>' });

}
