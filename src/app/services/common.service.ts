import { Injectable, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private sanitizer: DomSanitizer) {}

  sidebarToggle = false;

  activeStep = signal<any>({});
  stepConfig = signal<any>({});

  //Below are the signals and methods for toast

  toastArr = signal<any[]>([]);

  setToastArray(
    data: any,
    type:
      | 'success'
      | 'save'
      | 'generic'
      | 'delete'
      | 'error'
      | 'notification'
      | 'warning'
      | 'processing'
  ): void {
    let item: any = {
      type: type,
      timestamp: Date.now(),
      toastData: data,
    };
    const arr1 = this.toastArr();
    arr1.push(item);
    this.toastArr.set(arr1);

    setTimeout(() => {
      const arr = this.toastArr();
      let ind = arr.findIndex((itm: any) => itm.timestamp == item.timestamp);
      if (ind >= 0) arr.splice(ind, 1);
      this.toastArr.set(arr);
    }, 10000);
  }

  removeToastItem(timestamp: any): void {
    const arr = this.toastArr();
    let ind = arr.findIndex((itm: any) => itm.timestamp == timestamp);
    if (ind >= 0) arr.splice(ind, 1);
    this.toastArr.set(arr);
  }

  /**
   * @description method to move wizard to next step
   * @author Himmat
   * @param none
   * @returns void
   */
  nextStep(wizardId: string): void {
    let step = this.activeStep()?.[wizardId];
    this.stepConfig.update((config: any) => {
      let stepConfig = config?.[wizardId];
      if (step < stepConfig.length) {
        stepConfig[step - 1].state = 'done';
        stepConfig[step].state = 'active';
        step++;
        return config;
      } else {
        stepConfig[stepConfig.length - 1].state = 'active';
        step = stepConfig.length;
        return config;
      }
    });
    this.activeStep.update((obj: any) => {
      obj[wizardId] = step;
      return obj;
    });
  }

  /**
   * @description method to move wizard to prev step
   * @author Himmat
   * @param none
   * @returns void
   */
  previousStep(wizardId: string): void {
    let step = this.activeStep()?.[wizardId];
    this.stepConfig.update((config: any) => {
      let stepConfig = config?.[wizardId];
      if (step > 1) {
        stepConfig[step - 1].state = 'normal';
        stepConfig[step - 2].state = 'active';
        step--;
        return config;
      }
      stepConfig[0].state = 'active';
      step = 1;
      return config;
    });
    this.activeStep.update((obj: any) => {
      obj[wizardId] = step;
      return obj;
    });
  }

  /**
   * @description method to move wizard to any step
   * @author Himmat
   * @param none
   * @returns void
   */
  gotoStep(step: number, wizardId: string): void {
    this.stepConfig.update((config) => {
      let stepConfig = config?.[wizardId];

      if (step > 0 && step <= stepConfig?.length) {
        stepConfig = stepConfig.map((stepData: any, index: number) => {
          if (index < step - 1) {
            return { ...stepData, state: 'done' };
          } else if (index == step - 1) {
            return { ...stepData, state: 'active' };
          }
          return stepData;
        });
        config[wizardId] = stepConfig;
        this.activeStep.update((obj: any) => {
          obj[wizardId] = step;
          return obj;
        });
      }
      return config;
    });
  }

  getImageFromBase64(base64string: string): any {
    if (base64string) {
      const fullBase64String = `data:${base64string};base64,${base64string}`;
      return this.sanitizer.bypassSecurityTrustUrl(fullBase64String);
    }
  }
}
