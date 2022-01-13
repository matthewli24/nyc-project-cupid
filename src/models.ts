export interface TimeSlot {
  date: string;
  times: string[];
}

export interface AvailableTimeSlots {
  Manhattan: TimeSlot[];
  Queens: TimeSlot[];
  Bronx: TimeSlot[];
  Brooklyn: TimeSlot[];
  StatenIsland: TimeSlot[];
}

export enum OfficeLocations {
  Manhattan = 'Manhattan Office',
  Queens = 'Queens Office',
  Brooklyn = 'Brooklyn Office',
  Bronx = 'Bronx Office',
  StatenIsland = 'Staten Island Office'
}

export enum Location {
  Manhattan = 'Manhattan',
  Queens = 'Queens',
  Brooklyn = 'Brooklyn',
  Bronx = 'Bronx',
  StatenIsland = 'StatenIsland'
}

export enum LocationIds {
  Manhattan = '0013d000003HJArAAO',
  Queens = '0013d000004T8vDAAS',
  Brooklyn = '0013d000004l890AAA',
  Bronx = '0013d000004T8vFAAS',
  StatenIsland = '0013d000004de23AAA'
}

export type locationType = keyof AvailableTimeSlots;
export type officeType = 'Manhattan Office'
  | 'Queens Office'
  | 'Brooklyn Office'
  | 'Bronx Office'
  | 'Staten Island Office';

export type payload = {[key: string]: string | number | boolean};

interface Slot {
  startDateTime: string;
  startTime: number;
  timeAriaLabel: string;
  timeLabel: string;
}

export interface DayTimeSlots  {
  dateAriaLabel: string,
  dateGroupName: string,
  dateHeader: string,
  slots: Slot[]
}

interface OutterReturnValue {
  returnValue: InnerReturnValue;
  cacheable: boolean;
}

interface InnerReturnValue {
  weekHeader: string;
  daySlotsColumns: DayTimeSlots[]
  maxDate: string,
  disableNext: boolean,
  disablePrevious: boolean,
  selectedDate: string,
  nextAvailableDate: string,
  minDate: string,
  noSlotsAvailable: boolean
}

interface Action {
  id: string;
  state: string;
  returnValue: OutterReturnValue;
  error: string[]
}

interface Context {
  mode: string;
  app: string;
  contextPath: string;
  pathPrefix: string;
  fwuid: string;
  mlr: number;
  loaded: object;
  globalValueProviders: object[];
  enableAccessChecks: boolean;
  apce: number;
  dns: string;
  ls: number;
  lv: string;
  mna: object;
  arse: number;
  acaf: number;
  services: string[];
}

interface PerfSummary {
  version: string;
  request: number;
  actions: object;
  actionsTotal: number;
  overhead: number;
}

export interface MarriageCeremonyResponse {
  actions: Action[];
  context: Context;
  perfSummary: PerfSummary;
}
