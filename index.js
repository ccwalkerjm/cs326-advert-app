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
    name: "Limited amount of Ads",
    complaint:
      "I think it would be a good idea to add more ads to the front page to give persons more options when they're broswering",
    status: complain_status_comp
  },
  {
    id: 63321,
    name: "Too many Ads",
    complaint:
      "There are too many ads on the home page, it's making my service finish too fast! Unacceptable!",
    status: complain_status_blacklisted
  }
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
    img:
      "image/search-results-for-ldquodesigns-psd-rdquo-ndash-calendar-2015-12138.png",
    status: advert_status_blacklisted
  },
  {
    id: 75135,
    name: "Round Hill Hotel and Villas",
    img: "image/Business-logo-black.png",
    status: advert_status_blacklisted

  },
  {
    id: 75631,
    name: "Art's Car Mart",
    img: "image/arts-car-mart.jpg",
    status: advert_status_approved
  },
  {
    id: 75631,
    name: "ATL Automotive Jamaica",
    img: "image/atl.png",
    status: advert_status_approved
  },
  {
    id: 75631,
    name: "Audi Jamaica",
    img: "image/audi.png",
    status: advert_status_approved
  },


];

let businesses = [
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

businesses.sort();

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

function displayStatus(status) {
  switch (status) {
    case 0:
      return "Accepted";
    case 1:
      return "Pending";
    case 2:
      return "Blocked";
  }
}

function dialog() {
  var dialog = document.getElementById("my-dialog");

  if (dialog) {
    dialog.show();
  } else {
    ons
      .createElement("changeStatus.html", { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
}
function hideDialog() {
  document.getElementById("my-dialog").show();
}

function displayProfile(ID, NAME, STATUS) {
  document.getElementById("my-dialog").innerHTML =
    "<div class='center'> <div id='card'> <h1>" +
    NAME +
    " </h1> <br> <p> <b>ID:</b> <span>" +
    ID +
    " </span> </p> <br> <p> <b> Status: </b> <span>" +
    STATUS +
    " </span> <br> <span class='center'> Change Status </span> </p> </div> </div>";
  dialog();
  // lstBusinessesCard

  /*     lstBusinessesCard.appendChild(
      ons.createElement(`
        
      
                 `)
      )*/
  //document.getElementById("card").style.width = "100%";
}

function ChangeStatusToPending(e) {
  /* var status = 
   business
   
   if(===){
 
   }
   */
}

function changeStatus(e) {
  const index = e.index;
  const lstBusinesses = document.querySelector("#lstBusinesses");

  lstBusinesses.innerHTML = "";

  for (let i = 0; i < businesses.length; i++) {
    const x_business = businesses[i];

    if (index === x_business.status) {
      lstBusinesses.appendChild(
        ons.createElement(`<ons-list-item tappable onclick="displayProfile('${
          businesses[i].id
        }','${businesses[i].name}','${businesses[i].status}')">
                              <div class="left"> ${businesses[i].name} </div>  
                             
                            </ons-list-item>`)
      );
    }
  }
}
//<div class="right"> <b>${ displayStatus(businesses[i].status)} </b></div>

function changeStat(e) {
  const index = e.index;
  const lstAdverts = document.querySelector("#lstAdverts");

  lstAdverts.innerHTML = "";

  for (let k = 0; adverts.length; k++) {
    const x_advert = adverts[k];

    if (index === x_advert.status) {
      lstAdverts.appendChild(
        ons.createElement(`<ons-list-item tappable onclick="alert(event)">
                              <div class="left"> <img class="list-item__thumbnail" src="${
                                adverts[k].img
                              }"> </div>
                              <div class="center">  
                                <span class="list-item_title">${
                                  adverts[k].name
                                }</span>  
                              </div>
                            
                           </ons-list-item>`)
      );
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

  for (let i = 0; i < complainss.length; i++) {
    const x_complains = complainss[i];

    if (index === x_complains.status) {
      lstcomplainss.appendChild(
        ons.createElement(`<ons-list-item expandable>
        <span class="list-item_title">${complainss[i].name}</span>
        <div class="expandable-content"> <b>${complainss[i].complaint}</b>
        /div>
      </ons-list-item>`)
      );
    }
  }
}

let status_segment;

// Types Section
function AddBusiness() {
  var modal = document.querySelector("ons-modal");
  modal.show();
}

function Submit() {
  var fs = require("fs");
  var names = document.getElementsByName("typeName");
  var description = document.getElementsByName("description");

  var typess = {
    name: names,
    description: description
  };

  fs.writeFile("js/types.json", JSON.stringify(typess, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });

  var modal = document.querySelector("ons-modal");
  modal.hide();
}

function SearchBar() {
  document.getElementById("icons").style.display = "none";
  document.getElementById("name").style.display = "none";
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("expand").style.width = "100%";
  document.getElementById("searchBar").style.display = "block";
}

class AccountFormClass {
  type;
  $username;
  $given_name;
  $family_name;
  $birthdate;
  $gender;
  $phone_number;
  $email;
  $password;
  $confirmPassword;
  $title;
  $submit;
  $signupLink;
  $loginLink;
  $forgotLink;
  $verificationCode;
  $progressBar;
  callback_obj;
  setForm(type) {
    this.type = type >= 0 ? type : this.type;
    switch (this.type) {
      case loginMode:
        this.$username.parentNode.style.display = "block";
        this.$email.parentNode.style.display = "none";

        this.$given_name.parentNode.style.display = "none";
        this.$family_name.parentNode.style.display = "none";
        this.$birthdate.parentNode.style.display = "none";
        this.$gender.parentNode.style.display = "none";
        this.$phone_number.parentNode.style.display = "none";

        this.$password.parentNode.style.display = "block";
        this.$confirmPassword.parentNode.style.display = "none";
        this.$verificationCode.parentNode.style.display = "none";
        this.$title.innerHTML = "Login";
        this.$submit.innerHTML = "Sign In";
        this.$signupLink.style.display = "inline"; //
        this.$loginLink.style.display = "none"; ///
        this.$forgotLink.style.display = "inline"; //
        break;
      case registerMode:
        this.$username.parentNode.style.display = "block";
        this.$email.parentNode.style.display = "block";

        this.$given_name.parentNode.style.display = "block";
        this.$family_name.parentNode.style.display = "block";
        this.$birthdate.parentNode.style.display = "block";
        this.$gender.parentNode.style.display = "block";
        this.$phone_number.parentNode.style.display = "block";

        this.$password.parentNode.style.display = "block";
        this.$confirmPassword.parentNode.style.display = "block";
        this.$verificationCode.parentNode.style.display = "none";
        this.$title.innerHTML = "Sign Up";
        this.$submit.innerHTML = "Submit";
        this.$signupLink.style.display = "none"; //
        this.$loginLink.style.display = "inline"; ///
        this.$forgotLink.style.display = "none"; //
        break;
      case forgotMode:
        this.$username.parentNode.style.display = "block";
        this.$email.parentNode.style.display = "none";
        this.$given_name.parentNode.style.display = "none";
        this.$family_name.parentNode.style.display = "none";
        this.$birthdate.parentNode.style.display = "none";
        this.$gender.parentNode.style.display = "none";
        this.$phone_number.parentNode.style.display = "none";
        this.$password.parentNode.style.display = "none";
        this.$confirmPassword.parentNode.style.display = "none";
        this.$verificationCode.parentNode.style.display = "none";
        this.$title.innerHTML = "Forgot Password";
        this.$submit.innerHTML = "Submit";
        this.$signupLink.style.display = "inline"; //
        this.$loginLink.style.display = "inline"; ///
        this.$forgotLink.style.display = "none"; //
        break;
      case confirmRegistrationMode:
        this.$username.parentNode.style.display = "block";
        this.$username.setAttribute("readonly", true);
        this.$email.parentNode.style.display = "none";
        this.$given_name.parentNode.style.display = "none";
        this.$family_name.parentNode.style.display = "none";
        this.$birthdate.parentNode.style.display = "none";
        this.$gender.parentNode.style.display = "none";
        this.$phone_number.parentNode.style.display = "none";
        this.$password.parentNode.style.display = "none";
        this.$confirmPassword.parentNode.style.display = "none";
        this.$verificationCode.parentNode.style.display = "block";
        this.$title.innerHTML = "Signup: Confirm Email";
        this.$submit.innerHTML = "Submit";
        this.$signupLink.style.display = "none"; //
        this.$loginLink.style.display = "none"; ///
        this.$forgotLink.style.display = "none"; //
        break;
      case confirmVerificationMode:
        this.$username.parentNode.style.display = "block";
        this.$username.setAttribute("readonly", true);
        this.$email.parentNode.style.display = "none";
        this.$given_name.parentNode.style.display = "none";
        this.$family_name.parentNode.style.display = "none";
        this.$birthdate.parentNode.style.display = "none";
        this.$gender.parentNode.style.display = "none";
        this.$phone_number.parentNode.style.display = "none";
        this.$password.parentNode.style.display = "block";
        this.$confirmPassword.parentNode.style.display = "block";
        this.$verificationCode.parentNode.style.display = "block";
        this.$title.innerHTML = "Verify Code";
        this.$submit.innerHTML = "Submit";
        this.$signupLink.style.display = "none"; //
        this.$loginLink.style.display = "none"; ///
        this.$forgotLink.style.display = "none"; //
    }
  }

  setAccountSpinner(active) {
    if (active) {
      this.$submit.setAttribute("disabled", true);
      this.$progressBar.style.display = "block";
    } else {
      this.$submit.removeAttribute("disabled");
      this.$progressBar.style.display = "none";
    }
  }

  displayStatus(message, isError) {
    ons.notification.toast((iserror ? "Error:" : "") + message, {
      timeout: 2000
    });
  }

  submit() {
    let _self = this;
    switch (_self.type) {
      case registerMode: {
        if (_self.$password.value !== _self.$password.value) {
          _self.displayStatus("Passwords not matched", true);
          return;
        }
        const data = {
          username: _self.$username.value,
          email: _self.$email.value,
          password: _self.$password.value,
          given_name: _self.$given_name.value,
          family_name: _self.$family_name.value,
          birthdate: _self.$birthdate.value,
          gender: _self.$gender.value,
          phone_number: _self.$phone_number.value
        };
        const process_signup = function(err, resp) {
          _self.setAccountSpinner(false);
          if (err) {
            _self.displayStatus(err.message, err);
          } else {
            _self.setForm(confirmRegistrationMode);
          }
        };
        _self.setAccountSpinner(true);
        return cloudapi.signup(data, process_signup);
      }
      case confirmRegistrationMode: {
        const process_confirmSignup = function(err, resp) {
          _self.setAccountSpinner(false);
          if (err) {
            _self.displayStatus(err.message, err);
          } else {
            $accountModal.hide();
            _self.displayStatus("You are now registered");
          }
        };
        _self.setAccountSpinner(true);
        return cloudapi.confirmSignup(
          _self.$username.value,
          _self.$verificationCode.value,
          process_confirmSignup
        );
      }
      case loginMode: {
        const process_login = function(
          err,
          checkNewUser,
          $this,
          userAttributes,
          requiredAttributes
        ) {
          _self.setAccountSpinner(false);
          $accountModal.hide();
          if (err) _self.displayStatus(err.message, true);
          else if (checkNewUser) {
            ///not used
            _self.callback_obj = $this;
          } else {
            $accountModal.hide();
            _self.displayStatus("You are logged in..");
          }
        };

        _self.setAccountSpinner(true);
        return cloudapi.signin(
          _self.$username.value,
          _self.$password.value,
          process_login
        );
      }

      case forgotMode: {
        const email = $form.find("#email").val();
        const process_forgotpassword = function(err, verification_cb) {
          _self.setAccountSpinner(false);
          if (err) return _self.displayStatus(err.message, err);
          //reset menu  ///_LNK_confirmProfile
          if (verification_cb) {
            _self.setForm(confirmVerificationMode);
            _self.callback_obj = verification_cb;
          } else {
            _self.setForm(loginMode);
            _self.displayStatus("Password Changed. You can now login");
          }
        };
        _self.setAccountSpinner(true);
        return cloudapi.forgotPassword(email, process_forgotpassword);
      }
      case confirmVerificationMode: {
        if (
          !_self.$password.value ||
          _self.$password.value != _self.$confirmPassword.value
        )
          return _self.displayStatus("Passwords Not Matched!", true);
        _self.setAccountSpinner(true);
        return cloudapi.confirmPassword(
          _self.$verificationCode.value,
          _self.$password.value,
          _self.callback_obj
        );
      }
    }
  }

  logout() {
    cloudapi.signoff();
    $accountModal.show();
  }

  switchToSignup() {
    this.type = registerMode;
    this.setForm();
  }
  switchToForgot() {
    this.type = forgotMode;
    this.setForm();
  }
  switchToLogin() {
    this.type = loginMode;
    this.setForm();
  }

  constructor(type) {
    this.type = type;
    this.$username = $accountModal.querySelector(".username");
    this.$email = $accountModal.querySelector(".email");

    this.$given_name = $accountModal.querySelector(".given_name");
    this.$family_name = $accountModal.querySelector(".family_name");
    this.$birthdate = $accountModal.querySelector(".birthdate");
    this.$gender = $accountModal.querySelector(".gender");
    this.$phone_number = $accountModal.querySelector(".phone_number");

    this.$password = $accountModal.querySelector(".password");
    this.$confirmPassword = $accountModal.querySelector(".confirmPassword");
    this.$title = $accountModal.querySelector(".title");
    this.$submit = $accountModal.querySelector(".submitBtn");
    this.$signupLink = $accountModal.querySelector(".signupLink");
    this.$loginLink = $accountModal.querySelector(".loginLink");
    this.$forgotLink = $accountModal.querySelector(".forgotLink");
    this.$verificationCode = $accountModal.querySelector(".verificationCode");
    this.$progressBar = $accountModal.querySelector("ons-progress-bar");
    this.setForm();
  }
}

const loginMode = 0;
const registerMode = 1;
const forgotMode = 2;
const confirmRegistrationMode = 3;
const confirmVerificationMode = 4;
let $accountModal;
let x_accountForm;

let cloudapi;
ons.ready(function() {
  //activate application inside here, including all events...
  $accountModal = document.querySelector("#accountModal");

  new COURSERV_API_CLASS((err, _ws) => {
    cloudapi = _ws;
    x_accountForm = new AccountFormClass(loginMode);
    //check if user is signed in
    if (!cloudapi.getUsername()) {
      $accountModal.show();
      //x_accountForm.setForm();
      //modal.show();
    }
  });

  document.addEventListener("init", function(e) {
    if (e.target.id === "businessPage") {
      status_segment = document.querySelector("#business-status");
      status_segment.addEventListener("postchange", changeStatus);
      changeStatus({ index: 0 });
    } else if (e.target.id === "businessAdverts") {
      status_segment = document.querySelector("#advert-status");
      status_segment.addEventListener("postchange", changeStat);
      changeStat({ index: 0 });
    } else if (e.target.id === "businesscomplains") {
      status_segment = document.querySelector("#complaints-status");
      status_segment.addEventListener("postchange", changeST);
      changeST({ index: 0 });
    } else if (e.target.id === "businesstypes") {
      readTextFile("types.json", function(text) {
        var typess = JSON.parse(text);
        console.log(typess);
      });
      status_segment = document.querySelector("#business-types");
    }
    console.log(e);
  });
});
