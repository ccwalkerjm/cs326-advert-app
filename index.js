//List functions and global variables here

//const  business_status_pending = 0;
const business_status_pending = 1;
const business_status_approved = 0;
//const business_status_not_approved = 3;
const business_status_blacklisted = 2;

const advert_status_pending = 1;
const advert_status_approved = 0;
const advert_status_blacklisted = 2;

const complain_status_comp = 0;
const complain_status_blacklisted = 1; 

let complainss = [
  {
    id: 65321,
    name:"Limited amount of Ads",
    complaint: "I think it would be a good idea to add more ads to the front page to give persons more options when they're broswering",
    status: complain_status_comp,
  },
  {
    id: 63321,
    name:"Too many Ads",
    complaint: "There are too many ads on the home page, it's making my service finish too fast! Unacceptable!",
    status: complain_status_blacklisted,
  },
      
    
];

let adverts = [
  {
    id: 75631,
    name: "Knotsford Court Hotel",
    img: "image/logo-ex-4.png",
    status: advert_status_approved
  },
  {
    id: 75431,
    name: "Hilton Hotel",
    img: "image/logo-ex-5.png",
    status: advert_status_approved
  },
  {
    id: 74631,
    name: "Spanish Court Hotel",
    img: "image/logo-ex-6.png",
    status: advert_status_approved
  },
  {
    id: 75131,
    name: "Holiday Inn Hotel",
    img: "image/logo-ex-7.png",
    status: advert_status_approved
  },
  {
    id: 75111,
    name: "SeaGarden Beach Resort",
    img: "image/logo-KPC.png",
    status: advert_status_approved
  },
  {
    id: 75031,
    name: "Great Huts Resort",
    img: "image/2357cd90cbd5291.jpg",
    status: advert_status_approved
  },
  {
    id: 75931,
    name: "Travellers Beach Resort",
    img: "image/vector_business_people_circle.png",
    status: advert_status_approved
  },
  {
    id: 76131,
    name: "S Hotel Jamaica",
    img: "image/vector_business_colourful_people_logo_inspiration.png",
    status: advert_status_pending
  },
  {
    id: 75121,
    name: "Hilton Rose Hall Resort & Spa",
    img: "image/logo-KPC.png",
    status: advert_status_pending
  },
  {
    id: 75161,
    name: "Grand Palladium Lady Hamilton Resort & Spa",
    img: "image/logo.png",
    status: advert_status_pending
  },
  {
    id: 75139,
    name: "Half Moon",
    img: "image/search-results-for-ldquodesigns-psd-rdquo-ndash-calendar-2015-12138.png",
    status: advert_status_blacklisted
  },
  {
    id: 75135,
    name: "Round Hill Hotel and Villas",
    img: "image/Business-logo-black.png",
    status: advert_status_blacklisted
  },

];

let  businesses = [
  {
    id: 34567,
    name: "T&T Company",
    status: business_status_pending
    
  },
  {
    id: 34378,
    name: "B&B Company",
    status: business_status_approved
  },
  {
    id: 34379,
    name: "ABS Company",
    status: business_status_pending
  },
  {
    id: 34372,
    name: "VTDI Company",
    status: business_status_approved
  },

  {
    id: 34371,
    name: "UTECH Company",
    status: business_status_pending
  },
  {
    id: 85521,
    name: "Jamdung City",
    status: business_status_pending
  },
  {
    id: 85522,
    name: "Little Pub",
    status: business_status_pending
  },
  {
    id: 85523,
    name: "Elephant Town",
    status: business_status_pending
  },
  {
    id: 85524,
    name: "Great Pond Primary",
    status: business_status_pending
  },
  {
    id: 48840,
    name: "Gyal Town Club",
    status: business_status_blacklisted
  },
  {
    id: 48841,
    name: "B&B UpTown",
    status: business_status_blacklisted
  },
  {
    id: 48842,
    name: "ABS Police Station",
    status: business_status_blacklisted
  },
  {
    id: 48843,
    name: "Get Rekt Gaming Lounge",
    status: business_status_blacklisted
  },

  {
    id: 48844,
    name: "Uwi Mona",
    status: business_status_blacklisted
  }
];

window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById("menu");
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById("content");
  var menu = document.getElementById("menu");
  content.load(page).then(menu.close.bind(menu));
};


function displayStatus(status){
  switch(status){
    case 0:  return "Accepted";
    case 1:  return "Pending";
    case 2 : return "Blocked";
  }
}




function changeStatus(e) {
  const index = e.index;
  const lstBusinesses = document.querySelector("#lstBusinesses");

  lstBusinesses.innerHTML = "";

  for (let i = 0; i <  businesses.length; i++) {
    const x_business =  businesses[i];

    if (index === x_business.status) {
      lstBusinesses.appendChild(
        ons.createElement(`<ons-list-item tappable onclick="alert(event)">
                              <div class="left"> ${businesses[i].name} </div>  
                             
                            </ons-list-item>`)
      )
    }
  }
}
//<div class="right"> <b>${ displayStatus(businesses[i].status)} </b></div>

function changeStat(e){
  const index = e.index;
  const lstAdverts = document.querySelector("#lstAdverts");

  lstAdverts.innerHTML = "";
  
  for (let i = 0; adverts.length; i++){
    const x_advert = adverts[i];

    if (index === x_advert.status){
      lstAdverts.appendChild(
        ons.createElement(`<ons-list-item tappable onclick="alert(event)">
                              <div class="left"> <img class="list-item__thumbnail" src="${adverts[i].img}"> </div>
                              <div class="center">  
                                <span class="list-item_title">${adverts[i].name}</span>  
                              </div>
                             
                           </ons-list-item>`)
      )
    }

  }
}
 /* <div class="right">
                                <span class="list-item_subtitle"> <b> ${displayStatus(adverts[i].status)} </b></span>
                              </div> */
function changeST(e) {
  const index = e.index;
  const lstcomplainss = document.querySelector("#lstcomplainss");

  lstcomplainss.innerHTML = "";

  for (let i = 0; i <  complainss.length; i++) {
    const x_complains =  complainss[i];

    if (index === x_complains.status) {
      lstcomplainss.appendChild(
        ons.createElement(`<ons-list-item expandable>
        <span class="list-item_title">${complainss[i].name}</span>
        <div class="expandable-content"> <b>${complainss[i].complaint}</b>
        /div>
      </ons-list-item>`)
      )
    }
  }
}







let status_segment;

// Types Section
function AddBusiness() {
  document.getElementById("overlay").style.display = "block";
}

function Submit() {
  document.getElementById("overlay").style.display = "none";
}

function SearchBar(){
  document.getElementById("icons").style.display = "none";
  document.getElementById("name").style.display = "none";
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("expand").style.width = "100%";
  document.getElementById("searchBar").style.display = "block";
  
 
}

ons.ready(function() {
  //activate application inside here, including all events...

  document.addEventListener("init", function(e) {
    if (e.target.id === "businessPage") {
      status_segment = document.querySelector("#business-status");
      status_segment.addEventListener("postchange", changeStatus);
      changeStatus({ index: 0 });
    } 
    
    else if(e.target.id === "businessAdverts"){
        status_segment = document.querySelector("#business-status");
        status_segment.addEventListener("postchange",changeStat);
        changeStat({index: 0});
    } 
    else if(e.target.id === "businesscomplains"){
      status_segment = document.querySelector("#complaints-status");
      status_segment.addEventListener("postchange",changeST);
      changeST({index: 0});
     } 
    console.log(e);
  });
});
