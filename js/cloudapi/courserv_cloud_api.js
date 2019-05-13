"use strict";

//let AWS, AWSCognito;
//let  _CognitoUserPool,  _CognitoUserAttribute,  _CognitoUser;
const IDENTITY_POOL = "us-east-1:ae6eb452-cb15-421c-b0e3-0279c239235a";
const USER_POOL_ID = "us-east-1_WPOO9sn0r";
const CLIENT_ID = "5006ojp6nu600vt64p4i31kvij";
const AWS_REGION = "us-east-1";

let _self;

//constructor
class COURSERV_API_CLASS {
  //created October 3, 2016
  //"use strict";

  //private properties and methods
  profile;
  credentials = {};
  creds;
  poolData;

  userPool;
  cognitoUser;

  //services

  s3; // = new AWS.S3();
  documentClient; // = new AWS.DynamoDB.DocumentClient();

  reloadHomePage() {
    //location.reload();
    //document.location.href = "/";
  }

  //process aws  error message
  parse_aws_error(err, forced) {
    console.log("in error parising");
    if (
      forced ||
      err.name === "NotAuthorizedException" ||
      err.name === "InvalidSignatureException"
    ) {
      //_self.logOutUser();
      if (_self.cognitoUser !== null) {
        _self.cognitoUser.signOut();
        _self.cognitoUser = null;
        AWS.config.credentials.clearCachedId();
      }
      err = null;
      _self.reloadHomePage();
    }
  }

  //private methods
  //Get auth details for lambda authentication
  getAuth() {
    let auth = {};
    if (_self.cognitoUser) {
      auth.username = _self.cognitoUser.username;
      auth.signInUserSession = _self.cognitoUser.signInUserSession;
    }
    return auth;
  }

  //payload is an object
  courserv_lambda(functionName, payload, callback) {
    let defined_err = null;

    const parseLambdaResp = (err, resp) => {
      try {
        if (err) throw err;
        try {
          resp = JSON.parse(resp.Payload);
          resp = JSON.parse(resp);
          resp = JSON.parse(resp);
        } catch (err) {
          console.log("lambda safe err");
        }
        if (resp == "null") resp = null;

        if (resp && resp.errorMessage) {
          throw new Error(resp.errorMessage + "- errorType:" + resp.errorType);
        }
      } catch (err) {
        defined_err = err;
        resp = null;
        _self.parse_aws_error(defined_err);
      } finally {
        callback(defined_err, resp);
      }
    };

    if (!payload.auth) payload.auth = _self.getAuth();
    if (!payload.url) payload.url = window.location.href;
    const params = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    };
    const lambda = new AWS.Lambda();
    lambda.invoke(params, parseLambdaResp);
  }

  parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  //set Credentials
  p_setCredentials(session, callback) {
    if (session && session.isValid()) {
      const idToken = session.getIdToken().getJwtToken();
      const provider_name =
        "cognito-idp." + AWS_REGION + ".amazonaws.com/" + USER_POOL_ID;
      _self.creds.params.Logins = {};
      _self.creds.params.Logins[provider_name] = idToken;
      _self.creds.expired = true;
      //AWS.config.credentials = _self.creds;
      //AWSCognito.config.credentials = _self.creds;
      console.log(_self.creds);
      _self.profile = _self.parseJwt(idToken);
      if (AWS.config.credentials.needsRefresh()) {
        AWS.config.credentials.refresh(err => {
          console.log(_self.creds);
          callback(err);
        });
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  getCognitoUser(email, callback) {
    const payload = {
      email: email
    }; //ok
    _self.courserv_lambda("courserv-get-user", payload, (err, data) => {
      callback(err, data);
    });
  }

  //check if session is still valid
  p_checkSession(callback) {
    _self.cognitoUser = _self.userPool.getCurrentUser();
    if (_self.cognitoUser === null) {
      return callback();
    }
    _self.cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        _self.parse_aws_error(err, true);
        callback(err);
      } else {
        _self.credentials.username = _self.cognitoUser.getUsername();
        _self.credentials["tokens"] = {
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken()
        };
        _self.p_setCredentials(session, err => {
          if (err) _self.parse_aws_error(err, true);
          callback(err);
        });
      }
    });
  }

  //constructor
  constructor(callback) {
    _self = this;

    _self.creds = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL
    });

    _self.poolData = {
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID
    };

    //console.log("aws", AWS);
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = AWS_REGION; // Region
    AWS.config.credentials = _self.creds;

    AWSCognito.config.region = AWS_REGION;
    AWSCognito.config.credentials = _self.creds;

    AWSCognito.config.update({
      accessKeyId: "anything",
      secretAccessKey: "anything"
    });

    console.log("cred", _self.creds);

    _self.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(
      _self.poolData
    ); // _CognitoUserPool(
    _self.cognitoUser = _self.userPool.getCurrentUser();

    //services
    _self.s3 = new AWS.S3();
    _self.documentClient = new AWS.DynamoDB.DocumentClient();

    _self.p_checkSession(err => {
      if (err) console.log("checksession err", err);
      if (callback && typeof callback == "function") {
        callback(err, _self);
      }
    });
  }
}

//check session
COURSERV_API_CLASS.prototype.checkSession = callback => {
  _self.p_checkSession(err => {
    callback(err);
  });
};

//public methods
COURSERV_API_CLASS.prototype.setCredentials = callback => {
  AWS.config.credentials.get(err => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(_self.creds);
      callback(null, _self.creds);
    }
  });
};

COURSERV_API_CLASS.prototype.getProfile = () => {
  return _self.profile;
};

COURSERV_API_CLASS.prototype.getUsername = () => {
  if (
    _self.cognitoUser === null ||
    _self.cognitoUser.signInUserSession === null
  ) {
    return null;
  } else {
    return _self.cognitoUser.getUsername();
  }
};

