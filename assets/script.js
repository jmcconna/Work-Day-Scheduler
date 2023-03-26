// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  //A reference to the parent DOM of the timeBlocks (which contain textareas and buttons)
  var timeBlocksContainer = document.getElementById("timeBlocksContainer");

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //add event listener to every save button
  var saveButtons = $(timeBlocksContainer).children().children('.saveBtn');
  console.log(saveButtons);
  for (i=0; i<saveButtons.length; i++) {
  saveButtons[i].addEventListener("click", function() {
    //find the parent <div> of the button to grab the "hour-x" id
    console.log("This is: "+ this);
    var hourId = $(this).parent().attr("id");
    console.log(hourId);
    
  })};
  


  //use the "hour-x" id as the key to save the text in textarea to local storage

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //grab the current hour of the day
  var currentHour = dayjs().format("H");
 
  //create an array of all the timeBlock HTML elements
  var timeBlocks = $(timeBlocksContainer).children('.time-block');
  console.log(timeBlocks);
  //for each timeBlock, check the id tag against the current hour from the 24 clock from dayjs
  for (i=0; i<timeBlocks.length; i++) {
    //grab a row using the id tag with the hour //better to target a parent class, and then traverse parent, child, sibling
    var timeBlock = timeBlocks[i]; //maybe use children[i] DOM traversal instead or target specific siblings through  Jquery
    var timeBlockhour = i+9;
    //if the id tag for the hour row is earlier than the current hour, assign ".past" class
    if(timeBlockhour<currentHour) {
      timeBlock.setAttribute("class", "row time-block past");
    }
    //if the id tag for the hour row is earlier than the current hour, assign ".past" class
    if(timeBlockhour===currentHour) {
    timeBlock.setAttribute("class", "row time-block present");
    }
    //if the id tag for the hour row is earlier than the current hour, assign ".past" class
    if(timeBlockhour>currentHour) {
    timeBlock.setAttribute("class", "row time-block future");
    }
  };
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  //code to display the current date in the header of the page.
  var today = dayjs();  //declare a variable and call dayjs to fetch the current date
  $('#currentDay').text(today.format("dddd, MMMM D")); //format the date and set the text in the header to the current date
  //console.log(today);
});
