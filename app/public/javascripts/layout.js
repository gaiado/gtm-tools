let cboAccount, cboContainer, cboWorkspace;
let init = function () {
    document.body.className = '';

    cboAccount = document.getElementById('cbo-account');
    cboContainer = document.getElementById('cbo-container');
    cboWorkspace = document.getElementById('cbo-workspace');

    cboAccount.addEventListener('change', function () {
        containerList(this.value);
    });

    cboContainer.addEventListener('change', function () {
        containerList(this.value);
    });

    accountList();
};

function handleClientLoad() {
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    gapi.client.init({
        'apiKey': 'AIzaSyBIjQaBJHkR5LhrZT2FYarF6lUd46Tr-iY',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        'clientId': '676813910579-uce8jn1kaelb0ukllbndf7u2vl9panof.apps.googleusercontent.com',
        scope: [
            'profile',
            'https://www.googleapis.com/auth/tagmanager.readonly'
        ].join(' ')
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
        makeApiCall();
    }
}

function handleSignInClick(event) {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    document.body.className = 'logout';
}

function makeApiCall() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function (response) {
        document.getElementById('lbl-name').innerText = response.result.names[0].givenName;
        init();
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}

var accountList = function () {
    gapi.client.request({
        'path': 'https://www.googleapis.com/tagmanager/v2/accounts',
    }).then(function (response) {
        let html = '';
        let { account = [] } = response.result;
        for (let item of account) {
            html += `<option value='${item.path}'>${item.name}</option>`;
        }
        if (account.length) {
            containerList(account[0].path);
        }
        cboAccount.innerHTML = html;
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

var containerList = function (parent) {
    gapi.client.request({
        'path': `https://www.googleapis.com/tagmanager/v2/${parent}/containers`,
    }).then(function (response) {
        let html = '';
        let { container = [] } = response.result;
        for (let item of container) {
            html += `<option value='${item.path}'>${item.name}</option>`;
        }
        cboContainer.innerHTML = html;
        if (container.length) {
            workspaceList(container[0].path);
        }
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

var workspaceList = function (parent) {
    gapi.client.request({
        'path': `https://www.googleapis.com/tagmanager/v2/${parent}/workspaces`,
    }).then(function (response) {
        let html = '';
        let { workspace = [] } = response.result;
        for (let item of workspace) {
            html += `<option value='${item.path}'>${item.name}</option>`;
        }
        cboWorkspace.innerHTML = html;
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};