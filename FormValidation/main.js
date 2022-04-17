const names = ['Anh', 'Huy', 'Son', 'Nhi', 'Tuan', 'My', 'Nhat'];
const ages = [25,18,30,35,20,17,40];
const genders = ['male', 'female', 'other'];
const heights = [1.7,1.8,1.65,1.63,1.9,1.75];
const weights = [60,70,55,75,80,90,95];
const address = ['02 LTV','56 HD','135 DS8',' 28B DS5'];
let COlUMNS = ['fullname', 'age', 'Email', 'gender', 'BMI', 'health status', 'action'];
let COlUMNS2 = ['fullname', 'age', 'Email', 'gender', 'Height', 'Weight', 'Address'];

// covert to uppercase for all headers  
COlUMNS = COlUMNS.map((columnName) => columnName.toUpperCase());

// COLUMNS = COLUMNS.map((columnName) => {
//     return COlUMNS.toUpperCase();
// });

// random function
function rd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

// Create Propotype
const Person = function (fullName, age, email, gender, height, weight, address) {
    this.fullName = fullName,
    this.age =age,
    this.email = email,
    this.gender = gender,
    this.height = height,
    this.weight = weight,
    this.address = address


// METHOD
// calculate BMI
this.calculateBMI = function () {
    const BMI = weight / Math.pow(height, 2);
    return BMI;
}

// guessHealth
this.guessHealth = function() {
    const BMIValue = this.calculateBMI();
    if(BMIValue < 18.5) {
        return 'underweight'
    }
    if(BMIValue >= 18.5 && BMIValue <= 24.9) {
        return 'normalweight'
    }
    if(BMIValue >= 25 && BMIValue <= 29.9) {
        return 'overweight'
    }
    return 'obesity'
}
};
function generatePerson() {

    const arrPersons= [];
    for (let count = 0; count <= 10; count++) {
        //create person
        const person = new Person(
            names[rd(0, names.length - 1)],
            ages[rd(0, ages.length - 1)],
            'email@gmail.com',
            genders[rd(0, genders.length - 1)],
            heights[rd(0, heights.length - 1)],
            weights[rd(0, weights.length - 1)],
            address[rd(0, address.length - 1)],
        );
    
        person.BMI = person.calculateBMI();
        person.healthStatus = person.guessHealth();
    
        arrPersons.push(person);
    }
    return arrPersons;
}

//excute
const persons = generatePerson();

//////////////////////////////// CREATE TABLE //////////////////////////////////

/**
 * create table headers
 * @param {array} columns list of columns 
 * @returns {Object} part of table store columns data
 */

