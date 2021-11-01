import { renderBlock } from "./lib.js";

export function setUserData() {
  localStorage.user = JSON.stringify({
    userName: "Ann Smith",
    avatarLink: "/img/avatar.png",
  });
  localStorage.favoritesAmount = 3;
}

export function getUserData(): void {
  let user = JSON.parse(localStorage.user);
  let favoriteItemsAmount = getFavoritesAmount();
  renderUserBlock(user.userName, user.avatarLink, favoriteItemsAmount);
}

export function getFavoritesAmount(): unknown {
  let favoriteItemsAmount = localStorage.getItem("favoritesAmount");
  if (favoriteItemsAmount !== null) {
    return Number(favoriteItemsAmount);
  }
  return favoriteItemsAmount;
}

export function renderUserBlock(
  name: string,
  avatarLink: string,
  favoriteItemsAmount?: unknown
) {
  const favoritesCaption =
    favoriteItemsAmount > 0 ? favoriteItemsAmount.toString() : "ничего нет";
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src=${avatarLink} alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
          <img class="heart-icon" src=${
            hasFavoriteItems ? "img/heart-filled.png" : "img/heart-red.png"
          } alt='favorites icon'>
            ${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
