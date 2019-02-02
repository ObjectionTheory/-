var countDownDate = new Date("Feb 2, 2019 12:00:00").getTime();

var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Display the result in the element with id="demo"
    $("#time").html(distance);
    $("#time").lettering();

    for (var i = 1; i <= 9; i++) {
        $(".char" + i).css('border', '3px solid white');
        $(".char" + i).css('padding', "1%"); 
        $(".char" + i).css("margin", "2%");
    }
    // If the count down is finished, write some text 
    if (distance < 0) {
    clearInterval(x);
    $("#time").html("distance");
    }
}, 150); 