const createTableHeaders = (columns) => {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    columns.forEach(columnName => {
        const th = document.createElement('th');
        th.innerText = columnName;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    return thead;
};
/**
 * create table of content
 * @param {array} persons list of person obj 
 * @return {object} table body content
 */
const createTableContent = (persons) => {
    const tbody = document.createElement('tbody');
    persons.forEach((personObj) => {
        const tr = document.createElement('tr');

        //  create each td for each propeties
        const tdFullname = document.createElement('td');
        tdFullname.innerText = personObj.fullName;

        const tdAge = document.createElement('td');
        tdAge.innerText = personObj.age;

        const tdEmail = document.createElement('td');
        tdEmail.innerText = personObj.email;

        const tdGender = document.createElement('td');
        tdGender.innerText = personObj.gender;

        const tdBMI = document.createElement('td');
        tdBMI.innerText = personObj.BMI;

        const tdHealthStatus = document.createElement('td');
        tdHealthStatus.innerText = personObj.healthStatus;

        const tdAction = document.createElement('td');
       
        tdAction.innerHTML = `
        <button type="button"  onclick="clickEditBtn()" >Edit</button> &nbsp
        <button type="button" onclick="clickDeleteBtn()" id="deleteBtn">Delete</button>

        `

        //binding into tr element

        tr.append(
            tdFullname,
             tdAge,
             tdEmail,
             tdGender,
             tdBMI,
             tdHealthStatus,
             tdAction
         );

         //binding into tbody element
         tbody.appendChild(tr);

    });
    return tbody;
};
//////////////////////////////// CREATE TABLE END //////////////////////////////////


//////////////////// click DELETE////////////////////////////////
function clickDeleteBtn() {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal--show');

        const x = event.target.parentElement;
        const y = x.parentElement;

        document.getElementById('yesBtn').addEventListener('click', clickYes)
            function clickYes() {
                y.remove();
                const modal = document.querySelector('.modal');
                modal.classList.remove('modal--show');
            }

       document.getElementById('noBtn').addEventListener('click', clickNo )
            function clickNo() {
                const modal = document.querySelector('.modal');
                modal.classList.remove('modal--show');
            }
}
//////////////////// click DELETE END ////////////////////////////////

/////////////////// CLICK EDIT///////////////////////////////////
function clickEditBtn() {
    const modal = document.querySelector('.modal2');
    modal.classList.add('modal--show');

    const x = event.target.parentElement;
    const y = x.parentElement;
    const tds = y.childNodes;

    let fullnameEdit = document.getElementById('fullnameEdit');
    let ageEdit = document.getElementById('ageEdit');
    let emailEdit = document.getElementById('emailEdit');
    let genderEdit = document.getElementById('genderEdit');
    let BMIEdit = document.getElementById('BMIEdit');
    let healstatusEdit = document.getElementById('healstatusEdit');

        fullnameEdit.value = tds[0].textContent;
        ageEdit.value = tds[1].textContent;
        emailEdit.value = tds[2].textContent;
        genderEdit.value = tds[3].textContent;
        BMIEdit.value = tds[4].textContent;
        healstatusEdit.value = tds[5].textContent;

    document.getElementById('saveBtn').addEventListener('click', clickSave)
    function clickSave() {
        const modal2 = document.querySelector('.modal2');
        modal2.classList.remove('modal--show');

        tds[0].innerText = fullnameEdit.value;
        tds[1].innerText = ageEdit.value;
        tds[2].innerText = emailEdit.value;
        tds[3].innerText = genderEdit.value;
        tds[4].innerText = BMIEdit.value;
        tds[5].innerText = healstatusEdit.value;

    }

    document.getElementById('closeBtn').addEventListener('click', clickClose)
    function clickClose() {
        const modal2 = document.querySelector('.modal2');
        modal2.classList.remove('modal--show');

    }

}
/////////////////// CLICK EDIT END///////////////////////////////////

/////////////////// CLICK SEARCH///////////////////////////////////

function clickSearchBtn() {
    
    const searchInput = document.getElementById('searchInput');
    const searchOption = document.getElementById('searchOption');
    const filter = searchInput.value.toUpperCase();
    table = document.getElementsByTagName('table');
    tr = document.getElementsByTagName('tr');

    for (let i = 0 ; i < tr.length ; i++) {

        if (searchOption.value === 'Fullname') {
            td = tr[i].getElementsByTagName('td')[0];
        }
        if (searchOption.value === "Email") {
             td = tr[i].getElementsByTagName('td')[2];
         }
         if (searchOption.value === "BMI") {
             td = tr[i].getElementsByTagName('td')[4];
         }
        if (td) {
            tdText = td.textContent || td.innerText;
            if(tdText.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
/////////////////// CLICK SEARCH END///////////////////////////////////

/**
 * this function create table of data
 * @param {array} columns list of columns 
 * @param {array} persons list of person obj 
 */

const createTable = (columns, persons) => {
    const table = document.createElement('table');
    const body = document.querySelector('body');

    const thead = createTableHeaders(columns);
    const tbody = createTableContent(persons);

    // bind thead tbody into table
    table.append(thead, tbody);

    // binding class "table table-strip" for css styling
    table.classList.add('table','table-striped');

    // bind table into body
    body.appendChild(table);

};

createTable(COlUMNS, persons);

////////////////CLICK ADD BTN FORM///////////////////////////
function clickAddTableBtn() {
    isFullName = false;
    isAge = false;
    isEmail = false;
    isHeight = false;
    isWeight = false;
    isAddress = false;

    const fullNameInputValue = document.getElementById('fullNameInput').value;
    const emailInputValue = document.getElementById('emailInput').value;
    const ageInputValue = document.getElementById('ageInput').value;
    const genderInputValue = document.getElementById('genderInput').value;
    const heightInputValue = document.getElementById('heightInput').value;
    const weightInputValue = document.getElementById('weightInput').value;
    const addressInputValue = document.getElementById('addressInput').value;

    const fullname = validateFullName(fullNameInputValue);
    const age = validateAge(ageInputValue);
    const email = validateEmail(emailInputValue);
    const height = validateHeight(heightInputValue);
    const weight = validateWeight(weightInputValue);
    const address = validateAddress(addressInputValue);
    const gender = genderInputValue;

    if (
        isFullName &
        isAge &
        isEmail &
        isAddress &    
        isHeight &
        isWeight
    ) {
        const personObj = {
            fullname: fullname,
            age: age,
            email: email,
            height: height,
            weight: weight,
            address: address,
            gender: gender
        }

        const table = document.createElement('table');

        const tbody = createTableBody(personObj);
        table.appendChild(tbody);

     
            const theader = createTableHeaders2();
            table.appendChild(theader);
        
        const body = document.querySelector('body');
        body.appendChild(table);

        
        table.classList.add('table','table-striped');
      }
}

function createTableBody(personObj) {
    const tdFullname = document.createElement('td');
    tdFullname.innerText = personObj.fullname;
    const tdAge = document.createElement('td');
    tdAge.innerText = personObj.age;
    const tdEmail = document.createElement('td');
    tdEmail.innerText = personObj.email;
    const tdAddress = document.createElement('td');
    tdAddress.innerText =personObj.address;
    const tdHeight = document.createElement('td');
    tdHeight.innerText = personObj.height;
    const tdWeight = document.createElement('td');
    tdWeight.innerText = personObj.weight;
    const tdGender = document.createElement('td');
    tdGender.innerText = personObj.gender;
    const tdAction = document.createElement('td');
    tdAction.innerHTML = `
    <button type="button" onclick="clickDeleteBtn()" id="deleteBtn">Delete</button>
    
    `

    const tr = document.createElement('tr');
    tr.append(tdFullname, tdAge, tdEmail, tdAddress, tdHeight, tdWeight, tdGender, tdAction);
    const tbody = document.createElement('tbody');
    tbody.appendChild(tr);
    return tbody;  

}

function createTableHeaders2(COlUMNS2) {
    const thFullname = document.createElement('th');
    thFullname.innerText = 'Fullname';
    const thAge = document.createElement('th');
    thAge.innerText = 'Age';
    const thEmail = document.createElement('th');
    thEmail.innerText = 'Email';
    const thAddress = document.createElement('th');
    thAddress.innerText = 'Address';
    const thHeight = document.createElement('th');
    thHeight.innerText = 'Height';
    const thWeight = document.createElement('th');
    thWeight.innerText = 'Weight';
    const thGender = document.createElement('th');
    thGender.innerText = 'Gender';
    const thAction = document.createElement('th');
    thAction.innerText = 'Action';

    const thead = document.createElement('thead');
    thead.append(
        thFullname,
        thAge,
        thEmail,
        thAddress,
        thHeight,
        thWeight,
        thGender,
        thAction
        )
        return thead;
}

 function validateFullName(fullNameInputValue) {
     const maxLenghth = 50;
     if (fullNameInputValue.length > maxLenghth || !fullNameInputValue) {
         const fullNameError = document.getElementById('fullNameError');
         fullNameError.innerText = 'Invalid fullname'

     } else {
         isFullName = true;
         return fullNameInputValue;
     }

}

function   validateEmail(emailInputValue) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailInputValue.match(re)) {
        const emailError = document.getElementById('emailError');
        emailError.innerText = 'Invalid email'
    } else {
        isEmail = true;
        return emailInputValue;

    }
}


function validateAge(ageInputValue) {
    if(!ageInputValue) {
        const ageError = document.getElementById('ageError');
        ageError.innerText = 'Invalid age';
    } else {
        isAge = true;
        return ageInputValue;
        
    }
};

function validateHeight(heightInputValue) {
    const re = /[012]{1}.[0-9]{2}/g
    if(!heightInputValue.match(re)) {
        const heightError = document.getElementById("heightError");
        heightError.innerText = 'Invalid height';
        
    } else {
        isHeight = true;
        return heightInputValue;
    }
}

function validateWeight(weightInputValue) {
    const re = /[1-9]{1}[0-9]{1}.[0-9]{1}/g
    if(!weightInputValue.match(re)) {
        const weightError = document.getElementById('weightError');
        weightError.innerText = 'Invalid weight';
    } else {
        isWeight = true;
        return weightInputValue;
    }

}

function validateAddress(addressInputValue) {
    const maxLenghth = 50;
    if (addressInputValue > maxLenghth || !addressInputValue) {
        const addressError = document.getElementById('addressError');
        addressError.innerText = 'Invalid address';
    } else {
        isAddress = true;
        return addressInputValue;
    }
};
////////////////CLICK ADD BTN FORM END///////////////////////////
