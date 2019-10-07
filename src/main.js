let MAX; //Used mutable because java is unable to initialize a constant outside of the same scope/block.

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

  let container = createContainerCol(options);
  let header = createTitleBox(options);
  let barContainer = createBarContainer(options);
  let labelContainer = createContainerRow(options);

  element.append(container);

  tData = sortInnerArrays([...data]);
  generateLabels(tData, options, labelContainer);

  MAX = findMax2D(tData);

  barContainer.append(addTicks(options));

  for (let i = 0; i < tData.length; i++) {
    if (Array.isArray(tData[i])) {
      barContainer.append(drawStackedBar(tData[i], options));
    } else {
      barContainer.append(drawBar(tData[i], options));
    }
  }

  container.append(header);
  container.append(barContainer);
  container.append(labelContainer);
}

/*
* Creates column oriented container.
* @param  {Object}  options   Main options object.
*/
function createContainerCol(options) {
  let container = $('<div></div>')
                   .width(options.width)
                   .css('display', 'flex')
                   .css('flex-direction', 'column');

  return container;
}

/*
* Creates row oriented container.
* @param  {Object}  options   Main options object.
*/
function createContainerRow(options) {
  let container = $('<div></div>')
                   .width(options.width)
                   .css('display', 'flex')
                   .css('flex-direction', 'row');

  return container;
}

function generateLabels(values, options, element) {
  if (options.labels.length !== values.length)
    throw new Error ("Invalid Value:Labels length.  Must match.");

  element.height(25);

  //Add offset for the tick element inside the bars.
  element.append($('<div></div>').width(9));

  for (let i = 0; i < options.labels.length; i++) {
    element.append($('<div></div>')
                    .text(options.labels[i])
                    .css('flex-grow', 1)
                    .css('text-align', 'center'));
  }
}

/*
* Creates a title box above the bar chart, currently adds to height
* instead of consuming it.
* @param  {Object}   options  Main options object.
*/
function createTitleBox(options) {
  let titleBox = $('<div></div>')
                  .width(options.width)
                  .height(40)
                  .css('background', options.background)
                  .css('display', 'flex')
                  .css('align-items', 'center')
                  .css('justify-content', 'center')
                  .attr('id', 'titleContainer');
  titleBox.append($('<p></p>')
                  .text(options.title)
                  .css('color', options.titleColour)
                  .css('text-align', 'center')
                  .css('font-size', options.titleSize)
                  .attr('id', 'titleText')
                  );

  return titleBox;
}

/*
* Live edit of the title text.
* @param  {String}  text  New title for bar chart.
*/
function editTitleText(text) {
  $('#titleText').text(text);
}

/*
* Creates container to house all bar elements.
* @param  {Object}  options   Object containing all bar chart options.
* @return {Element}   Returns a HTML element to append bars to.
*/
function createBarContainer(options) {
  let container = $('<div></div>');

  container.width(options.width)
           .height(options.height)
           .css('display', 'flex')
           .css('align-items', 'flex-end')
           .css('background-color', options.background)
           .addClass('barChartBox');

  return container;
}

/*
* Creates a stacked div set to show ticks.
* @param  {Object} options   Options object passed to main function.
* @return {Element} Returns a div containing elements to create ticks.
*/
function addTicks(options) {
  let ticks = $('<div></div>');

  ticks.height('100%')
       .width(5)
       .css('display', 'flex')
       .css('flex-direction', 'column')
       .css('margin', '0')
       .addClass('tickContainer');

  //Testing base tick at each interval, will add custom intervals later.
  for (let i = 0; i < MAX; i++) {
    let tick = $('<div></div>')
         .width(5)
         .css('border-color', '#000000')
         .css('border-width', '2px')
         .css('margin', '0')
         .height(Math.floor(relativeHeight(1, options) * options.tickInterval));
    if ((MAX - i) % options.tickInterval === 0) tick.css('border-top-style', 'solid');
    ticks.append(tick);
  }

  return ticks;
}

/*
* Draw a single bar
* @param  {Number}   value     Value(s) of bar.
* @param  {Object}   options   Options object passed to be referenced from the main drawBarChart function.
* @return {Object}  Returns a bar HTML element.
*/
function drawBar(value, options) {
  if (isNaN(value)) throw new Error ('drawBar @param value | Invalid data type');

  let bar = $('<div></div>');
  bar.height(relativeHeight(value, options) - 10) //Subtract top/bot padding to space text better.
     .css('padding-top', 5)
     .css('padding-bottom', 5)
     .css('flex-grow', 1)
     .css('margin-left', options.barSpacing)
     .css('margin-right', options.barSpacing)
     .css('background-color', options.barColour)
     .css('display', 'flex')
     .css('justify-content', 'center')
     .text(value)
     .addClass('bar');

  if (typeof options.barLabelColour === 'string') {
    bar.css('color', options.barLabelColour);
  }

  if (typeof options.barTextAlign !== 'string') {
    options.barTextAlign = 'top';
  }
  if (options.barTextAlign.toLowerCase() === 'bottom')
    bar.css('align-items', 'flex-end');
  else if (options.barTextAlign.toLowerCase() === 'center')
    bar.css('align-items', 'center');
  else
    bar.css('align-items', 'flex-start');

  return bar;
}

