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
    status: business_status_init
  },
  {
    id: 34379,
    name: "ABS Company",
    status: business_status_init
  },
  {
    id: 34372,
    name: "VTDI Company",
    status: business_status_init
  },

  {
    id: 34371,
    name: "UTECH Company",
    status: business_status_init
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
});
