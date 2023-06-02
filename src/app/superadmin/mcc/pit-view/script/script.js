setTimeout(function(){ 
var myModalEl = document.getElementById('pitenzymeModal')
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
        document.getElementById("myForm").reset();
})
 }, 100);