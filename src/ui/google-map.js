import { BaseElement } from './base-element.js';

export class GoogleMap extends BaseElement {
  constructor(centerOfMap, data) {
    super();
    this.centerOfMap = centerOfMap;
    this.data = data;
  }

  createElement() {
    super.createElement();
    setTimeout(() => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: this.centerOfMap,
      });

      for(const vehicle of this.data) {
        const [lat, long] = vehicle.latLong.split(' ');
        const vehicleLatLong = new window.google.maps.LatLng(lat, long);

        const marker = new window.google.maps.Marker({
          position: vehicleLatLong,
          map,
        });

        marker.setMap(map);
      }
    }, 0);
  }

  getElementString() {
    return `
      <div style="width: 800px; height: 400px;" id="map"></div>
    `;
  }
}
