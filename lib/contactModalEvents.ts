export const OPEN_CONTACT_MODAL_EVENT = "open-contact-modal";

export function openContactModal() {
  window.dispatchEvent(new Event(OPEN_CONTACT_MODAL_EVENT));
}
