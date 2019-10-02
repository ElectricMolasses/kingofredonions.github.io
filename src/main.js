/*
* Generate bar chart
* @param {Number[]} data      Array of numbers, may be 2D for 'stacked' bars.
*                             Stacked bars MUST be sorted, but the application will handle that
*                             itself.
* @param {Object}   options   Object containing options for the bar chart, colours, width/height, etc.
*                             Background Colour, Bar Colour, Width/Height, Bar Spacing, Bar Chart Axes,
*                             Label Alignment, X/Y-Axis Labels/Ticks, Title, Font Size/Colour.
* @param {Elemet}   element   HTML object where the bar chart should be drawn
*/
function drawBarChart(data, options, element) {

}

/*
* Draw a single bar
* @param {Number}   value     Value(s) of bar.
* @param {Object}   options   Options object passed to be referenced from the main drawBarChart function.
*/
function drawBar(value, options) {

}


/*
* Sort values DESCENDING
* @param {Number[]} values  Array of Numbers to sort.
*/
function mergeSort(values) {
  let sort = [...values];

  if (sort.length <= 1) {
    return sort;
  }

  let middle = sort.length / 2;
  let left = sort.slice(0, middle);
  let right = sort.slice(middle, sort.length);

  left = [...mergeSort(left)];
  right = [...mergeSort(right)];

  return merge(left, right);
}

function merge(left, right) {
  let l = [...left];
  let r = [...right];
  let output = [];

  while (l.length > 0 || r.length > 0) {
    if (l[0] >= r[0] || r.length === 0) {
      output.push(l.shift());
    } else {
      output.push(r.shift());
    }
  }
  return output;
}
