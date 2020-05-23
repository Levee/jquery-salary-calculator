$(ready);

function ready(){
  console.log('js and jq ready!');
  $('#submit').on('click', function(){
    addEmployee();
  });
  $('#clear').on('click', function(){
    $('tbody').empty();
  });
}

function addEmployee(){
  // declares variables with the value of the text inputs
  let first = $('#first').val();
  let last = $('#last').val();
  let id = $('#id').val();
  let title = $('#title').val();
  let salary = $('#salary').val();
  // declares variables with elements to be appended
  let elTr = $('<tr></tr>');
  let elFirst = $(`<td>${first}</td>`);
  let elLast = $(`<td>${last}</td>`);
  let elId = $(`<td>${id}</td>`);
  let elTitle = $(`<td>${title}</td>`);
  let elSalary = $(`<td>${salary}</td>`);
  let elDelBtn = $(`<td><button class="delete">Delete</button></td>`);

  // I love this if statement
  if(!first || !last || !id || !title || !salary){
    console.log('Error! Inputs cannot be empty.');
    return;
  }
  
  $('tbody').append(elTr);
  $('tbody tr:last-child').append(elFirst);
  $('tbody tr:last-child').append(elLast);
  $('tbody tr:last-child').append(elId);
  $('tbody tr:last-child').append(elTitle);
  $('tbody tr:last-child').append(elSalary);
  $('tbody tr:last-child').append(elDelBtn);

  $('#first').val('');
  $('#last').val('');
  $('#id').val('');
  $('#title').val('');
  $('#salary').val('');

  $('.delete').on('click', function(event){
    delEl = event.target;
    delEmployee();
  });
}

// function updateCost(){
//   let monthlyCost = 0;
//   for(let i of $('thead tr')){
//     let salaryMonthly = Number($(`thead ${i}:nth-child(4)`).val()) / 12;
//     monthlyCost += salaryMonthly;
//     $('#monthly').empty();
//     $('#monthly').text(parseInt(monthlyCost));
//   }
// }

function numDisplay(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}