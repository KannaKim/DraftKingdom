import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: "<p class=\"{{foo | replace:'a':'lol'}}\">sdasdasdsd</p>",
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  foo = "abcdefg"
  constructor() { }
  
  ngOnInit(): void {
  }

}
