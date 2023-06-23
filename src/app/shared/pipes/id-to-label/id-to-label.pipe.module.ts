import { NgModule } from '@angular/core';

import { IdToLabelPipe } from './id-to-label.pipe';

@NgModule({
  declarations: [IdToLabelPipe],
  exports: [IdToLabelPipe]
})

export class IdToLabelPipeModule {}
