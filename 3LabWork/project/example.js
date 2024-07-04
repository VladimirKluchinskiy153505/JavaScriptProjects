document.addEventListener('DOMContentLoaded', function () {
    var save_button = document.getElementById('save-button');
    save_button.addEventListener("click", sendDataToDjango);
    var table = document.getElementById('edit-table');
    var cells = table.getElementsByTagName('td');
    for(var i =0;i<cells.length;++i){
        cells[i].onclick = function(){
            if(this.hasAttribute('data-clicked')){
                return
            }
            this.setAttribute('data-clicked', 'yes');
            this.setAttribute('data-text', this.innerHTML);

            console.log('clicked')
            var input = document.createElement('input');
            input.setAttribute('type','text');
            input.value = this.innerHTML;
            input.style.width = this.offsetWidth - (this.clientLeft*2) + "px";
            input.style.height = this.offsetHeight - (this.clientTop*2) + "px";
            input.style.border = "0px";
            input.style.fontFamily = "inherit";
            input.style.fontSize = "inherit";
            input.style.textAlign = "inherit";
            input.style.backgroundColor = "LightGolderRodYellow";

            input.onblur = function(){
                var td = input.parentElement;
                var orig_text = input.parentElement.getAttribute('data-text');
                var current_text = this.value;
                if (orig_text != current_text){
                    //save to db with Ajax
                    td.removeAttribute('data-clicked');
                    td.removeAttribute('data-text');
                    td.innerHTML = current_text;
                    td.style.cssText ='padding 5px';
                    console.log(orig_text + 'is Changed to' + current_text);
                }else{
                    td.removeAttribute('data-clicked');
                    td.removeAttribute('data-text');
                    td.innerHTML = orig_text;
                    td.style.cssText ='padding 5px';
                    console.log("No changes");
                }
            }
            input.onkeypress = function(){
                if(event.keyCode == 13){
                    this.blur();
                }
            }
            this.innerHTML = '';
            this.style.cssText = 'padding: 0px 0px';
            this.append(input);
            this.firstElementChild.select();
        }
    }
    function sendDataToDjango() {
        var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var marksData = {};
        var rows = document.querySelectorAll('#edit-table tr');
        var studentId = window.location.pathname.split('/').pop();
        rows.forEach(function (row) {
            var subject = row.cells[0].innerText;
            var marks = Array.from(row.cells).slice(1).map(cell => cell.innerText);
            marksData[subject] = marks;
        });
        var tableData = {
            'student_id': studentId,
            'marks_data': marksData
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/update_marklist/', true);

        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Error sending data:', xhr.statusText);
                }
            }
        };
        console.log(JSON.stringify(tableData));
        xhr.send(JSON.stringify(tableData));
    }
});