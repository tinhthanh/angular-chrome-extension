import { Component, Inject } from '@angular/core';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAB_ID } from '../../../../providers/tab-id.provider';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent {
  message: string;

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  async onClick(): Promise<void> {
    console.log("send"); 
    await bindCallback<string>(chrome.tabs.create.bind(this, { url: `chrome-extension://${chrome.runtime.id}/index.html?#/1Xfa2t7kzAtCpAp9Sf1C`}))()
      .pipe(
        map(msg =>
          chrome.runtime.lastError
            ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
            : msg
        )
      )
      .toPromise();
    this.message = await bindCallback<string>(chrome.tabs.sendMessage.bind(this, this.tabId, {action: "OPENTAB", url: "#/deep/view-code"}))()
      .pipe(
        map(msg =>
          chrome.runtime.lastError
            ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
            : msg
        )
      )
      .toPromise();
  }
}
