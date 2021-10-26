import { renderBlock } from "./lib.js";
import moment from "moment";

export function renderSearchFormBlock(
  checkinDate: string,
  checkoutDate: string
) {
  const today = moment().format("DD-MM-YYYY");
  const checkinDateValue = moment(checkinDate)
    .add(1, "day")
    .format("DD-MM-YYYY");
  const checkoutDateValue = moment(checkinDate)
    .add(3, "day")
    .format("DD-MM-YYYY");
  const checkinDateMax = moment(checkinDate)
    .add(1, "month")
    .format("DD-MM-YYYY");

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
            <input id="check-in-date" type="date" data-date-format="DD MM YYYY" value=${checkinDateValue} min=${today} max=${checkinDateMax} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" data-date-format="DD MM YYYY" value=${checkoutDateValue} min=${today} max=${checkinDateMax} name="checkout" />
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
