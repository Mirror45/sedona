const poppap = (element) => element.classList.toggle("poppap--active");

const modal = (element) => {
  element.classList.add("modal--active");
  page__overlay.classList.add("page__overlay--active");
  page__body.classList.add("page__body--overflow");

  element.querySelector(".button--close").onclick = () => {
    element.classList.remove("modal--active");
    page__overlay.classList.remove("page__overlay--active");
    page__body.classList.remove("page__body--overflow");
  };
};

const focus = (element) => {
  let child = element.querySelectorAll(
    "input, button, [href], textarea, select, [tabindex]:not([tabindex='-1'])"
  );
  child[0].focus();

  child[child.length - 1].onkeydown = (e) => {
    if (e.key != "Tab") return;
    child[0].focus();
    e.preventDefault();
  };
};

const page__body = document.querySelector(".page__body");
const favoritesPoppap = document.querySelector(".favorites-poppap");
const userNavigation__favorites = document.querySelector(
  ".user-navigation__favorites"
);
const page__overlay = document.querySelector(".page__overlay");
const modalBooking = document.querySelector(".modal-booking");
const mailingList__button = document.querySelector(".mailing-list__button");

userNavigation__favorites.onclick = () => poppap(favoritesPoppap);
mailingList__button.onclick = () => {
  modal(modalBooking);
  focus(modalBooking);
};
