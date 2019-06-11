import { Component, OnInit } from '@angular/core'
import { SettingService } from '../services/service.index'

declare function init_plugins()

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(_ajustes: SettingService) {}

  ngOnInit() {
    init_plugins()
  }
}
