import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { IntegrationService } from './integration.service';
import * as IntegrationActions from './integration.actions';

@Injectable()
export class IntegrationEffects {

  @Effect()
  fetchIntegrations$: Observable<Action> = this.actions$
    .ofType(IntegrationActions.FETCH_INTEGRATIONS)
    .mergeMap(() =>
      this.integrationService
        .fetch()
        .map(response => ({ type: IntegrationActions.FETCH_INTEGRATIONS_COMPLETE, payload: response }))
        .catch(error => Observable.of({
          type: IntegrationActions.FETCH_INTEGRATIONS_FAIL,
          payload: error
        }))
    );

  constructor(
    private actions$: Actions,
    private integrationService: IntegrationService
  ) { }
}
