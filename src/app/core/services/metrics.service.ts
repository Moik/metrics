import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

import { PulseMetricsData } from '../models';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private heartRateCollection = collection(this.firestore, 'heartRate') as CollectionReference<PulseMetricsData>;

  constructor(private firestore: Firestore) {}

  getHeartRateMetrics(): Observable<PulseMetricsData[]> {
    return collectionData<PulseMetricsData>(this.heartRateCollection, { idField: 'id' }).pipe(
      map(data => data.sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()))
    );
  }

  addHeartRateMetrics(data: PulseMetricsData): Promise<DocumentReference<PulseMetricsData>> {
    return addDoc<PulseMetricsData>(this.heartRateCollection, data);
  }

  updateHeartRateMetrics(data: PulseMetricsData): Promise<void> {
    return setDoc<PulseMetricsData>(doc(this.heartRateCollection, data.id), data);
  }
}
