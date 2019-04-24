//List functions and global variables here

//const  business_status_pending = 0;
const business_status_pending = 1;
const business_status_approved = 0;
//const business_status_not_approved = 3;
const business_status_blacklisted = 2;

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
                              <div class="right"> <b>${ displayStatus(businesses[i].status)} </b></div>
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

ons.ready(function() {
  //activate application inside here, including all events...

  document.addEventListener("init", function(e) {
    if (e.target.id === "businessPage") {
      status_segment = document.querySelector("#business-status");
      status_segment.addEventListener("postchange", changeStatus);
      changeStatus({ index: 0 });
    }
    console.log(e);
  });
});
