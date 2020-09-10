/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// maximum items per page
const itemsPerPage = 9;

/***
 * @function createLI - create a HTML LI for a student
 * @param {object} student - student data
 * @return {string} - HTML LI string
***/
function createLI(student) {

   // create variables neeeded to be displayed
   let name = student.name.first + " " + student.name.last;
   let email = student.email;
   let registered = student.registered;
   let picture = student.picture.medium;

   // create HTML for student info
   let studentHTML = `
      <div class="student-details">
      <img class="avatar" src="${picture}" alt="Profile Picture">
      <h3>${name}</h3>
      <span class="email">${email}</span>
      </div>
   `;

   // create HTML for date joined info
   let joinedDateHTML = `
      <div class="joined-details">
      <span class="date">Joined ${registered.date}</span>
      </div>
   `;

   // create the LI string
   let li = `<li class="student-item cf">`;
   li += studentHTML;
   li += joinedDateHTML;
   li += `</li>`;

   return li;
}


/***
 * @function setActiveButtonClass - set active class on pressed paganation button
 * @param {number} index - index of pressed button
***/
function setActiveButtonClass(index){
   // clear class for all paganation buttons
   let linkList = document.querySelector('.link-list');
   let liElements = linkList.getElementsByTagName('li');
   for( let i = 0; i < liElements.length; i++){
      liElements[i].firstElementChild.className = '';
   }

   // set class on the active paganation button
   let activeButtonIndex = index;
   liElements[activeButtonIndex].firstElementChild.className = 'active';
}


/***
 * @function showPage - create and insert/append the elements needed to display a "page" of nine students
 * @param {object} list - array of student objects
 * @param {number} page - number of page to be displayed
***/
function showPage(list, page) {

   // calculate start and end index
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;

   // out of bounds checking
   if (endIndex > list.length) {
      endIndex = list.length;
   }

   // get ul element and clear previous HTML
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = startIndex; i < endIndex; i++) {
      // retrieve student object from data store
      let student = list[i];

      // create LI element with student data
      const li = createLI(student);

      // insert LI before end of UL
      studentList.insertAdjacentHTML('beforeend', li);
   }
}


/***
 * @function addPagination - create and insert/append the elements needed for the pagination buttons
 * @param {object} list - array of student objects
***/
function addPagination(list) {

   // calculate number of pagination buttons needed
   let numberOfButtons = parseInt(list.length / itemsPerPage) + 1;

   // select the UL for buttons
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   // create the buttons
   let className = ` class="active"`;
   for (let i = 0; i < numberOfButtons; i++) {
      if (i > 0) {
         className = '';
      }

      // add li for each page
      let li = `
         <li>
            <button type="button"${className}>${i + 1}</button>
          </li>
      `;

      // insert the li item to ul
      linkList.insertAdjacentHTML('beforeend', li);
   }

   // add event listener
   linkList.addEventListener('click', (e) => {
     
      // check that event is from a button
      if (e.target.type === 'button') {
         // set the class on the active button
         let activeButtonIndex = e.target.innerHTML;
         setActiveButtonClass(activeButtonIndex - 1);

         // show the selected page items
         showPage(data, activeButtonIndex);
      }
   });
}

// show first page of items
showPage(data, 1);

// add pagination buttons
addPagination(data);