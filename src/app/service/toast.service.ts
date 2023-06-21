import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastConfig: any = {
    timeOut: 3000
  }

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string): void {
    this.toastr.success(message, '', this.toastConfig);
  }

  showInfo(message: string): void {
    this.toastr.info(message, '', this.toastConfig);
  }

  showWarning(message: string): void {
    this.toastr.warning(message, '', this.toastConfig);
  }

  showError(message: string): void {
    this.toastr.error(message, '', this.toastConfig);
  }
}
