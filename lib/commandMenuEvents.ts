export const OPEN_COMMAND_MENU_EVENT = "open-command-menu";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU_EVENT));
}
