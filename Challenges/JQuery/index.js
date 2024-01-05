$("button").click(function(){
    $("h1").css("color", "yellow");
})

$("input").keydown(function(event){
    console.log(event.key);
})

$(document).keydown(function(event) {
    $("h1").text(event.key);
})