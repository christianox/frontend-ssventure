import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {EventI} from "../../../interfaces/Event";
import * as moment from 'moment';
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  eventList: EventI[] = [];
  eventUserParticipate: any[] = [];
  showForm: boolean = false;
  userSession: any = localStorage.getItem('user');
  loading: boolean = false;

 constructor(private formBuilder: FormBuilder,
             private router: Router,
             private eventService: EventService,
             private confirmationService: ConfirmationService, private messageService: MessageService) {
 }

 ngOnInit() {
   if (this.userSession === null) {
     this.router.navigate(['/']);
   }
   this.userSession = JSON.parse(this.userSession)[0];
   this.onLoadEvents();
   this.initializeForm();
   this.onLoadEventsParticipant();
 }

 onLoadEvents(): void {
   this.eventService.getAllEvent().subscribe((res) => {
     this.eventList = res;
   });
 }

 onLoadEventsParticipant(): void {
   this.eventService.getAllEventParticipant(this.userSession.id).subscribe((res) => {
     this.eventUserParticipate = res;
   })
 }

 initializeForm(event?: any | undefined): void {
   this.form = this.formBuilder.group({
     id: new FormControl(event ? event.id : 0, [Validators.required]),
     eventName: new FormControl(event ? event.eventName : '', [Validators.required]),
     dateOfEvent: new FormControl(event ? event.dateOfEvent : '', [Validators.required]),
     detail: new FormControl(event ? event.detail : '', [Validators.required]),
     isFinish: new FormControl(event ? event.isFinish : 1, [Validators.required]),
     userCreatorId: new FormControl(event ? event.userCreatorId : 0, [Validators.required]),
     participants: new FormControl(event ? event.participants : 0, [Validators.required])
   });
 }

 cleanForm(): void {
   this.form = this.formBuilder.group({
     id: new FormControl(0, [Validators.required]),
     eventName: new FormControl('', [Validators.required]),
     dateOfEvent: new FormControl('', [Validators.required]),
     detail: new FormControl('', [Validators.required]),
     isFinish: new FormControl(1, [Validators.required]),
     userCreatorId: new FormControl(0, [Validators.required]),
     participants: new FormControl(0, [Validators.required])
   });
 }

 openForm() {
   this.initializeForm;
   this.showForm = true;
 }

 closeForm(): void {
   this.showForm = false;
   this.cleanForm();
 }

 submit(): void {
   const formControls = this.form.controls;
   this.loading = true;
   const data = {
     id: formControls['id'].value,
     eventName: formControls['eventName'].value,
     dateOfEvent: (moment(formControls['dateOfEvent'].value)).format('YYYY-MM-DD'),
     detail: formControls['detail'].value,
     isFinish: formControls['isFinish'].value,
     userCreatorId: this.userSession.id
   }

   this.eventService.addEvent(data).subscribe((res) => {
     if (res.message === "Evento registrado") {
       this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
       setTimeout(() => {
         window.location.reload();
         }, 1000);
       this.showForm = false;
     } else {
       alert("Error al registrar evento")
       this.cleanForm();
     }
     this.loading = false;
   });
 }

  confirmDelete(event: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro de querer borrar este evento?',
      header: 'Eliminar evento',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventService.deleteEvent(event.id).subscribe((res) => {
          this.messageService.add({ severity: 'info', summary: 'Confirmacion', detail: 'Evento eliminado' });
          window.location.reload();
        })
      }, reject: () => {
        window.location.reload()
      }
    });
  }

  finishEvent(event: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro de querer finalizar este evento?',
      header: 'Finalizar evento',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventService.finishEvent(event.id).subscribe((res) => {
          this.messageService.add({ severity: 'info', summary: 'Confirmacion', detail: 'Evento finalizado' });
          window.location.reload();
        })
      }, reject: () => {
        window.location.reload()
      }
    });
  }

  confirmSubscribe(event: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro de querer participar en este evento?',
      header: 'Participar en el evento',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const data = {
          eventId: event.id,
          userId: this.userSession.id
        }
        this.eventService.subscribeEvent(data).subscribe((res) => {
          this.messageService.add({ severity: 'info', summary: 'Confirmacion', detail: 'Participacion registrada' });
          window.location.reload();
        })
      }, reject: () => {
        window.location.reload()
      }
    });
  }

  removeSubscribe(event: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro de remover su participacion en este evento?',
      header: 'Remover participacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const data = {
          userId: this.userSession.id
        }
        this.eventService.unSubscribeEvent(data, event.id).subscribe((res) => {
          this.messageService.add({ severity: 'info', summary: 'Confirmacion', detail: 'Participacion removida' });
          window.location.reload();
        })
      }, reject: () => {
        window.location.reload()
      }
    });
  }

  verifyIfExist(event: any): boolean {
   let verify = this.eventUserParticipate.find((x) => x.eventId === event.id);
    return verify !== undefined ? true : false;
  }

  logout() {
   localStorage.removeItem('user');
   this.router.navigate(['/'])
  }
}
