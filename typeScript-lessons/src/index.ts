import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock, toggleFavoriteItem } from "./search-results.js";
import { getUserData, setUserData } from "./user.js";
import { renderToast } from "./lib.js";

window["toggleFavoriteItem"] = toggleFavoriteItem;
window.addEventListener("DOMContentLoaded", () => {
  setUserData();
  getUserData();
  renderSearchFormBlock("2021-12-14", "2021-12-25");
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
});
