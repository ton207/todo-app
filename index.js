const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

//ローカルストレージにデータを取得していく
const todos = JSON.parse(localStorage.getItem("todos"));

//todosが空じゃなかったらliタグを追加する
if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(input.value);
    add(); 
});

function add(todo) {
    let todoText = input.value;

    //もしtodoがある時はtodoTextににtodoの値を入れる
    if (todo) {
        todoText = todo.text;
    }

    if (todoText.length > 0) {
    const li = document.createElement("li");　
    li.innerText = todoText;　
    li.classList.add("list-group-item");

    //リロード対策。リロードしてもtodoのデータが消えずに残すように。
    //todoがcompleted(完了）の場合にはliタグに対してtext-decoration-line-through（打ち消し線）が消えずに残るように。
    //todoがtodoを渡されてtodoがcompleted（完了）ならHTMLのclassを追加させる
    //todoが存在し（ローカルストレージにデータがあり）todoのcompletedがtrueならliのclassリストにclassを追加する
    //追加するclassというのはtext-decoration-line-throughというクラス
    if (todo && todo.completed) {
        li.classList.add("text-decoration-line-through");
    }

    //TODOを削除する機能を作る。右クリックされたらliタグを削除
    //liタグに対してaddEventListenerで「右クリックされたら・・」というイベントを追加したら良い
    //addの中でliタグを作ってulの中でappendChildでしてたが、
    //liタグ作成してこのulを画面に追加する前にこのliタグに対してaddEventListenerを仕込んでおく

    li.addEventListener("contextmenu", function
    (event) {
        //右クリック時にデフォルトで表示されるメニューバーは非表示にしたい。デフォルトのイベントをブロックしておく
        event.preventDefault(); 
        li.remove();
        //liタグを削除したらローカルストレージの方も反映させておく
        saveData();
    });

    //TODOに完了マークをつける。左クリックしたら取り消し線をつける
    //ulの下にliタグを付ける前にイベントを付けてからulに付けるようにする
    //text-decoration-line-throughはBootstrapで打ち消し線を付けるHTMLのclassである。toggleは切り替え機能になる
    li.addEventListener("click", function () {
        li.classList.toggle  
        ("text-decoration-line-through");
        saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
 }
}
       
function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];

    lists.forEach(list => {
　　　　　//「打消線という状態」をデータに持たせないとリロードの度に消えてしまう
　　　　　//リロード時もtodo取消線を残すには「左クリックしたらそのタスクは完了した」という完了状態をデータとして持たせる。
　　　　　//完了状態というデータを持つ為にオブジェクトというデータ型を導入する。
　　　　　//オブジェクト：key（名前）とvalue（値）が対になった物の集合。1つの物に対し複数の属性データを持たせたい時に使う
        //今はローカルストレージにテキストの情報しか保存してないが、ここに完了状態も併せて持つようにすれば実現する。
        //まずデータとしてオブジェクトを定義して、「text」と「completed」の２つを持つようにする。
        //completedについては「text-decoration-line-through」というHTMLのclassを持っているか否かで判断したい
        //それを持ってればtrue、持ってなければfolseを持たせる。こうすると「text」と「完了状態」をセットで扱える
        let todo = {
            text: list.innerText,
            completed: list.classList.contains
            ("text-decoration-line-through")
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


　　