/*
* Draw overlapping bars
* @param  {Number[]}  values  Values of bars to overlap.
* @param  {Object}    options Options object passed to drawBarChart function.
* @return {Object}  Returns a stacked bar HTML element.
*/
function drawStackedBar(values, options) {
  if (!Array.isArray(values)) throw new Error('drawStackedBar @param values | Invalid data type');

  let tValues = [...values];
  let colourPointer = 0;
  let fontColourPointer = 0;
  let stackContainer = createStackContainer(options);

  if (tValues.length <= options.stackColours.length)
    colourPointer = tValues.length - 1;
  else {
    colourPointer = (tValues.length % options.stackColours.length) - 1;
    if (colourPointer < 0) colourPointer += options.stackColours.length -1;
  }

  if (tValues.length <= options.stackLabelColours.length)
    fontColourPointer = tValues.length - 1;
  else {
    fontColourPointer = (tValues.length % options.stackLabelColours.length) - 1;
    if (fontColourPointer < 0) fontColourPointer += options.stackLabelColours.length;
  }

  for (let i = 0; i < tValues.length; i++) {
    let curHeight;
    if (tValues[i+1] !== undefined)
      curHeight = tValues[i] - tValues[i+1];
    else curHeight = tValues[i];
    // Cut the stacked bars into visible pieces for the purpose of value alignment within each sub-bar.
    curHeight = relativeHeight(curHeight, options) - 10;

    let curBar = drawBar(tValues[i], options).css('margin', 0)
                                             .height(curHeight)
                                             .css('width', '100%')
                                             .css('background-color', options.stackColours[colourPointer])
                                             .css('color', options.stackLabelColours[fontColourPointer]);
    if (i !== 0) curBar.addClass('lowerStackBar')
      else curBar.addClass('topStackBar');
    curBar.removeClass('bar');

    if (colourPointer === 0)
      colourPointer = options.stackColours.length - 1;
    else colourPointer--;

    if (fontColourPointer === 0) {
      fontColourPointer = options.stackLabelColours.length -1;
    } else fontColourPointer--;

    stackContainer.append(curBar);
  }

  return stackContainer;
}

/*
* Creates the container element for stacked bars.
* @param {Object}   options   Options object passed to main drawBarChart function.
* @return {Element}   Returns HTML element to contain stacked bars.
*/
function createStackContainer(options) {
  return $('<div></div>').css('display', 'flex')
                         .css('flex-direction', 'column')
                         .css('flex-grow', 1)
                         .css('align-items', 'flex-end')
                         .css('margin', 0)
                         .css('margin-left', options.barSpacing)
                         .css('margin-right', options.barSpacing)
                         .addClass('stack');
}

/*
* Finds height of a bar relative to the user selected height.
* @param  {Number}  value   Value of the individual bar/bar piece.
* @param  {Object}  options Main options object.
* @return {Number}    Height for provided bar value.
*/
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
  if (!Array.isArray(data)) throw new Error ('sortInnerArrays @param data | Invalid data type');

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
* @return {Number}    Highest value in the 2D array.
*/
function findMax2D(values) {
  if (!Array.isArray(values)) throw new Error ('findMax2D @param data | Invalid data type');

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

const testData = [2, 4, 5, 7, 3, [2, 6, 8], [7, 4, 2, 14, 3, 12], 7];
// x-Axis labels can be provided either matching the testData length for individual labels,
// two labels (beginning/end, or automatically populated range, based on the labelType option),
// or a single label centered at the bottom.  Will auto detect.
//
// Tick range is just for y-axis ticks, based on bar values.
const testOptions = {
  width: 800,
  height: 500,
  background: 'grey',
  title: 'Test Chart',
  titleColour: 'white',
  titleSize: 50,
  barColour: 'red',
  barLabelColour: 'teal',
  stackColours: ['red', 'orange', 'yellow', 'darkred'],
  stackLabelColours: ['black', 'white'],
  barTextAlign: null,
  barSpacing: 15,
  barAxes: 'x',
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  tickInterval: 2
};

$(document).ready(function() {
  drawBarChart(testData, testOptions, $('#bar-form'));
});
