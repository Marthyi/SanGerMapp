import { Component, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  Position,
  LeafletMapComponent,
  Marker,
  ClickEvent
} from "./components/leaflet-map/leaflet-map.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "SanGerMapp";

  @ViewChild(LeafletMapComponent) map: LeafletMapComponent;

  public myPosition: Position;
  public profileForm: FormGroup;
  private markers: Marker[] = [];

  constructor(private fb: FormBuilder) {
    this.myPosition = { latitude: 48.89, longitude: 2.09 };

    this.profileForm = this.fb.group({
      longitude: ["2.082642"],
      latitude: ["48.901588"]
    });
  }

  public enable() {
    let self = this;
    this.map.onClick = function(click: ClickEvent) {
      let marker = self.map.addMarker(click.position);
      marker.bindPopup('hello bind');
    }
  }

  public disable() {
    this.map.onClick = null;
  }

  public remove() {
    let marker = this.markers.pop();
    this.map.removeMarker(marker);
  }

  public reset() {
    this.map.resetMap();
  }

  public onPositionChange(event: Position) {}
}
