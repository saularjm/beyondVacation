$(document).ready(()=>{function a(a,b,d,e){$.post("/api/posts/filtered",{location:a,price:b,size_of_party:d,facility:e}).then(a=>{for(j.empty(),i=0;i<a.length;i++)c(a[i])})}function b(){j.empty();const a=$("<h5>");a.css({"margin-top":"25px"}),a.html("No listings found, navigate <a href='/'>here</a> to visit homepage"),j.append(a)}function c(a){const b=$("<div>");b.addClass("col");const c=a.location;let d="RV"===c?"../images/AdobeStock_rv.jpeg":"Campsites"===c?"../images/AdobeStock_default.jpeg":"Farmland"===c?"../images/AdobeStock_farmland.jpeg":"Waterfront"===c?"../images/AdobeStock_waterfront.jpeg":"Backyard"===c?"../images/AdobeStock_backyard.jpeg":"../images/AdobeStock_campsite.jpeg";b.html(`<div class="card" style="width: 18rem;">
                <img class="card-img-top" src=${d} alt="Card image cap">
                <div class="card-body">
                    <h5>${a.property_name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><h6>Property type: ${a.location}</h6>
                  </li>
                  <li class="list-group-item"><h6>Address:</h6>
                  <p>${a.address}, ${a.city}, ${a.state}</p></li>
                  <li class="list-group-item"><h6>$${a.price}/ Per day</h6>
                  </li>
                  <li class="list-group-item"><h6>Maximum ${a.size_of_party} people per day</h6>
                  </li>
                  <li class="list-group-item"><h6>Bathrooms available: ${a.facility}</h6>
                  </li>
                  <li class="list-group-item"><h6>Currently reserved: ${a.reserved}</h6>
                  </li>
                </ul>
                <div class="card-body">
                <button type="button" data-id='${a.id}' class="btn btn-outline-success reserve">Reserve this location</button>
                </div>
              </div>`),j.append(b)}const d=$("#reserve-button"),e=$("#list-selections"),f=$("#inputPrice"),g=$("#inputPartySize"),h=$("#facility");d.on("click",b=>{b.preventDefault();const c={rental:e.val(),price:f.val(),party:g.val(),facility:h.val()};a(c.rental,c.price,c.party,c.facility),e.val(""),f.val(""),g.val(""),h.val("")});const j=$("#browse-rentals");let k;$(document).on("click","button.reserve",function(){console.log("test");const a=$(this).attr("data-id");console.log(a);const b={};b.id=a,$.get("/api/user_data").then(a=>{$.ajax({url:"/api/posts/"+a.id,type:"PUT",data:b}).then(()=>{console.log("success"),window.location.replace("/members")}),console.log("Rental Reserved")})}),$.get("/api/posts").then(a=>{if(console.log("rentals",a),k=a,console.log("listingData:",k),!k||!k.length)b();else for(i=0;i<k.length;i++)c(k[i])})});