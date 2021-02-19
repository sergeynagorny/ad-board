import API from "./api";
import AppPresenter from "./presenter/app-presenter";

const END_POINT = `https://main-shop-fake-server.herokuapp.com`;
const api = new API(END_POINT);

const root = document.querySelector(`main`);

const appPresenter = new AppPresenter(root, api);
appPresenter.init();
