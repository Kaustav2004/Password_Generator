// fetching elements
const copy=document.querySelector(".copy_svg");
const password=document.querySelector(".password");
const slider=document.querySelector(".input");
const length=document.querySelector(".pass_length");
const num=document.querySelector("#num");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const symbol=document.querySelector("#symbol");
const button=document.querySelector(".button");
const strenght_col=document.querySelector(".strength_color");
const span=document.querySelector(".span");

// length update
let length1=length.innerHTML;
function lengthupdate(){
    length1=length.innerHTML
    let len=slider.value;
    length.innerHTML=len;
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize=((len-min)*100/(max-min))+"% 100%";
}
slider.addEventListener("change",lengthupdate);

// get random numbers ,alphabets and symbols
function getRandomNum(){
    let ans=Math.floor((Math.random()*9));
    return ans;
}
var upperCase="QWERTYUIOPLKJHGFDSAZXCVBNM";
var lowerCase="mnbvcxzlkjhgfdsapoiuytrewq";
var symbols="!@#$%^*()_+-={}[]\|:?/";

function getRandomUpperCase(){
    return upperCase[Math.floor((Math.random()*upperCase.length))];
}

function getRandomLowerCase(){
    return lowerCase[Math.floor((Math.random()*lowerCase.length))];
}

function getRandomSymbols(){
    return symbols[Math.floor((Math.random()*symbols.length))];
}

// suffle password
async function passwordSuffle(password){
    // fisher yates method
    let pass="";
    for (let i = password.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1)); 
        const temp=password[i];
        password[i]=password[j];
        password[j]=temp;
    }
    password.forEach(element => {
        pass+=element;
    });
    return pass;
}

// color update
function strengthCol(functions){
    let parameter=0;
    parameter=functions.length;
    if(parameter<2||length.innerHTML<3){
        // set red
        strenght_col.style.cssText="background-color:red";
    }
    else if(parameter>=3&&length.innerHTML>4){
        // set green
        strenght_col.style.cssText="background-color:green";
    }
    else {
        // set yellow
        strenght_col.style.cssText="background-color:yellow";
    }
}

// copy password
copy.addEventListener("click",async()=>{
    const text=password.innerHTML;
    if(text=="PASSWORD") return;
        try {
            await navigator.clipboard.writeText(text).then(()=>{
                span.innerHTML="Copied";
                span.style.cssText="opacity:1";
                setTimeout(() => {
                    span.style.cssText="opacity:0";
                }, 1500);
            });
            
        } catch (error) {
            span.innerHTML="Failed to Copy";
            span.style.cssText="opacity:1";
            setTimeout(() => {
                span.style.cssText="opacity:0";
            }, 1500);
        }
});

// eventlistner on button
let lengthPassword=0;
let functions=[];
let passwordString="";
button.addEventListener("click",async()=>{
    functions=[];
    length1=length.innerHTML;
    passwordString="";
    lengthPassword=0;
    if(num.checked){
        lengthPassword++;
        functions.push("getRandomNum");
    }
    if(uppercase.checked){
        lengthPassword++;
        functions.push("getRandomUpperCase");
    }
    if(lowercase.checked){
        lengthPassword++;
        functions.push("getRandomLowerCase");
    }
    if(symbol.checked){
        lengthPassword++;
        functions.push("getRandomSymbols");
    }

    if(lengthPassword>length.innerHTML){
        length.innerHTML=lengthPassword;
    }
    if(lengthPassword==0) return;

    for (let i = 0; i < functions.length; i++) {
        const temp=functions[i];
        passwordString+=eval(`${temp}()`);
        length1--;
    }
    while(length1>0){
        const temp=functions[Math.floor(Math.random()*(functions.length))];
        passwordString+=eval(`${temp}()`);
        length1--;
    }
    passwordString=await passwordSuffle(Array.from(passwordString));
    password.innerHTML=passwordString;

    strengthCol(functions);
})
function main(){
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize=((10-min)*100/(max-min))+"% 100%";
}
main();