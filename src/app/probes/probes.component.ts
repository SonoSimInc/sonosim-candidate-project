import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as moduleNames from "../../assets/modules.json";

@Component({
  selector: 'app-probes',
  templateUrl: './probes.component.html',
  styleUrls: ['./probes.component.scss']
})

export class ProbesComponent implements OnInit {
	title = 'Probes';
	probes: any = [];
	moduleNames: any;
    constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(){
  	this.httpClient.get("assets/probes.json").subscribe(data =>{
      this.probes = data;
      var count = Object.keys(data).length; //total number of probes
	  console.log(count);
      })
      this.moduleNames = moduleNames;
      console.log(moduleNames);
  }
}
