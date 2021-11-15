import { renderBlock } from "./lib.js";
import {
  search,
  renderSearchResultsBlock,
  renderEmptyOrErrorSearchBlock,
  Place,
  getResultView,
} from "./search-results.js";

export interface SearchFormData {
  city: string;
  checkinDate: Date;
  checkoutDate: Date;
  maxPrice: number;
}

function mapToHTML(places: Place[]): string[] {
  return places.map((el) => getResultView(el));
}

export function getSearchData() {
  const form = document.getElementById("search-form");
  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const searchFormData: SearchFormData = {
        city: formData.get("city") as string,
        checkinDate: new Date(formData.get("checkin") as string),
        checkoutDate: new Date(formData.get("checkout") as string),
        maxPrice: Number(formData.get("price") as string),
      };
      search(searchFormData)
        .then((searchResults) => {
          if (searchResults.length > 0) {
            window["places"] = searchResults;
            sort("higher");
          } else {
            renderEmptyOrErrorSearchBlock(
              "По вашему запросу ничего не найдено!"
            );
          }
        })
        .catch((er) => {
          renderEmptyOrErrorSearchBlock(er);
        });
    });
  }
}

export function sort(value: string): void {
  console.log(value);
  switch (value) {
    case "lower":
      window["places"].sort((a, b) => {
        return a.price - b.price;
      });
      break;
    case "higher":
      window["places"].sort((a, b) => {
        return b.price - a.price;
      });
      break;
    case "closer":
      window["places"].sort((a, b) => {
        return a.remoteness - b.remoteness;
      });
      break;
  }
  renderSearchResultsBlock(mapToHTML(window["places"]));
}

export function renderSearchFormBlock(
  checkinDate: string,
  checkoutDate: string
) {
  const today = new Date().toISOString().split("T")[0];
  let checkinYear = new Date(checkinDate).getFullYear();
  let checkinMonth = new Date(checkinDate).getMonth() + 1;
  let checkinDay = new Date(checkinDate).getDate();
  const checkinDateValue = new Date(
    checkinYear + "-" + checkinMonth + "-" + (checkinDay + 1)
  )
    .toISOString()
    .split("T")[0];
  const checkoutDateValue = new Date(
    checkinYear + "-" + checkinMonth + "-" + (checkinDay + 3)
  )
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(checkinYear, checkinMonth + 1, 0);
  const lastDay = maxDate.setDate(0).toString();
  renderBlock(
    "search-form-block",
    `
    <form id="search-form" type="submit">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" value="Санкт-Петербург" name="city" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkinDateValue} min=${today} max=${lastDay} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkoutDateValue} min=${today} max=${lastDay} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button >Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
  getSearchData();
}
