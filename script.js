

let currentTodoDateDiv = null; // 현재 활성화된 날짜 div

function addTodoDate() {
    const dateInput = document.getElementById("myDate");
    const dateText = dateInput.value.trim();

    if (!dateText) {
        alert("날짜를 입력해주세요!");
        return;
    }

    const todoContainer = document.getElementById("todoContainer");

    // 날짜 섹션 생성
    const dateSection = document.createElement("div");
    dateSection.classList.add("todo-date-item");

    // 날짜 제목 추가
    const dateTitle = document.createElement("div");
    dateTitle.textContent = dateText;
    dateTitle.classList.add("date-title");

    // 할 일 리스트 컨테이너 추가
    const todoListGroup = document.createElement("div");
    todoListGroup.classList.add("todo-list-group");

    // 섹션 구성
    dateSection.appendChild(dateTitle);
    dateSection.appendChild(todoListGroup);

    // 컨테이너에 추가
    todoContainer.prepend(dateSection);

    // 활성 날짜 섹션 설정
    currentTodoDateDiv = todoListGroup;

    dateInput.value = "";
}


function addTodoList() {
    const todoInput = document.getElementById("myList");
    const todoText = todoInput.value.trim();

    if (!todoText) {
        alert("할 일을 입력해주세요!");
        return;
    }

    // 현재 활성화된 날짜 섹션이 없는 경우 경고
    if (!currentTodoDateDiv) {
        alert("먼저 날짜를 추가해주세요!");
        return;
    }

    // 새로운 할 일 항목 생성
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-list-item");

    // 체크박스 생성
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.id = `todo-${Date.now()}`;

    // 커스텀 체크박스 레이블 생성
    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);

    // 텍스트 생성
    const textSpan = document.createElement("span");
    textSpan.textContent = todoText;
    textSpan.classList.add("todo-text");

    // 항목 구성
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(textSpan);

    // 현재 활성화된 날짜 섹션에 최신순으로 추가
    currentTodoDateDiv.prepend(todoItem);

    // 입력 필드 초기화
    todoInput.value = "";
}


function addEmoji(emoji) {
    const inputField = document.getElementById("myList");
    inputField.value = emoji + " " + inputField.value.trim();
}
