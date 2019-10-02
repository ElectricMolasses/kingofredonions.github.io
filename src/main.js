/*
* Generate bar chart
* @param {Number[]} data      Array of numbers, may be 2D for 'stacked' bars.
*                             Stacked bars MUST be sorted, but the application will handle that
*                             itself.
* @param {Object}   options   Object containing options for the bar chart, colours, width/height, etc.
*                             Background Colour, Bar Colour, Width/Height, Bar Spacing, Bar Chart Axes,
*                             Label Alignment, X/Y-Axis Labels/Ticks, Title, Font Size/Colour.
* @param {Element}   element   HTML object where the bar chart should be drawn
*/
function drawBarChart(data, options, element) {

}

/*
* Draw a single bar
* @param {Number}   value     Value(s) of bar.
* @param {Object}   options   Options object passed to be referenced from the main drawBarChart function.
*/
function drawBar(value, options) {
  let bar = document.createElement("div");
}


/*
* Sort values DESCENDING
* @param  {Number[]} values  Array of Numbers to sort.
* @return {Number[]}  Fully sorted array.
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

/*
* Merge section of mergeSort algorithm.  Code separated for tidiness.
* @param  {Number[]} left  First array to merge in descending order.
* @param  {Number[]} right Second array to merge in descending order.
* @return {Number[]}  Two arrays merged in descending order.
*/
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

const testData = [2, 4, 5, 7, 3, [2, 6, 3, 8]];
// x-Axis labels can be provided either matching the testData length for individual labels,
// two labels (beginning/end, or automatically populated range, based on the labelType option),
// or a single label centered at the bottom.  Will auto detect.
//
// Tick range is just for y-axis ticks, based on bar values.
const testOptions = {
  width: 800,
  height: 600,
  background: 'black',
  title: 'Test Chart',
  titleColour: 'white',
  barColour: 'red',
  barTextAlign: 'top',
  barSpacing: 5,
  barAxes: 'x',
  labels: [1, 2, 3, 4, 5, 6, 7],
  tickRange: 1
};
