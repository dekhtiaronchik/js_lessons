import { renderBlock } from "./lib.js";
import { SearchFormData } from "./search-form";
import { getUserData } from "./user.js";
import { sdk } from "./sdk/use-sdk.js";
import { BookData, Database } from "./sdk/flat-rent-sdk.js";

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  bookedDates: string[];
  price: number;
}

export interface FavoriteItem {
  id: string;
  name: string;
  image: string;
}

export function searchLocalJson(
  searchFormData: SearchFormData
): Promise<Place[]> {
  return fetch(" http://localhost:4000/places")
    .then((r) => r.json())
    .then((data) => {
      const places: Place[] = Object.values(data);
      const searchResults: Place[] = places.filter(
        (place) => place.price <= searchFormData.maxPrice
      );
      return searchResults;
    });
}

export function searchSDK(searchFormData: SearchFormData): Database[] {
  const bookData: BookData = {
    city: searchFormData.city,
    checkInDate: new Date(searchFormData.checkinDate),
    checkOutDate: new Date(searchFormData.checkoutDate),
    priceLimit: searchFormData.maxPrice,
  };
  return sdk.search(bookData);
}

function handler(item: Database): Place {
  const place: Place = {
    id: item.id,
    name: item.title,
    description: item.details,
    image: item.photos[0],
    remoteness: 0,
    bookedDates: [],
    price: item.price,
  };
  return place;
}

export async function search(searchFormData: SearchFormData): Promise<Place[]> {
  const jsonData = await searchLocalJson(searchFormData);
  const sdkData = await searchSDK(searchFormData);
  let data: Place[] = sdkData.map((item) => {
    return handler(item);
  });
  return jsonData.concat(data);
}

export function toggleFavoriteItem(
  itemId: string,
  itemName: string,
  itemImage: string
): void {
  let favoriteItems: FavoriteItem[] = localStorage.favoriteItems
    ? JSON.parse(localStorage.favoriteItems)
    : [];
  const result: FavoriteItem = favoriteItems.find(
    (favoriteItem) => favoriteItem.id === itemId
  );
  let newFavoriteItems: FavoriteItem[];
  if (result) {
    newFavoriteItems = favoriteItems.filter((item) => item.id !== itemId);
  } else {
    newFavoriteItems = [
      ...favoriteItems,
      { id: itemId, name: itemName, image: itemImage },
    ];
  }
  localStorage.setItem("favoriteItems", JSON.stringify(newFavoriteItems));
  getUserData();
}

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function getResultView(searchResult: Place) {
  return `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active" onclick="toggleFavoriteItem(${searchResult.id}, '${searchResult.name}', '${searchResult.image}')"></div>
            <img class="result-img" src=${searchResult.image} alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${searchResult.name}</p>
              <p class="price">${searchResult.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${searchResult.remoteness}км от вас</div>
            <div class="result-info--descr">${searchResult.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
}

export function renderSearchResultsBlock(resultsList) {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${resultsList}
    </ul>
    `
  );
}
