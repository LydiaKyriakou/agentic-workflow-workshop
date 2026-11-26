import type { Session } from "./session";

export interface Speaker {
  name: string;
  sessions: Pick<Session, "id" | "title" | "startTime">[];
}
