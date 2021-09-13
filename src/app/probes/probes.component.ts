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

  getProbes(): void {
    this.probeService.getProbes()
      .subscribe(probes => this.probes = probes);
  }

  getModules(): void {
    this.moduleService.getModules()
      .subscribe(modules => modules.forEach(module => {
        this.modules[module.id] = module.name;
      }));
  }

}
