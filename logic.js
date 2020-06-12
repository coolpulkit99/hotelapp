function getHotelData() {
    console.log("data fetch req");

    fetch("http://fake-hotel-api.herokuapp.com/api/hotels?count=5")
        .then(response => response.json())
        .then(data => {
            clearElement();
            for (let i = 0; i < 5; i++) {
                let hotel = data[i];
                appendToElement(hotel);
            }
        })
        .catch(error => {
            appendErrorToElement();
        })
}
function clearElement() {
    document.getElementById("hoteldata").innerText = "";
}
function appendErrorToElement() {
    document.getElementById("hoteldata").innerText = "Error in fetching data";
}

function getReview(hotelId) {
    fetch("http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=" + hotelId)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].hotel_id);
            clearReviews(data[0].hotel_id);
            for (let i = 0; i < data.length; i++) {
                addReviewToElement(data[i]);
            }
        })
        .catch(error => {
            console.log("Review can't be fetched for" + hotelId);

        })
}
function addReviewToElement(reviewData) {
    let innHTML = "<div class='revname bg-warning'>Name: " + reviewData.name + "</div>";
    innHTML = innHTML + "<div class='revcomment text-warning'>Comment: " + reviewData.comment + "</div>";
    innHTML = "<div class='revbox'>" + innHTML + "</div>";
    document.getElementById(reviewData.hotel_id).innerHTML = document.getElementById(reviewData.hotel_id).innerHTML + innHTML;
}

function clearReviews(idval) {
    console.log(idval);
    document.getElementById(idval).innerText = "";
}



function appendToElement(hotelData) {

    let inHtml = "";
    inHtml = inHtml + "<div class='name'>Name: " + hotelData.name + "</div><br/>";
    let images=hotelData.images;
    let temp="";
    for(let i=0;i<images.length;i++)
    {
        temp = temp + "<li><img class='img-thumbnail' src='"+images[i]+"'/></li>";
    }
    inHtml = inHtml + "<ul  class='imgs list-unstyled '>Images" + temp + "</div>";
    inHtml = inHtml + "<div  class='city'>City: " + hotelData.city + "</div>";
    inHtml = inHtml + "<div  class='country'>Country: " + hotelData.country + "</div>";
    inHtml = inHtml + "<div  class='price'>Price: " + hotelData.price + "</div>";
    inHtml = inHtml + "<div  class='description lead'>Description: <p>" + hotelData.description + "</p></div>";
    inHtml = inHtml + "<button class='btn btn-primary' onclick=\"getReview('" + hotelData.id + "')\">" + "Show Review" + "</button>";
    inHtml = inHtml + "<div  class='review' id='" + hotelData.id + "'></div>";
    inHtml = "<li class='hotelbox'>" + inHtml + "</li><br/>";


    document.getElementById("hoteldata").innerHTML = document.getElementById("hoteldata").innerHTML + inHtml;
}