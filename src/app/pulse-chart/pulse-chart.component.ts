import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ChartData } from 'chart.js';
import { format } from 'date-fns';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

import { NgChanges, PulseMetricsData } from '../core/models';

@Component({
  selector: 'app-pulse-chart',
  templateUrl: './pulse-chart.component.html',
  styleUrls: ['./pulse-chart.component.scss'],
  standalone: true,
  imports: [CardModule, ChartModule, CommonModule],
})
export class PulseChartComponent implements OnChanges {
  @Input() pulseMetrics: PulseMetricsData[] = [];
  @Output() selectMetrics = new EventEmitter<PulseMetricsData>();

  chartData!: ChartData;
  options = {
    scales: {
      y: {
        suggestedMin: 0,
      },
    },
  };

  ngOnChanges(changes: NgChanges<PulseChartComponent>): void {
    if (changes.pulseMetrics && this.pulseMetrics) {
      this.chartData = {
        labels: this.pulseMetrics.map(item => format(item.date.toDate(), 'dd MMM, yyyy')),
        datasets: [
          {
            label: 'Max Pulse',
            data: this.pulseMetrics.map(item => item.maxPulse),
            borderColor: '#FF6384',
          },
          {
            label: 'Average Pulse',
            data: this.pulseMetrics.map(item => item.averagePulse),
            borderColor: '#36A2EB',
          },
          {
            label: 'Rest Pulse',
            data: this.pulseMetrics.map(item => item.restPulse),
            borderColor: '#66BB6A',
          },
          {
            label: 'Min Pulse',
            data: this.pulseMetrics.map(item => item.minPulse),
            borderColor: '#FFCE56',
          },
        ],
      };
    }
  }

  onDataSelect(e: { element: { index: number } }): void {
    this.selectMetrics.emit(this.pulseMetrics[e.element.index]);
  }
}
