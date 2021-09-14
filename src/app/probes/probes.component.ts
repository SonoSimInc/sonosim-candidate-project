import { Component, OnInit } from '@angular/core';
import { Probe } from '../probe';
import { ProbeService } from '../probe.service';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-probes',
  templateUrl: './probes.component.html',
  styleUrls: ['./probes.component.scss']
})
export class ProbesComponent implements OnInit {
  probes: Probe[] = [];
  modules: any = {};
  modProbeCount: any = [];
  active: number = 0;
  expired: number = 0;

  constructor(private probeService: ProbeService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.getModules();
    this.getProbes();
  }

  // Fetches all probe data
  getProbes(): void {
    this.probeService.getProbes()
      .subscribe(probes => {
        this.probes = probes;
        this.countActives();
        this.countModProbes();
      });
  }

  // Fetches all module data
  getModules(): void {
    this.moduleService.getModules()
      .subscribe(modules => this.mapModules(modules));
  }

  // Maps modules to create key/value pairs of the module ID and name, eg. {1 : "Adrenal Glands"}
  mapModules(mods: any): void {
    for(let mod of mods) {
      this.modules[mod.id] = mod.name;
    }
  }

  // Counts the number of Active probes
  countActives(): void {
    for(let probe of this.probes) {
      if(probe.status === "Active") {
        this.active += 1;
      } 
    }
  }

  // Counts the number of probes per module
  countModProbes(): void {
    let moduleIdsArr: number[] = [];
    let moduleMap: any = {};
    
    // concatenate all moduleIds arrays from all probes
    for(let probe of this.probes) {
      let modules: number[] = probe.moduleIds;
      moduleIdsArr = moduleIdsArr.concat(modules);
    }

    // map module names with probe count
    for(let num of moduleIdsArr) {
      let moduleName: string = this.modules[num];
      moduleMap[moduleName] = ++moduleMap[moduleName] || 1;
    }

    // convert map to an array for easier iteration in the HTML template
    this.modProbeCount = Object.keys(moduleMap).map(key => [key, moduleMap[key]]);
  }

  // If I had more time, I would implement a sorting algorithm to enable the user to sort the probes table by clicking a column heading
  // sortTable(column: string): void {...}

}