// Instance methods
COURSERV_API_CLASS.prototype.signoff = () => {
  if (_self.cognitoUser !== null) {
    _self.cognitoUser.signOut();
    _self.cognitoUser = null;
    AWS.config.credentials.clearCachedId();
  }
};

COURSERV_API_CLASS.prototype.signup = (userData, callback) => {
  let attributeList = [];

  attributeList.push(
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "email",
      Value: userData.email
    })
  );
  attributeList.push(
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "birthdate",
      Value: userData.birthdate
    })
  );
  attributeList.push(
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "gender",
      Value: userData.gender
    })
  );

  attributeList.push(
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "given_name",
      Value: userData.given_name
    })
  );

  attributeList.push(
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "family_name",
      Value: userData.family_name
    })
  );

  //using attributeList for null...
  _self.userPool.signUp(
    userData.username,
    userData.password,
    attributeList,
    null,
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      }
      if (result) {
        _self.cognitoUser = result.user;
        callback(null, result);
      }
    }
  );
};

COURSERV_API_CLASS.prototype.confirmSignup = (
  username,
  verificationCode,
  callback
) => {
  const userData = {
    Username: username,
    Pool: _self.userPool
  };
  _self.cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
    userData
  );
  _self.cognitoUser.confirmRegistration(
    verificationCode,
    true,
    (err, result) => {
      callback(err, result);
    }
  );
};

COURSERV_API_CLASS.prototype.getCredentials = () => {
  return _self.credentials;
};

COURSERV_API_CLASS.prototype.signin = (username, password, callback) => {
  const $this = this;
  const trimmedUsername = username.trim();
  console.log(_self.creds);
  const authenticationData = {
    Username: trimmedUsername,
    Password: password
  };
  const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(
    authenticationData
  );

  const userData = {
    Username: trimmedUsername,
    Pool: _self.userPool
  };
  _self.cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
    userData
  );

  _self.cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: result => {
      _self.credentials.username = trimmedUsername;
      _self.credentials["tokens"] = {
        accessToken: result.getAccessToken().getJwtToken(),
        idToken: result.getIdToken().getJwtToken(),
        refreshToken: result.getRefreshToken().getToken()
      };
      _self.p_setCredentials(result, err => {
        if (err) throw err;
        else callback(null, false, $this);
      });
    },
    onFailure: err => {
      //_self.cognitoUser = null;
      callback(err);
    },
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      callback(null, true, $this, userAttributes, requiredAttributes);
    }
  });
};

//completeChallenge
COURSERV_API_CLASS.prototype.completeChallenge = (
  newPassword,
  userData,
  $this
) => {
  //user.phone_number = '+18766568000';
  //user.gender = 'male';
  _self.cognitoUser.completeNewPasswordChallenge(newPassword, userData, $this);
};

//change password for logon user
COURSERV_API_CLASS.prototype.changePassword = (
  oldPassword,
  newPassword,
  callback
) => {
  _self.cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
    console.log("call result: " + result);
    callback(err, result);
  });
};

//forgot password
COURSERV_API_CLASS.prototype.forgotPassword = (email, callback) => {
  _self.getCognitoUser(email, (err, user) => {
    if (err) return callback(err);
    if (!user) return callback(new Error("Invalid Email Address!"));
    console.log(user);
    const params = {
      Username: user.username,
      Pool: _self.userPool
    };
    _self.cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(
      params
    );
    _self.cognitoUser.forgotPassword({
      onSuccess: () => {
        callback();
      },
      onFailure: err => {
        _self.cognitoUser = null;
        callback(err);
      },
      inputVerificationCode: () => {
        callback(null, this);
      }
    });
  });
};

//confirm-- forgot password
COURSERV_API_CLASS.prototype.confirmPassword = (
  verificationCode,
  newPassword,
  $this
) => {
  _self.cognitoUser.confirmPassword(verificationCode, newPassword, $this);
};

//user management ---admin only
//getUserDomain
COURSERV_API_CLASS.prototype.getUser = (userid, domain_id, callback) => {
  const lambdaReq = {
    request: {
      cmd: "getUser",
      domain_id: domain_id,
      userid: userid
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

COURSERV_API_CLASS.prototype.listUsers = (domain_id, callback) => {
  const lambdaReq = {
    request: {
      cmd: "listUsers",
      domain_id: domain_id,
      url: window.location.href
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

//delete user --admin
COURSERV_API_CLASS.prototype.deleteUser = (userid, domain_id, callback) => {
  const lambdaReq = {
    request: {
      cmd: "deleteUser",
      userid: userid,
      domain_id: domain_id
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

//reset user --admin
COURSERV_API_CLASS.prototype.resetUser = (userid, domain_id, callback) => {
  const lambdaReq = {
    request: {
      cmd: "resetUser",
      userid: userid,
      domain_id: domain_id
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

//create user --admin
COURSERV_API_CLASS.prototype.createUser = (userData, domain_id, callback) => {
  const lambdaReq = {
    request: {
      cmd: "createUser",
      data: userData,
      domain_id: domain_id
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

//update user --admin
COURSERV_API_CLASS.prototype.updateUser = (userData, domain_id, callback) => {
  const lambdaReq = {
    request: {
      cmd: "updateUser",
      data: userData,
      domain_id: domain_id
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

//invite user
COURSERV_API_CLASS.prototype.inviteUser = (userInvite, callback) => {
  const lambdaReq = {
    request: {
      cmd: "inviteUser",
      data: userInvite,
      url: window.location.href
    }
  };
  _self.courserv_lambda("cs326-advert-main", lambdaReq, (err, data) => {
    callback(err, data);
  });
};

//
