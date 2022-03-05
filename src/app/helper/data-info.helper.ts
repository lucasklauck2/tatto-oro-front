import { BehaviorSubject, Observable } from 'rxjs';
import { DataInfoDTO } from 'src/app/model/data-info.dto';
export class DataInfoHelper {
  static dataInfoSubject = new BehaviorSubject<DataInfoDTO>(null);

  static adquirirObservableAlteracoes(): Observable<DataInfoDTO> {
    return this.dataInfoSubject.asObservable();
  }

  static emitirDataInfoAlterado(dataInfo: DataInfoDTO) {
    this.dataInfoSubject.next(dataInfo);
  }
}
