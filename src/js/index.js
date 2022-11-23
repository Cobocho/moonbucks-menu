const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

const findLastNode = (selector) => {
  return $All(selector)[$All(selector).length - 1];
};

class MenuControl {
  #menuItems = new Set();

  constructor() {
    $("#espresso-menu-form").addEventListener("submit", this.submitMenu);

    $("#espresso-menu-submit-button").addEventListener(
      "click",
      this.submitMenu
    );
  }

  submitMenu = (event) => {
    event.preventDefault();

    const menuName = $("#espresso-menu-name").value;
    if (menuName.replaceAll(" ", "") === "")
      return alert("공백이 아닌 값을 입력하세요!");
    if (this.#menuItems.has(menuName))
      return alert("중복되지 않은 메뉴를 입력해주세요!");
    this.addMenuItem(menuName);

    this.setButtonEvent(".menu-remove-button", this.removeMenuItem);
    this.setButtonEvent(".menu-edit-button", this.editMenuItem);

    this.setMenuCount();
    $("#espresso-menu-name").value = "";
  };

  setButtonEvent(targetNodeList, eventFunction) {
    const btn = findLastNode(targetNodeList);
    btn.addEventListener("click", eventFunction);
  }

  addMenuItem(name) {
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      this.getMenuTemplete(name)
    );
    this.#menuItems.add(name);
  }

  removeMenuItem = (event) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const deletedMenuItem =
        event.target.parentNode.querySelector(".menu-name").textContent;
      this.#menuItems.delete(deletedMenuItem);
      event.target.parentNode.remove();
      this.setMenuCount();
    }
  };

  editMenuItem = (event) => {
    const changedName = prompt("바꿀 메뉴명을 입력해주세요!");
    if (changedName === "") return alert("공백이 아닌 값을 입력하세요!");
    event.target.parentNode.querySelector(".menu-name").textContent =
      changedName;
  };

  getMenuTemplete(name) {
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

  setMenuCount() {
    const menuCount = $("#espresso-menu-list").children.length;
    $(".menu-count").textContent = `총 ${menuCount}개`;
  }

  findLastNode = (selector) => {
    return $All(selector)[$All(selector).length - 1];
  };
}

const menuControl = new MenuControl();
