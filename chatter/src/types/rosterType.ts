export interface RosterType {
  [attendeeId: string]: AttendeeType;
}

export interface AttendeeType {
  id: string;
  externalUserId?: string;
  name?: string;
}
