import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PulseMetricsData } from '../core/models';
import { MetricsService } from '../core/services';
import { PulseChartComponent } from '../pulse-chart/pulse-chart.component';
import { PulseFormComponent } from '../pulse-form/pulse-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, PulseChartComponent, PulseFormComponent],
})
export class DashboardComponent implements OnInit {
  pulseMetrics!: Observable<PulseMetricsData[]>;
  selectedMetrics: PulseMetricsData | null = null;

  constructor(private metrics: MetricsService) {}

  ngOnInit(): void {
    this.pulseMetrics = this.metrics.getHeartRateMetrics();
  }

  savePulseMetrics(data: PulseMetricsData): void {
    data.id ? this.metrics.updateHeartRateMetrics(data) : this.metrics.addHeartRateMetrics(data);
  }

  selectMetrics(data: PulseMetricsData): void {
    this.selectedMetrics = data;
  }
}
