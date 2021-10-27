import { renderBlock } from './lib.js';

export function renderUserBlock(
  name: string,
  avatarLink: string,
  favoriteItemsAmount: number
) {
  const favoritesCaption =
    favoriteItemsAmount > 0 ? favoriteItemsAmount.toString() : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarLink} alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
          <img class="heart-icon" src=${
  hasFavoriteItems ? 'img/heart-filled.png' : 'img/heart-red.png'
} alt='favorites icon'>
            ${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
