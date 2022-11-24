import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrMessageService {
  constructor(private toastr: ToastrService) {}

  //Todo toastr succes method oluşturuldu.
  success(message: string, title: string) {
    this.toastr.success(message, title);
  }

  //Todo toastr error method oluşturuldu.
  error(message: string, title: string) {
    this.toastr.error(message, title);
  }
  //Todo toastr info method oluşturuldu.
  info(message: string, title: string) {
    this.toastr.info(message, title);
  }
}
