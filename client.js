$(ready);

function ready(){
  console.log('js and jq ready!');
  clickHandler();
}
// array of employee objects and monthly cost
let arrEmployee = [];
let monthlyCost = 0;

// sets up the formatting for the #monthly element
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

function clickHandler(){
  // handles when the submit, clear, and delete buttons are clicked
  $('#submit').on('click', addEmployee);
  $('table').on('click', '#clear', function () {
    $('tbody tr').fadeOut(500, function(){$(this).remove()});
    arrEmployee = [];
    refreshMonthlyCost();
  });
  $('#data').on('click', '.delete', function(){
    delEmployee();
    refreshMonthlyCost();
  });
}

function addEmployee(){
  // declares variables with the value of the text inputs
  const first = $('#first').val();
  const last = $('#last').val();
  const id = Number($('#id').val());
  const title = $('#title').val();
  const salary = Number($('#salary').val());
  // declares variables with elements to be appended
  const elTr = $('<tr></tr>');
  const elFirst = $(`<td>${first}</td>`);
  const elLast = $(`<td>${last}</td>`);
  const elId = $(`<td>${id}</td>`);
  const elTitle = $(`<td>${title}</td>`);
  const elSalary = $(`<td>${formatter.format(salary)}</td>`);
  const elDelBtn = $(`<td class="delete">X</td>`);
  // I love this if statement :)
  if(!first || !last || !id || !title || !salary){
    console.log('Error! Inputs cannot be empty.');
    // for(let input of $('input')){
    //   if($('input').val() === ''){
    //     $('input').css('backgrounnd-color', '#ff0000');
    //   }
    // }
    return;
  }
  // checks if the input id is already used on the table. if so, return early
  for(let i of arrEmployee){
    if(id === i.id){
      $('#id').css('background-color', 'red');
      console.log('Error! Employee with that ID already exists.');
      return;
    }
  }

  arrEmployee.push({
    first: first,
    last: last,
    id: id,
    title: title,
    salary: salary
  });
  
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

  refreshMonthlyCost();
}

function delEmployee(){
  // targets the table row closest to the button clicked
  const delElIndex = $(event.target).closest('tbody tr').index();
  arrEmployee.splice(delElIndex, 1);
  // fades then removes the table row closest to the clicked button
  $(event.target).closest('tbody tr').fadeOut(500, function(){$(this).remove()});
}

function refreshMonthlyCost(){
  // checks if the array is empty and if it is, return early
  if (arrEmployee.length === 0) {
    $('#monthly').text('$0.00');
    $('#monthly').parent().css('background-color', '#008000');
    return;
  }
  monthlyCost = 0;
  // loops through all employee objects in the array and adds them to monthlyCost
  for(let employee of arrEmployee){
    let monthlySalary = parseFloat(employee.salary / 12);
    monthlyCost += monthlySalary;
    if(monthlyCost >= 20000){
      $('#monthly').parent().css('background-color', '#ff0000');
    } else {
      $('#monthly').parent().css('background-color', '#008000');
    }
    $('#monthly').text(formatter.format(monthlyCost));
  }
}