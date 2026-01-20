import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgZone } from '@angular/core';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { AppModule } from './app/app.module';

const lifecycles = singleSpaAngular({
  bootstrapFunction: () => {
    return platformBrowserDynamic(getSingleSpaExtraProviders())
      .bootstrapModule(AppModule);
  },
  template: '<app-root />',
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
