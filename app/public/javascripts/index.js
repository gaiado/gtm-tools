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
var tagList = function (parent) {
    gapi.client.request({
        'path': `https://www.googleapis.com/tagmanager/v2/${parent}/tags`,
    }).then(function (response) {
        console.log(response.result);
        let html = '';
        let { tag = [] } = response.result;
        for (let item of tag) {
            let date = (new Date(parseInt(item.fingerprint))).toLocaleString();
            html += '<tr>';
            html += `<td>${item.tagId}</td>`;
            html += `<td>${item.name}</td>`;
            html += `<td>${item.type}</td>`;
            html += `<td>${item.tagFiringOption}</td>`;
            html += `<td>${date}</td>`;
            html += '</tr>';
        }
        tblTags.innerHTML = html;
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};