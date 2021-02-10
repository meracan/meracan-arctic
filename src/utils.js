import React from 'react';
import _ from 'lodash';



export const getRgbArray=(color, alpha)=> {
    // Always return an array, either empty or filled.
    var rgb = [];
    var hex;
    
    // Get an array of rgb(a) values.
    if (color.substr(0, 1) === '#') {
        /* HEX STRING */
        // If the first character is # we're dealing with a hex string. Get
        // an array of each character. This is more explicit than dealing
        // with the indices of a String object due to all other instances
        // of hex in this function.
        hex = color.substr(1).split('');
        if (hex.length === 3) {
            // If this is a 3-char color, e.g. #f00, make it 6 characters
            // by duplicating each one.
            hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
        }
        if (hex.length === 6) {
            // Only deal with 6-char hex colors when computing the rgb
            // array. Anything else at this point has been passed
            // incorrectly.
            var i = 0;
            var x = 0;
            var hexStr;
            // Convert each hex pair (represented by hexStr) into a decimal
            // value to go in rgb[]. i is the rgb[] index whilst x is 2i,
            // which translates Array(3) to Array(6).
            while (i < 3) {
                hexStr = hex[x] + hex[x + 1];
                rgb[i] = parseInt(hexStr, 16);
                i += 1;
                x = i * 2;
            }
        }
    } else if (color.search(/rgb/) !== -1) {
        /* RGB(A) STRING */
        rgb = color.match(/([0-9]+\.?[0-9]*)/g);
    }
    
    // Add or remove the alpha value.
    if (alpha && rgb.length === 3) {
        // If an alpha value has been requested and there currently isn't
        // one, add 1 as the alpha value.
        rgb.push(1);
    } else if (! alpha && rgb.length === 4) {
        // Otherwise if there's an alpha value that hasn't been requested,
        // remove it.
        rgb.pop();
    }
    
    // Ensure all values in rgb are decimal numbers, not strings.
    for (var i = 0; i < rgb.length; i++) {
        rgb[i] = parseInt(rgb[i], 10);
    }
    
    return rgb;
    }
    
const convertToCSV=(objArray)=> {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

export const exportCSVFile=(header=['x','y'],x=[],y=[], fileTitle)=>{
   
    const items=col2Row(x,y);
    console.log(items)
    items.unshift(header);
    
    // Convert Object to JSON
    const jsonObject = JSON.stringify(items);
    const csv = convertToCSV(jsonObject);
    

    const exportedFilenmae = fileTitle + '.csv' || 'export.csv';
        
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
   
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

}

export const col2Row=(x,y)=>x.map((v,i)=>[x[i],y[i]])
