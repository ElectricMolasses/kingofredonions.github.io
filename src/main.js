let MAX = 10; //Used mutable because java is unable to initialize a constant outside of the same scope/block.

/*
* Generate bar chart
* @param {Number[]}  data      Array of numbers, may be 2D for 'stacked' bars.
*                              Stacked bars MUST be sorted, but the application will handle that
*                              itself.
* @param {Object}    options   Object containing options for the bar chart, colours, width/height, etc.
*                              Background Colour, Bar Colour, Width/Height, Bar Spacing, Bar Chart Axes,
*                              Label Alignment, X/Y-Axis Labels/Ticks, Title, Font Size/Colour.
* @param {Element}   element   HTML object where the bar chart should be drawn
*/
function drawBarChart(data, options, element) {
  if (!Array.isArray(data)) {
    throw new Error('drawBarChart @param data | Invalid data type');
  }

  let container = createContainer(options);
  element.append(container);

  tData = sortInnerArrays([...data]);

  MAX = findMax2D(tData);

  for (let i = 0; i < tData.length; i++) {
    if (Array.isArray(tData[i])) {
      container.append(drawStackedBar(tData[i], options));
    } else {
      container.append(drawBar(tData[i], options));
    }
  }
}

function createContainer(options) {
  let container = $("<div></div>");

  container.width(options.width);
  container.height(options.height);
  container.css('display', 'flex');
  container.css('align-items', 'flex-end');
  container.css('background-color', options.background);

  return container;
}

/*
* Draw a single bar
* @param {Number}   value     Value(s) of bar.
* @param {Object}   options   Options object passed to be referenced from the main drawBarChart function.
* @return Returns a bar HTML element.
*/
function drawBar(value, options) {
  if (isNaN(value)) {
    throw new Error ('drawBar @param value | Invalid data type');
  }

  let bar = $("<div></div>");
  bar.height(relativeHeight(value, options) - 10); //Subtract top/bot padding to space value better.
  bar.css('padding-top', 5);
  bar.css('padding-bottom', 5);
  bar.css('flex-grow', 1);
  bar.css('margin', options.barSpacing);
  bar.css('background-color', options.barColour);

  bar.css('display', 'flex');

  if (typeof options.barTextAlign !== 'string') {
    options.barTextAlign = 'top';
  }
  if (options.barTextAlign.toLowerCase() === 'bottom')
    bar.css('align-items', 'flex-end');
  else if (options.barTextAlign.toLowerCase() === 'center')
    bar.css('align-items', 'center');
  else
    bar.css('align-items', 'flex-start');

  bar.css('justify-content', 'center');

  bar.text(value);

  return bar;
}

/*
* Draw overlapping bars
* @param  {Number[]}  values  Values of bars to overlap.
* @param  {Object}    options Options object passed to drawBarChart function.
* @return   Returns a stacked bar HTML element.
*/
function drawStackedBar(values, options) {

}

function relativeHeight(value, options) {
  return (value / MAX) * options.height;
}

/*
* Sort all inner arrays by descending values.
* This is only used for the max function to determine height of bars relative
* to the height propety.
* @param  {Number[]} data  Full barchart array.
* @return {Number[]} Full array with all inner arrays sorted descending.
*/
function sortInnerArrays(data) {
  if (!Array.isArray(data)) {
    throw new Error ('sortInnerArrays @param data | Invalid data type');
  }

  let tData = [...data];

  for (let i = 0; i < tData.length; i++) {
    if (Array.isArray(tData[i])) {
      tData[i] = tData[i].sort((a, b) => b - a);  // Sort descending.
    }
  }

  return tData;
}

/*
* Find the max value in the post-sorted array.
* @param  {Number[]}  2D Array to find max value in, with sub-arrays pre-sorted.
* @return Highest value in the 2D array.
*/
function findMax2D(values) {
  if (!Array.isArray(values)) {
    throw new Error ('findMax2D @param data | Invalid data type');
  }

  let tValues = [...values];
  let MAX;
  if (Array.isArray(tValues[0]))
    MAX = tValues[0][0];
  else MAX = tValues[0];

  for (let i = 1; i < tValues.length; i++) {
    if (Array.isArray(tValues[i]))
      if (MAX < tValues[i][0]) //Check only first value in sub-arrays.
        MAX = tValues[i][0];
    else if (MAX < tValues[i])
      MAX = tValues[i];
  }

  return MAX;
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
  stackColours: ['red', 'green'],
  barTextAlign: null,
  barSpacing: 5,
  barAxes: 'x',
  labels: [1, 2, 3, 4, 5, 6, 7],
  tickRange: 1
};

$(document).ready(function() {
  drawBarChart(testData, testOptions, $('#bar-form'));
});

