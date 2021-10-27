import { renderBlock } from "./lib.js";

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
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
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
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
