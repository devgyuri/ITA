const $subject = document.querySelector('.subject');
const $currLen = document.querySelector('.currLen');
const $fileInput = document.querySelector('.filecustom');
const $fileName = document.querySelector('.filename');
const $delFile = document.querySelector('.del-file');
const $submit = document.querySelector('#submit');
const $fee = document.getElementsByName('fee');
const $region = document.querySelector('#region');
const $position = document.getElementsByName('position');
const $tableBox = document.querySelector('.table-responsive');
const $tbody = document.querySelector('tbody');


// byte counter
$subject.addEventListener('input', () => {
  let maxByte = 200;
  let currByte = byteCounter($subject.value);
  let str = $subject.value;

  if(currByte > maxByte) {
    alert("최대 " + maxByte + "byte를 초과할 수 없습니다.")
    $subject.value = str.substr(0, str.length - 1);
  } else {
    $currLen.innerHTML = `${byteCounter($subject.value)}`;
  }
});

const byteCounter = function(text) {
  let byte = 0;
  for(let i=0; i<text.length; i++) {
    if (/[\sa-zA-Z0-9`~!@#$%^&*()_+-={}\[\];':",./<>?]/.test(text[i])) {
        byte++;
    } else {
        byte += 2;
    }
  }
  return byte;
};


// file attatch
$fileInput.onchange = () => {
  const selectedFile = $fileInput.files[0];
  $fileName.innerHTML = selectedFile.name;

  let newIcon = document.createElement('a');
  newIcon.setAttribute('class', 'ico-trash');
  newIcon.setAttribute('id', 'file-del')
  $delFile.appendChild(newIcon);
};

const fileInit = () => {
  $fileName.innerHTML = '파일첨부';
  $fileInput.value = '';
  $delFile.innerHTML = '';
}

$delFile.addEventListener('click', fileInit);


// required element check
const checkContent = function () {
  if($subject.value == '') {
    $subject.focus();
    alert("주제를 입력해 주세요.");
    return;
  }

  let feeType = null;
  for(let i=0; i<$fee.length; i++) {
    if($fee[i].checked == true) {
      feeType = $fee[i].value;
      break;
    }
  }
  if(feeType == null) {
    alert("참가비를 선택해 주세요.");
    return;
  }

  if($region.value == '') {
    alert("지역을 선택해 주세요.");
    return;
  }

  let posType = null;
  for(let i=0; i<$position.length; i++) {
    if($position[i].checked == true) {
      if(posType == null) {
        posType = $position[i].value;
      } else {
        posType += ', ' + $position[i].value;
      }
    }
  }
  if(posType == null) {
    alert("직책을 선택해 주세요.");
    return;
  }

  addRow(feeType, posType);
  clearInput();
};

const clearInput = function () {
  $subject.value = '';
  $currLen.innerHTML = 0;
  for(let i=0; i<$fee.length; i++) {
    if($fee[i].checked == true) {
      $fee[i].checked = false;
      break;
    }
  }
  $region.value = '';
  for(let i=0; i<$position.length; i++) {
    if($position[i].checked == true) {
      $position[i].checked = false;
    }
  }
  fileInit();
}


// add table row
const addRow = function (feeType, posType) {
  if($tableBox.id == 'hide') {
    $tableBox.setAttribute('id', 'show');
  }
  let row = $tbody.insertRow($tbody.rows.length);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4);
  let cell5 = row.insertCell(5);
  cell0.innerHTML = $subject.value;
  cell0.setAttribute('class', 'title');
  cell1.innerHTML = posType;
  cell2.innerHTML = $region.value;
  cell3.innerHTML = feeType;
  if($fileInput.value != '') {
    cell4.innerHTML = '<a class="ico-down" href="#"></a>';
  }
  cell5.innerHTML = '<a class="ico-trash" onclick="delRow(this);" href="#"></a>';
};

$submit.addEventListener('click', checkContent);


// delete table row
const delRow = (e) => {
  $tbody.deleteRow(e.parentNode.parentNode.rowIndex-1);

  if($tbody.rows.length === 0) {
    $tableBox.setAttribute('id', 'hide');
  }
};