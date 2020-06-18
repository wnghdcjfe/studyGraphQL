
let aa = [...document.getElementsByClassName('author')]
console.log(aa)

aa.forEach(element => {
    console.log(element.getAttribute("href"))
});