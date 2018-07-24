let btnSearch, tblTags;
$(function () {
    btnSearch = document.getElementById('btn-search');
    tblTags = document.getElementById('tbl-tags');
    btnSearch.addEventListener('click', function () {
        let { value } = cboWorkspace;
        if (value) {
            tagList(value);
        }
    });
});
let tags = [];
let tagList = function (parent) {
    gapi.client.request({
        'path': `https://www.googleapis.com/tagmanager/v2/${parent}/tags`,
    }).then(function (response) {
        tags =  response.result.tag || [];  
        search();
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};

let search = function(){
    let {value=''}=txtSearch;
    const className = 'form-control';
    txtSearch.className=className;
    let html = '';
    if(value.length){
        if(!checkRegex.checked){
            value = value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }
        try{        
            let re = new RegExp(value);
            for (let item of tags) {
                if(re.test(JSON.stringify(item.parameter))||re.test(JSON.stringify(item.name))){
                    html+=getRow(item);
                }
            }
        }catch(e){
            txtSearch.className=className + ' ' + 'is-invalid';
        }  
    }else{
        for (let item of tags) {
            html+=getRow(item);
        }
    }
    tblTags.innerHTML = html;
      
};

let getRow=function(item){
    let html = '';
    let date = (new Date(parseInt(item.fingerprint))).toLocaleString();
    html += '<tr>';
    html += `<td>${item.tagId}</td>`;
    html += `<td>${item.name}</td>`;
    html += `<td>${item.type}</td>`;
    html += `<td>${item.tagFiringOption}</td>`;
    html += `<td>${date}</td>`;
    html += '</tr>';
    return html;
};