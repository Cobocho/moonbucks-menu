const $menuForm = document.getElementById("espresso-menu-form");
const $menuInput = document.getElementById("espresso-menu-name");
const $menuAddButton = document.getElementById("espresso-menu-submit-button");
const $menuList = document.getElementById("espresso-menu-list");

$menuForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addMenu();
});

$menuAddButton.addEventListener("click", (event) => {
  event.preventDefault();
  addMenu();
});

function addMenu() {
  const menuName = $menuInput.value;
  const menu = makeMenu(menuName);
  $menuList.insertAdjacentHTML("beforeend", menu);
  const removeBtn = document.querySelectorAll(".menu-remove-button")[
    document.querySelectorAll(".menu-remove-button").length - 1
  ];
  removeBtn.addEventListener("click", (event) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      event.target.parentNode.remove();
      countReset();
    }
  });
  const editBtn =
    document.querySelectorAll(".menu-edit-button")[
      document.querySelectorAll(".menu-edit-button").length - 1
    ];
  editBtn.addEventListener("click", (event) => {
    event.target.parentNode.querySelector(".menu-name").textContent =
      prompt("바꿀 메뉴명을 입력해주세요!");
  });
  countReset();
  $menuInput.value = "";
}

function makeMenu(name) {
  const templete = `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`;

  return templete;
}

function countReset() {
  const $menuCount = document.querySelector(".menu-count");
  $menuCount.textContent = `총 ${
    document.querySelector("#espresso-menu-list").children.length
  }개`;
}
