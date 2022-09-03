import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { ServerSourceConf } from 'ng2-smart-table/lib/lib/data-source/server/server-source.conf';
import { Observable, Subject } from 'rxjs';

export class CustomServerDataSource extends ServerDataSource {
  constructor(http: HttpClient, conf?: ServerSourceConf | {}) {
    super(http, conf);
  }

  protected onUpdateStartedSource = new Subject<any>();
  protected emitOnUpdateStarted(element: any) {
    this.onUpdateStartedSource.next(element);
  }
  onUpdateStarted(): Observable<any> {
    return this.onUpdateStartedSource.asObservable();
  }

  getElements(): Promise<any> {
    const element = super.getElements();
    this.emitOnUpdateStarted(element);
    return element;
  }
}
