import { IndividualConfig } from 'ngx-toastr';

export const toastrService = {
  success: (
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) => {},
  error: (
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) => {},
};

export function fakeTyping(value: string, inputEl: HTMLInputElement) {
  let result: string = '';
  for (let char of value) {
    let eventMock = createKeyDownEvent(char);
    inputEl.dispatchEvent(eventMock);
    if (eventMock.defaultPrevented) {
      // invalid char
    } else {
      result = result.concat(char);
    }
  }

  inputEl.value = result;
  inputEl.dispatchEvent(new Event('input'));
}

export function createKeyDownEvent(value: string, cancelable = true) {
  return new KeyboardEvent('keydown', { key: value, cancelable });
}
