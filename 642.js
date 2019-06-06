window.addEventListener('load',function () {
    let tab = document.querySelectorAll('.tab>li');
    let bg = document.querySelector('.tab>div');
    let prev = 0;
    let type = 'all';
    let content = document.querySelector('.content');
    let todolist = [
        {
            id: 1, content: '端午节要交作业', ctime: '2019/6/4', status: false
        },
        {
            id: 2, content: '我不想交作业', ctime: '2019/6/4', status: false
        },
        {
            id: 3, content: '企业网站', ctime: '2019/5/31', status: true
        },
        {
            id: 4, content: '需求文档', ctime: '2019/6/10', status: false
        }
    ];
    tab.forEach(function (ele, index) {
        ele.onclick = function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            bg.style.left=index*300+'px';
            prev = index;
            let type = this.getAttribute('type');
            render(filterdata(type));
        };
        content.onclick=function (e) {
            let target = e.target;
            let type =tab[prev].getAttribute('type');
            let id = target.parentNode.id;
            if(target.nodeName == 'DEL') {
                let index = todolist.findIndex(ele => ele.id == id);
                todolist.splice(index, 1);
            }else if(target.nodeName == 'INPUT'){
                let ele = todolist.filter(ele=>ele.id == id)[0];
                ele.status = target.checked;
            }
            render(filterdata(type));
        };
    });
    tab[0].onclick();
    function filterdata(type) {
        let arr = [];
        switch(type){
            case 'all':
                arr = todolist;
                break;
            case 'done':
                arr = todolist.filter(function (ele) {
                    return ele.status;
                });
                break;
            case 'doing':
                arr = todolist.filter(function (ele) {
                    return !ele.status;
                });
                break;
        }
        return arr;
    }
    function render(arr) {
        let html = '';
        arr.forEach(function (elem, index) {
            if (elem.status) {
                html += `
                    <li id=${elem.id}>
                        <input type="checkbox" checked> <p> ${elem.content} </p> <time>${elem.ctime}</time> <del style="text-decoration: none">X</del>
                    </li>
            `;
            }else{
                html += `
                    <li id=${elem.id}>
                        <input type="checkbox"> <p> ${elem.content} </p> <time>${elem.ctime}</time><del style="text-decoration: none">x</del>
                    </li>
            `;
            }
        });
        content.innerHTML = html;
    }
    let forms = document.forms[0];
    let textbtn = forms.elements['content'];
    let submitbtn = forms.elements[1];
    submitbtn.onclick = function (e) {
        e.preventDefault();
        let obj = createobj();
        todolist.push(obj);
        render(filterdata(type))
    };
    function createobj(){
        let id = todolist[todolist.length-1].id+1;
        let content = textbtn.value;
        let ctime = new Date().toLocaleDateString();
        let status = false;
        return {id,content,ctime,status}
    }
});