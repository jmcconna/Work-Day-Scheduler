// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  //A reference to the parent DOM of the timeBlocks (which contain textareas and buttons)
  var timeBlocksContainer = document.getElementById("timeBlocksContainer");

  //add event listener to every save button
  var saveButtons = $(timeBlocksContainer).children().children('.saveBtn');
  console.log(saveButtons);
  for (i=0; i<saveButtons.length; i++) {
  saveButtons[i].addEventListener("click", function() {
    //find the parent <div> of the button to grab the "hour-x" id
    console.log("This is: "+ this);
    var hourId = $(this).parent().attr("id");
    console.log(hourId);
    var textArea = $(this).siblings()[1];
    console.log("Siblings returns: "+textArea);
    var descriptionText = $(this).siblings()[1].value;
    console.log(descriptionText);
    //save the textarea textContent using the hourId as the key
    storeDescription(hourId, descriptionText);
  })};
  
  function storeDescription(hourId, descriptionText) {
    localStorage.setItem(hourId, JSON.stringify(descriptionText));
  }

  //code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour

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
 
  //code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements
  for (i=0; i<timeBlocks.length; i++){
  //for <div> with id "hour-x", check localStorage for a matching "hour-x" key
  var timeBlock = timeBlocks[i]; //grab an individual time block
  var hourKey = timeBlock.id; //grab the id of the time block
  var storedDescription = JSON.parse(localStorage.getItem(hourKey)); //using the id, grab the stored text from local storage
  $(timeBlock).children()[1].value = storedDescription; //set the value of the text area to the text retrieved from local storage
  }

  //code to display the current date in the header of the page.
  var today = dayjs();  //declare a variable and call dayjs to fetch the current date
  $('#currentDay').text(today.format("dddd, MMMM D")); //format the date and set the text in the header to the current date
  //console.log(today);
});
