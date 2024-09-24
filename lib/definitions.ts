export type Feature = {
  title: string;
  subtext: string;
  images: string[];
};

export interface ILead {
  id: string;
  fullName: string;
  emailAddress: string;
  checkbox: boolean;
  createdAt: Date;
}

export interface IBooking {
  id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  date: Date;
  timeSlot: string;
  callNotes?: string;
  checkbox: boolean;
  createdAt: Date;
}
