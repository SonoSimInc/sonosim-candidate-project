import { Component, OnInit } from '@angular/core';
import { Probe } from '../probe';
import { Module } from '../module';
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

  constructor(private probeService: ProbeService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.getModules();
    this.getProbes();
  }

  // Fetches all probe data
  getProbes(): void {
    this.probeService.getProbes()
      .subscribe(probes => this.probes = probes);
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

}
