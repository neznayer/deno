import { resetDB } from "./reset-db.ts";

let timer: any;

export function periodicallyResetDB(timeout: number): void {
  if (!timer) {
    timer = setInterval(resetDB, timeout);
  }
}

export function stopResettingDB() {
  if (timer) {
    clearInterval(timer);
  }
}
