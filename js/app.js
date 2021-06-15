const buttonEl = document.querySelector('#send_val');
const initButtonEl = document.querySelector('#init_b');
const giveupButtonEl = document.querySelector('#give_up');
const inputEl = document.querySelector('#input_val');
const listEl = document.querySelector('#resultField');
var g_targetNumber = setTargetNumber();

class resultHolder {
    constructor() {
        this.answer = 0;
        this.input = 0;
        this.hit = 0;
        this.foul = 0;
        this.out = 0;
    }
}   

function sendNumber(){
    const enteredVal =  inputEl.value;
    const listItemEl = document.createElement('li');
    let resultComparison = new resultHolder(g_targetNumber,enteredVal);
    resultComparison = compareValue(g_targetNumber,enteredVal);

    let outputMessage;
    outputMessage =enteredVal + " : " + resultComparison.hit + " hit!!! " + resultComparison.foul + " foul! " + resultComparison.out + " out"
    if (resultComparison.hit == 3) {
        alert("Congrats!!! Game Clear!!!")
    }
    listItemEl.textContent = outputMessage;
    listEl.appendChild(listItemEl);
    inputEl.value ='';

}

function getDigit(num, digit){
    return Math.floor(num/(10**(digit-1)))%10;
}

function compareValue(val1, val2) {
    // Raw value of val1 is acceptable cuz had been generated in this source, however, val2 is user input.
    // Plz check and authorize val2 with exception handling.
    res = new resultHolder();

    // this max digit should be var. In this case, for example, this program cannot tell the difference between '123' and '0123'.
    // '0123' supposed to be 4 digits but assumed it to be 3 digits while variable passed in number.
    // It has to be modified in the future fix.
    val1 = Number(val1);
    val2 = Number(val2);

    const maxdigit = 3
    targetNumberArray = new Array(maxdigit);
    inputNumberArray = new Array(maxdigit);

    for(let i=0; i<maxdigit; i++) {
        targetNumberArray[i] = getDigit(val1, i+1);
        inputNumberArray[i] = getDigit(val2, i+1);        
    }

    for(let i=0; i<maxdigit; i++) {
        for(let j=0; j<maxdigit; j++) {
            if(i==j && targetNumberArray[i] == inputNumberArray[j]){
                res.hit++;
            }
            if(i!=j && targetNumberArray[i] == inputNumberArray[j]){
                res.foul++;
            }
        }
    } 
    res.out = maxdigit - (res.hit + res.foul)
    return res;
}

function setTargetNumber(){
    var src =[0,0,0];
    const max_array_size = src.length;
    var this_array_size = 0;
    listEl.innerHTML = '';
    do {
        //fbreak;
        for (let i=0; i < src.length; i++) {
            src[i] = Math.floor(Math.random()*10);
        }
        let test_array = new Set(src)
        this_array_size = test_array.size
    } while(max_array_size != this_array_size);
    var ans = 0;
    src = src.reverse()
    for (let i =0; i < src.length; i++){
        ans += src[i]*10**i;
    }
    g_targetNumber = ans;
    return ans;
}

inputEl.addEventListener('keypress',function(e){
    if (e.key == 'Enter') {
        sendNumber();
    }
});
buttonEl.addEventListener('click',sendNumber);
initButtonEl.addEventListener('click',setTargetNumber);
giveupButtonEl.addEventListener('click', function(){
    message = ("000" + g_targetNumber).slice(-3)
    alert(message)
    listEl.innerHTML = '';
})
