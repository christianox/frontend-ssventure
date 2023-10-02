// @ts-ignore
import { EventI } from './Event';

export interface EventI {
  id: number;
  eventName: string;
  dateOfEvent: Date;
  detail: string;
  isFinish: number;
  userCreatorId : number;
  participants: number;
}

export class Event implements EventI {
  id: number;
  eventName: string;
  dateOfEvent: Date;
  detail: string;
  isFinish: number;
  participants: number;
  userCreatorId : number;

  constructor();
  constructor(obj: any);

  constructor(obj?: any) {
    this.id = obj?.id ? obj.id : 0;
    this.eventName = obj?.eventName ? obj.eventName : '';
    this.dateOfEvent = obj?.dateOfEvent ? obj.dateOfEvent : '';
    this.detail = obj?.detail ? obj.detail : '';
    this.isFinish = obj?.isFinish ? obj.isFinish : 1;
    this.userCreatorId = obj?.userCreatorId ? obj.userCreatorId : 0;
    this.participants = obj?.participants ? obj.participants : 0;
  }
}
