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

let arrEmployee = [];

function addEmployee(){
  // declares variables with the value of the text inputs
  let first = $('#first').val();
  let last = $('#last').val();
  let id = Number($('#id').val());
  let title = $('#title').val();
  let salary = Number($('#salary').val());
  // declares variables with elements to be appended
  let elTr = $('<tr></tr>');
  let elFirst = $(`<td>${first}</td>`);
  let elLast = $(`<td>${last}</td>`);
  let elId = $(`<td>${id}</td>`);
  let elTitle = $(`<td>${title}</td>`);
  let elSalary = $(`<td>${salary}</td>`);
  let elDelBtn = $(`<td><button class="delete">Delete</button></td>`);

  arrEmployee.push({
    first: first,
    last: last,
    id: id,
    title: title,
    salary: salary
  });

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
  
  $('.delete').on('click', function (event) {
    delEmployee();
  });

  refreshMonthlyCost();
}

function delEmployee(){
  let delEl = event.target;

  

  $(delEl).parent().parent().remove();
  refreshMonthlyCost();
}

function refreshMonthlyCost(){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  let monthlyCost = 0;
  for (let i = 0; i < arrEmployee.length; i++) {
    let monthlySalary = parseFloat(arrEmployee[i].salary / 12);
    monthlyCost += monthlySalary;
    $('#monthly').text(formatter.format(monthlyCost));
  }
}