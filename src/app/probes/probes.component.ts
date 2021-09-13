import { Component, OnInit } from '@angular/core';
import { Probe } from '../probe';
import { ProbeService } from '../probe.service';

@Component({
  selector: 'app-probes',
  templateUrl: './probes.component.html',
  styleUrls: ['./probes.component.scss']
})
export class ProbesComponent implements OnInit {
  probes: Probe[] = [];

  constructor(private probeService: ProbeService) { }

  ngOnInit(): void {
    this.getProbes();
  }

  getProbes(): void {
    this.probeService.getProbes()
      .subscribe(probes => this.probes = probes);
  }

}
