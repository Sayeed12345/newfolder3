const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var fullname = document.getElementById('fullname');
    var email = document.getElementById('email');
    var contact = document.getElementById('contact');
    

    // Save the person in the database
    database.addPerson(fullname.value, email.value, contact.value);

    // Reset the input fields
    fullname.value = '';
    email.value = '';
    contact.value = '';
    

    // Repopulate the table
    populateTable();
  });
}

// Populates the persons table
function populateTable() {

  // Retrieve the persons
  database.getPersons(function(persons) {

    // Generate the table body
    var tableBody = '';
    for (i = 0; i < persons.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + persons[i].fullname + '</td>';
      tableBody += '  <td>' + persons[i].email + '</td>';
      tableBody += '  <td>' + persons[i].contact + '</td>';
      tableBody += '  <td><input style="background-color:red;color:white;width:100px;height:40px;" type="button" value="Delete" onclick="deletePerson(\'' + persons[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });

}

// Deletes a person
function deletePerson(id) {

  // Delete the person from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}
