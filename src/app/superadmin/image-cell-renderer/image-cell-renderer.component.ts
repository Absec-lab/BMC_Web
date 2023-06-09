import { Component } from '@angular/core';

@Component({
  selector: 'app-image-cell-renderer',
  template: `
    <a href="{{ imageBasePath + imageUrl }}" target="_blank" *ngIf="imageUrl.length > 0">
      <img src="{{ imageBasePath + imageUrl }}" style="height: 50px; width: auto;" />
    </a>
    <div *ngIf="imageUrl.length == 0" style="text-">
      No image
    </div>
  `
})
export class ImageCellRendererComponent {

  imageUrl: any = null;
  imageBasePath: string = "http://43.204.240.44:9091/download/";

  agInit(params: any): void {
    this.imageUrl = (params.value && params.value !== 'null') ? params.value : "";
  }

}
