//  -------------------------------------------------------------------------------------------------------------
//  auxilary routines
//  -------------------------------------------------------------------------------------------------------------

module.exports = {

//  --- start of of module.exports ---

//  routine to convert timestamps to log format

  timestamp2log: function(timestamp) {
    var ts = timestamp.getFullYear()+'/';
    
    var temp = timestamp.getMonth()+1;
    if (Number(temp) < 10) temp = '0'+temp;
    ts += temp + '/';

    var temp = timestamp.getDate();
    if (Number(temp) < 10) temp = '0'+temp;
    ts += temp + ' ';
    
    var temp = timestamp.getHours();
    if (Number(temp) < 10) temp = '0'+temp;
    ts += temp + ':';
    
    var temp = timestamp.getMinutes();
    if (Number(temp) < 10) temp = '0'+temp;
    ts += temp + ':';
    
    var temp = timestamp.getSeconds();
    if (Number(temp) < 10) temp = '0'+temp;
    ts += temp + ' ';
    
    return ts;
  }

//  --- end of module.exports ---

}
