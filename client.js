$(ready);

function ready(){
  console.log('js and jq ready!');
  $('#submit').on('click', function () {
    addEmployee();
  });
}

function addEmployee(){
  let first = $('#first').val();
  let last = $('#last').val();
  let id = $('#id').val();
  let title = $('#title').val();
  let salary = $('#salary').val();

  let elTr = $('<tr></tr>');
  let elFirst = $(`<td>${first}</td>`);
  let elLast = $(`<td>${last}</td>`);
  let elId = $(`<td>${id}</td>`);
  let elTitle = $(`<td>${title}</td>`);
  let elSalary = $(`<td>${salary}</td>`);

  $('tbody').append(elTr);
  $('tbody tr:last-child').append(elFirst);
  $('tbody tr:last-child').append(elLast);
  $('tbody tr:last-child').append(elId);
  $('tbody tr:last-child').append(elTitle);
  $('tbody tr:last-child').append(elSalary);

  $('#first').val('');
  $('#last').val('');
  $('#id').val('');
  $('#title').val('');
  $('#salary').val('');
}