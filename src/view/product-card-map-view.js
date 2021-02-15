import AbstractView from "./abstract-view";

const leafletjs = window.L;
const LeafletjsConfig = {
  ACTIVE_ICON: leafletjs.icon({
    iconUrl: `./img/pin-active.svg`,
    iconSize: [20, 30],
  }),
  TITLE_LAYER: leafletjs.tileLayer(
      `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>`,
      })
};


export default class ProductCardMapView extends AbstractView {
  constructor() {
    super();

    this.map = null;
  }

  getTemplate() {
    return /* html */`<div class="popup__map" style="height: 200px" id="map"></div>`;
  }

  renderMap(coordinates) {
    const element = this.getElement();

    if (this.map !== null) {
      return;
    }

    this.map = leafletjs.map(element, {
      center: coordinates,
      zoom: 14,
      layers: [LeafletjsConfig.TITLE_LAYER],
      marker: true,
    });

    leafletjs.marker(coordinates, {icon: LeafletjsConfig.ACTIVE_ICON}).addTo(this.map);
  }

  destroy() {
    this.map.remove();
  }
}
