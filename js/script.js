const balance=document.querySelector("#balance")

const inc_amt=document.querySelector("#inc-amt")
const exp_amt=document.querySelector("#exp-amt")

const description=document.querySelector("#desc")
const amount=document.querySelector("#amt")

const form=document.querySelector("#form")

const trans=document.querySelector("#trans")

/* const dummyDate=[
{id:1,decription:"Flower",amount:-20},
{id:2,decription:"Salary",amount:35000},
{id:3,decription:"Juice",amount:-10},
{id:4,decription:"Petrol",amount:-120},
{id:5,decription:"Dress",amount:-420},
];

let transactions=dummyDate; */

const localstoragetrans=JSON.parse(localStorage.getItem("trans"));

let transactions=localStorage.getItem("trans")!==null?localstoragetrans:[];


function loadTransactionDetails(transaction){
    const sign=transaction.amount<0?"-":"+";
    const item=document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    trans.appendChild(item)
    item.innerHTML=`${transaction.description}<span>${sign} ${(Math.abs(transaction.amount))}</span> 
    <button class="btn-del" onclick="removetrans(${transaction.id})">x</button>`;
}

window.addEventListener("load",function(){
    config()
})

function removetrans(id){
    if(confirm("are you sure to delete transaction?")){
     transactions=transactions.filter((transaction=> transaction.id!=id));
     config()
     updatelocalstorage()
    }else{
        return;
    }
}
function updateamount(){
   const amounts=transactions.map((transaction)=>transaction.amount);
   console.log(amounts);

   const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
   balance.innerHTML=`₹ ${total}`;

   const income=amounts.filter((item)=>item>0).reduce((acc,item)=>(acc += item),0).toFixed(2);
   inc_amt.innerHTML=`₹ ${income}`;

   const expence=amounts.filter((item)=>item<0).reduce((acc,item)=>(acc += item),0).toFixed(2);
   exp_amt.innerHTML=`₹ ${expence}`;

}

form.addEventListener('submit',addtransaction);

function addtransaction(e){
    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()==""){
        alert("Please Enter Description and Amount")
    }else{
        const transaction={
            id:uniqueid(),
            description:description.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value="";
        amount.value="";
        updateamount();
        updatelocalstorage();
    }
}

function config(){
    trans.innerHTML="";
    transactions.forEach(loadTransactionDetails)
    updateamount();
}


function updatelocalstorage(){
 localStorage.setItem("trans",JSON.stringify(transactions));
}

function uniqueid(){
    return Math.floor(Math.random()*10000000)
}