// 개발용 초기화 함수
function resetAll() {
    if (confirm('모든 데이터를 초기화하시겠습니까?')) {
        localStorage.clear();
        document.getElementById('todoContainer').innerHTML = '';
        currentTodoDateDiv = null;
    }
}

// 데이터 저장 함수
function saveTodos() {
    const todoContainer = document.getElementById("todoContainer");
    const data = todoContainer.innerHTML;
    localStorage.setItem('todos', data);
}

// 데이터 로드 함수
function loadTodos() {
    const savedData = localStorage.getItem('todos');
    if (savedData) {
        const todoContainer = document.getElementById("todoContainer");
        todoContainer.innerHTML = savedData;
        
        // 체크박스 이벤트 리스너 다시 설정
        setupCheckboxListeners();
    }
}

// 체크박스 이벤트 리스너 설정 함수
function setupCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.todo-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveTodos(); // 체크박스 상태 변경 시 저장
        });
    });
}

// 페이지 로드 시 데이터 복원
document.addEventListener('DOMContentLoaded', loadTodos);


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

    saveTodos(); // 날짜 추가 후 저장
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

    // 체크박스 이벤트 리스너 설정
    checkbox.addEventListener('change', function() {
        saveTodos();
    });
    
    // 데이터 저장
    saveTodos();

    // 입력 필드 초기화
    todoInput.value = "";

    if (isEditMode) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '❌';
        deleteBtn.onclick = () => todoItem.remove();
        todoItem.appendChild(deleteBtn);
    }
}


function addEmoji(emoji) {
    const inputField = document.getElementById("myList");
    inputField.value = emoji + " " + inputField.value.trim();
}

// Enter 키 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    // 날짜 입력 필드에 대한 Enter 키 이벤트
    const dateInput = document.getElementById("myDate");
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 동작 방지
            addTodoDate();
        }
    });

    // 할 일 입력 필드에 대한 Enter 키 이벤트
    const todoInput = document.getElementById("myList");
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 동작 방지
            addTodoList();
        }
    });
});

// 편집 모드의 상태를 저장하는 전역 변수
let isEditMode = false;

function toggleEditMode() {
    // 편집 모드 상태를 반전 (true → false 또는 false → true)
    isEditMode = !isEditMode;
    
    // HTML 요소들을 가져옴
    const editButton = document.getElementById('editButton');
    const editIcon = document.getElementById('ic_edit');
    // 모든 할 일 항목들을 선택 (.todo-list-item 클래스를 가진 모든 요소)
    const todoItems = document.querySelectorAll('.todo-list-item');
    
    if (isEditMode) { // 편집 모드가 시작될 때
        // 버튼 텍스트를 '완료'로 변경
        editButton.value = '완료';
        // 편집 아이콘을 체크 아이콘으로 변경
        editIcon.classList.add('checked');
        
        // 각각의 할 일 항목에 대해 처리
        todoItems.forEach(item => {
            // 각 항목에서 체크박스와 라벨 요소를 찾음
            const checkbox = item.querySelector('.todo-checkbox');
            const label = item.querySelector('label');
            
            // 기존 체크박스는 숨김
            if (checkbox) checkbox.style.display = 'none';
            
            if (label) {
                // 라벨의 배경 이미지를 삭제 아이콘으로 변경
                label.style.backgroundImage = "url('images/ic_delete.png')";
                label.style.display = 'flex';
                
                // 라벨 클릭 시 삭제 동작 정의
                label.onclick = () => {
                    // 상위 요소들을 찾음 (할 일 그룹과 날짜 섹션)
                    const todoGroup = item.closest('.todo-list-group');
                    const dateSection = todoGroup.closest('.todo-date-item');
                    
                    // 현재 항목 삭제
                    item.remove();
                    
                    // 할 일 그룹이 비었는지 확인하고, 비었다면 날짜 섹션도 삭제
                    if (todoGroup && todoGroup.children.length === 0) {
                        if (dateSection) {
                            dateSection.remove();
                        }
                    }
                    
                    // 남은 할 일 항목이 있는지 확인
                    const remainingItems = document.querySelectorAll('.todo-list-item');
                    // 모든 항목이 삭제되었다면 편집 모드 종료
                    if (remainingItems.length === 0) {
                        isEditMode = false;
                        editButton.value = '편집';
                        editIcon.classList.remove('checked');
                    }
                    
                    // 변경사항을 로컬 스토리지에 저장
                    saveTodos();
                };
            }
        });
    } else { // 편집 모드가 종료될 때
        // 버튼 텍스트를 '편집'으로 변경
        editButton.value = '편집';
        // 편집 아이콘을 원래대로 복원
        editIcon.classList.remove('checked');
        
        // 모든 할 일 항목의 체크박스와 라벨을 원래 상태로 복원
        todoItems.forEach(item => {
            const checkbox = item.querySelector('.todo-checkbox');
            const label = item.querySelector('label');
            
            // 체크박스 다시 표시
            if (checkbox) checkbox.style.display = '';
            
            if (label) {
                // 라벨의 배경 이미지를 체크박스로 복원
                label.style.backgroundImage = "url('images/ic_uncheck.png')";
                // 클릭 이벤트 제거
                label.onclick = null;
                // 체크된 상태였다면 체크 표시 복원
                if (checkbox.checked) {
                    label.style.backgroundImage = "url('images/ic_checked.png')";
                }
            }
        });
        // 변경사항을 로컬 스토리지에 저장
        saveTodos();
    }
}
