import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { NgxLoader } from 'ngx-http-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSM';
  constructor(private elementRef: ElementRef,  public  _router: Router) { }
  public loader = NgxLoader;
  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "./assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
