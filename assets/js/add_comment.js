import axios from "axios";

const add_comment_form = document.getElementById("js-add-comment");
const comment_list = document.getElementById("js-comment-list");
const comment_number = document.getElementById("js-comment-number");

const change_number = {
  increase: () => {
    comment_number.innerHTML = `${parseInt(comment_number.innerHTML, 10) + 1} `;
  },
  decrease: () => {
    comment_number.innerHTML = `${parseInt(comment_number.innerHTML, 10) - 1} `;
  },
};

const delete_comment = (index) => {
  const comment = comment_list.children[index];
  comment_list.removeChild(comment);
  change_number.decrease();
};

const send_comment_index = async (index) => {
  const video_id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${video_id}/comment/`,
    method: "DELETE",
    data: { index },
  });
  if (response.status === 200) {
    delete_comment(index);
  }
};

const handle_del_click = (event) => {
  const { target } = event;
  if (target.tagName === "BUTTON") {
    const { index } = target.closest("li").dataset;
    send_comment_index(index);
  }
};

const add_comment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  comment_list.prepend(li);
  change_number.increase();
};

const send_comment = async (comment) => {
  const video_id = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${video_id}/comment`,
    method: "POST",
    data: { comment },
  });
  if (response.status === 200) {
    add_comment(comment);
  }
};

const handel_submit = (event) => {
  event.preventDefault();
  const comment_input = add_comment_form.querySelector("input");
  const comment = comment_input.value;
  send_comment(comment);
  comment_input.value = "";
};

function init() {
  add_comment_form.addEventListener("submit", handel_submit);
  comment_list.addEventListener("click", handle_del_click);
}

if (add_comment_form) {
  init();
}
