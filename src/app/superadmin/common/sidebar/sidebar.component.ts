import { Component } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["../../../common.css", "./sidebar.component.css"],
})
export class SidebarComponent {
  wcList: any = [
    {
      name: "WC 1",
      mccList: [
        { name: "MCC 1" },
        { name: "MCC 2" },
        { name: "MCC 3" },
        { name: "MCC 4" },
        { name: "MCC 5" },
      ],
    },
    {
      name: "WC 2",
      mccList: [
        { name: "MCC 1" },
        { name: "MCC 2" },
        { name: "MCC 3" },
        { name: "MCC 4" },
        { name: "MCC 5" },
      ],
    },
    {
      name: "WC 3",
      mccList: [
        { name: "MCC 1" },
        { name: "MCC 2" },
        { name: "MCC 3" },
        { name: "MCC 4" },
        { name: "MCC 5" },
      ],
    },
    {
      name: "WC 4",
      mccList: [
        { name: "MCC 1" },
        { name: "MCC 2" },
        { name: "MCC 3" },
        { name: "MCC 4" },
        { name: "MCC 5" },
      ],
    },
    {
      name: "WC 5",
      mccList: [
        { name: "MCC 1" },
        { name: "MCC 2" },
        { name: "MCC 3" },
        { name: "MCC 4" },
        { name: "MCC 5" },
      ],
    },
  ];
}
