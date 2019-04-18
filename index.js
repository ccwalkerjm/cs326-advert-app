//List functions and global variables here

const business_status_init = 0;
const business_status_pending = 1;
const business_status_approved = 2;
const business_status_not_approved = 3;
const business_status_blacklisted = 4;

let bueinesses = [
  {
    id: 34567,
    name: "T&T Company",
    status: business_status_init
  },
  {
    id: 34378,
    name: "B&B Company",
    status: business_status_approved
  },
  {
    id: 34379,
    name: "ABS Company",
    status: business_status_init
  },
  {
    id: 34372,
    name: "VTDI Company",
    status: business_status_approved
  },

  {
    id: 34371,
    name: "UTECH Company",
    status: business_status_init
  }
];

let peending = [
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
];

let bloocked = [
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

ons.ready(function() {
  //activate application inside here, including all events...

  document.addEventListener("init", function(e) {
    if (e.target.id === "businessPage") {
      const lstBusinesses = document.querySelector("#lstBusinesses");

      lstBusinesses.innerHTML = "";

      for (let i = 0; i < bueinesses.length; i++) {
        const item = document.createElement("ons-list-item");
        item.innerHTML =
          bueinesses[i].name  + bueinesses[i].status.toString();
        lstBusinesses.appendChild(item);
      }
    }
    console.log(e);
  });

  document.addEventListener("init", function(e) {
    if (e.target.id === "businessPage") {
      const lstPending = document.querySelector("#lstPending");

      lstPending.innerHTML = "";

      for (let i = 0; i < peending.length; i++) {
        const item = document.createElement("ons-list-item");
        item.innerHTML =
         peending[i].name  + peending[i].status.toString();
        lstPending.appendChild(item);
      }
    }
    console.log(e);
  });

  document.addEventListener("init", function(e) {
    if (e.target.id === "businessPage") {
      const lstBlocked = document.querySelector("#lstBlocked");

      lstBlocked.innerHTML = "";

      for (let i = 0; i < bloocked.length; i++) {
        const item = document.createElement("ons-list-item");
        item.innerHTML =
         bloocked[i].name  + bloocked[i].status.toString();
        lstBlocked.appendChild(item);
      }
    }
    console.log(e);
  });

});

function changeTab() {
  document.getElementById('tabbar').setActiveTab(1);
}

document.getElementById('tabbar__button').addEventListener('click', function () {
  toggle(document.querySelectorAll('.target'));
});

function toggle (elements, specifiedDisplay) {
var element, index;

elements = elements.length ? elements : [elements];
for (index = 0; index < elements.length; index++) {
  element = elements[index];

  if (isElementHidden(element)) {
    element.style.display = '';

    // If the element is still hidden after removing the inline display
    if (isElementHidden(element)) {
      element.style.display = specifiedDisplay || 'block';
    }
  } else {
    element.style.display = 'none';
  }
}
function isElementHidden (element) {
  return window.getComputedStyle(element, null).getPropertyValue('display') === 'none';
}
}