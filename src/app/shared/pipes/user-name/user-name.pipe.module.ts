import { NgModule } from '@angular/core';

import { UserNamePipe } from './user-name.pipe';

@NgModule({
  declarations: [UserNamePipe],
  exports: [UserNamePipe]
})

export class UserNamePipeModule {}
