import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDetailComponent, TasksListComponent } from '@labdat/task/components';
import { AuthenticationGuardService } from '@labdat/authentication';
import { taskConfiguration } from './task.configuration';
import { isEmpty } from 'lodash';
import { TaskGuardService } from './services/task.guard.service';

const tasksRoutes: Routes = [{
  path: 'list',
  component: TasksListComponent,
  data: {
    page: 'list'
  }
},{
  path: ':id',
  component: TaskDetailComponent,
  data: {
    page: 'detail'
  }
}, {
  path: '**',
  redirectTo: 'list'
}];
/*
if (!isEmpty(taskConfiguration.self.roles)) {
  Object.assign(tasksRoutes[0], {
    data: {
      expectedRoles: taskConfiguration.self.roles
    }
  });
}
*/
@NgModule({
  imports: [
    RouterModule.forChild(tasksRoutes)
  ]
})
export class TaskRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootTaskRoutingModule,
      providers: [ TaskGuardService ]
    }
  }
}

@NgModule()
export class RootTaskRoutingModule {}
