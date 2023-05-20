import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['../../common.css', './popups.component.css']
})
export class PopupsComponent {

  pitWorkingCondition() {
    Swal.fire({
      title: '',
      text: "Your pit is working condition",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#16C665',
      cancelButtonColor: '#FF4B00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }

  pitUnderMaintenanceCondition() {
    Swal.fire({
      title: '',
      text: "Your pit is under maintenance condition",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#16C665',
      cancelButtonColor: '#FF4B00',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      input: 'text',
      inputLabel: 'Remarks',
      inputPlaceholder: 'Your Remarks',
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }

  pitFilled() {
    Swal.fire({
      title: '',
      text: "Your pit is filled?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16C665',
      cancelButtonColor: '#FF4B00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }
  
  pitReFill() {
    Swal.fire({
      title: '',
      text: "Would you like to refill this pit?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16C665',
      cancelButtonColor: '#FF4B00',
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }
  
  pitTurnMixture() {
    Swal.fire({
      title: '',
      text: "You have to again turn your pit mixture within 21-22 days for decompose.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16C665',
      cancelButtonColor: '#FF4B00',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }

}
