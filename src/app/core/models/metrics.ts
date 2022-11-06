import { FormControl } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';

export interface PulseMetrics {
  averagePulse: number;
  maxPulse: number;
  minPulse: number;
  restPulse: number;
}

export interface PulseMetricsData extends PulseMetrics {
  date: Timestamp;
  id: string;
}

export interface PulseMetricsForm {
  averagePulse: FormControl<number>;
  maxPulse: FormControl<number>;
  minPulse: FormControl<number>;
  restPulse: FormControl<number>;
  date: FormControl<Date>;
  id: FormControl<string>;
}
