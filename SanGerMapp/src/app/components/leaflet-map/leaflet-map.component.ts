import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-leaflet-map",
  templateUrl: "./leaflet-map.component.html",
  styleUrls: ["./leaflet-map.component.scss"]
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  private map: L.Map;

  @Input() initialPosition: Position;
  @Input() initialZoom: number = 13;
  @Output() positionChange = new EventEmitter<Position>();

  mapId: string;

  constructor() {
    this.mapId = "map-" + this.getRandomInt(Number.MAX_SAFE_INTEGER);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.createMap();
  }

  public resetMap() {
    this.map.setView(
      {
        lat: this.initialPosition.latitude,
        lng: this.initialPosition.longitude
      },
      this.initialZoom
    );
  }

  public addMarker(position: Position, options = null): Marker {
    let marker = new L.Marker(
      { lat: position.latitude, lng: position.longitude },
      { ...options }
    );
    this.map.addLayer(marker);
    return new Marker(marker, this.map);
  }

  public removeMarker(marker: Marker) {
    this.map.removeLayer(marker.marker);
  }

  private createMap() {
    this.map = L.map(this.mapId);
    this.map.setView(
      [this.initialPosition.latitude, this.initialPosition.longitude],
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );
    L.Icon.Default.imagePath = "/assets/images/";

    let self: LeafletMapComponent = this;

    this.map.on("click", (e: any) => {
      if (self.onClick) {
        self.onClick({ position: new Coord(e.latlng.lat, e.latlng.lng) });
      }
    });
  }

  public onClick: (click: ClickEvent) => void;
}

class Coord implements Position {
  constructor(public latitude: number, public longitude: number) {}
}

export interface ClickEvent {
  position: Position;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export class Marker {
  constructor(public marker: L.Marker<any>, public map: L.Map) {}

  public bindPopup(html: any, hasToOpenPopup: boolean = false) {
    this.marker.addTo(this.map).bindPopup(html);

    if (hasToOpenPopup) {
      this.marker.openPopup();
    }
  }




}
