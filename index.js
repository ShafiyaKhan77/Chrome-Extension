// converstion array into string
// let myLeads = ["www.awesomelead.com"]
// myLeads = JSON.stringify(myLeads)
// console.log(typeof myLeads) 
// converstion string into array
// let myLeads = `["www.awesomelead.com"]`
// myLeads = JSON.parse(myLeads)
// myLeads.push("www.epiclead.com")
let myLead = [];
const input = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const tabBtn = document.getElementById("tab-btn")
if (leadFromLocalStorage) {
   myLead = leadFromLocalStorage
   render(myLead)
}
//saving the url of current tab in string format in local storage when user click on button
tabBtn.addEventListener('click', () => {
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      myLead.push(tabs[0].url)
      localStorage.setItem("myLead", JSON.stringify(myLead))
      render(myLead)
   })
})
function render(lead) {
   let listItem = ""
   for (let i = 0; i < lead.length; i++) {
      // listItem+="<li><a target='_blank' href='"+myLead[i]+"'>"+myLead[i]+"</a></li>"
      // for simplicity i'm gonna use string template
      listItem += `<li>
                     <a target='_blank' href='${lead[i]}'>
                        ${lead[i]}</a>
                 </li>`
   }
   ulEl.innerHTML = listItem
}
deleteBtn.addEventListener("dblclick", function () {
   localStorage.clear()
   myLead = []
   render(myLead)
})
inputBtn.addEventListener("click", function () {
   myLead.push(input.value);
   console.log(input.value)
   input.value = ""
   //saving myLead to local storage in string formate
   localStorage.setItem("myLead", JSON.stringify(myLead))
   render(myLead)
})
