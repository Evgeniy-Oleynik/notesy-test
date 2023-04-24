import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';

export function rawHttpClientFactory(handler: HttpHandler) {
  return new HttpClient(handler);
}

export abstract class RawHttpClient extends HttpClient {
}

@NgModule({
  providers: [
    {
      provide: RawHttpClient,
      useFactory: rawHttpClientFactory,
      deps: [HttpBackend],
    },
  ],
})
export class RawHttpClientModule {
}
