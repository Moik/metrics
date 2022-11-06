import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';

import { NgChanges, PulseMetricsData, PulseMetricsForm } from '../core/models';

@Component({
  selector: 'app-pulse-form',
  templateUrl: './pulse-form.component.html',
  styleUrls: ['./pulse-form.component.scss'],
  standalone: true,
  imports: [ButtonModule, CalendarModule, CardModule, InputNumberModule, ReactiveFormsModule],
})
export class PulseFormComponent implements OnInit, OnChanges {
  @Input() selectedMetrics: PulseMetricsData | null = null;
  @Output() savePulseMetrics = new EventEmitter<PulseMetricsData>();
  form!: FormGroup<PulseMetricsForm>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group<PulseMetricsForm>({
      id: this.fb.control(''),
      averagePulse: this.fb.control(65, [Validators.required, Validators.min(30), Validators.max(200)]),
      maxPulse: this.fb.control(125, [Validators.required, Validators.min(30), Validators.max(200)]),
      minPulse: this.fb.control(45, [Validators.required, Validators.min(30), Validators.max(200)]),
      restPulse: this.fb.control(60, [Validators.required, Validators.min(30), Validators.max(200)]),
      date: this.fb.control(new Date()),
    });
  }

  ngOnChanges(changes: NgChanges<PulseFormComponent>): void {
    if (changes.selectedMetrics && this.selectedMetrics) {
      this.form.patchValue({ ...this.selectedMetrics, date: this.selectedMetrics.date.toDate() });
    }
  }

  submit(): void {
    const data: PulseMetricsData = {
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.controls.date.value),
    };
    this.savePulseMetrics.emit(data);
  }
}
