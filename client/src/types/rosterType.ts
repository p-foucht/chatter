export interface RosterType {
  [attendeeId: string]: AttendeeType;
}

export interface AttendeeType {
  id: string;
  name: string;
  externalUserId?: string;
}
