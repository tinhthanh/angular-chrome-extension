import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { first } from 'rxjs/operators';
import { MDomainService, MDomain } from '../../services/manager-script/m-domain.service';
import { MScriptService, MScript } from '../../services/manager-script/m-script.service';

@Component({
  selector: 'app-view-code',
  templateUrl: './view-code.component.html',
  styleUrls: ['./view-code.component.scss']
})
export class ViewCodeComponent implements OnInit {
  isCompare = false;
  isCollapsed = false;
  size: NzButtonSize = 'default';
  editorOptions = { theme: 'vs-dark', language: 'javascript', roundedSelection: true, autoIndent: "full", fontSize: 13 };
  originalCode;
  isVisibleAddDomain = false;
  isVisibleAddActionType = false;
  inputValue: string = '';
  menu: Menu[] = [];
  domainSelected: Menu;
  actionTypeSelected: MScript;
  constructor(private mDomainService: MDomainService, private mSriptService: MScriptService) { }

  ngOnInit(): void {
    this.mDomainService.getAll().subscribe(k => {
      const b = this.groupBy(k, (pre) => pre.domain);
      this.menu = Object.keys(b).map(z => { return { domain: z, actionType: b[z] } }) as Menu[];
    })
  }
  groupBy(list, by: (pre) => string) {
    return list.reduce((cur, pre) => { cur[by(pre)] = [...(cur[by(pre)] || []), pre]; return cur; }, {})
  }

  showModalAddDomain(): void {
    this.isVisibleAddDomain = true;
  }
  openCode(data: MDomain) {
    const temp = this.mSriptService.getListByCondition((ref) => ref.where('domain', '==', data.domain).where('actionType', '==', data.actionType)).subscribe(z => {
      this.actionTypeSelected = z[0] || undefined;
      this.originalCode = this.actionTypeSelected.code;
      temp.unsubscribe();
    })
  }
  saveCode() {
    this.mSriptService.add(this.actionTypeSelected, this.actionTypeSelected.id);
    this.originalCode = this.actionTypeSelected.code;
    alert("Saved done");
  }

  handleOkAddDomain(): void {
    console.log('Button ok clicked!');
    this.mSriptService.add({ domain: this.inputValue, actionType: 'MAIN', lastUpdateTime: new Date(), code: '' });
    this.mDomainService.add({ domain: this.inputValue, actionType: 'MAIN', lastUpdateTime: new Date() })
      .then(k => {
        this.inputValue = '';
      })
    this.isVisibleAddDomain = false;
  }

  handleCancelAddDomain(): void {
    this.isVisibleAddDomain = false;
  }

  showModalActionType(item: Menu): void {
    this.domainSelected = item;
    this.isVisibleAddActionType = true;
  }

  handleOkActionType(): void {
    this.mSriptService.add({ domain: this.domainSelected.domain, actionType: this.inputValue.toUpperCase(), lastUpdateTime: new Date(), code: '' });
    this.mDomainService.add({ domain: this.domainSelected.domain, actionType: this.inputValue.toUpperCase(), lastUpdateTime: new Date() })
      .then(k => {
        this.inputValue = '';
      })
    this.isVisibleAddActionType = false;
  }

  handleCancelActionType(): void {
    this.isVisibleAddActionType = false;
  }
  deleteAction(actionType) {
    const r = confirm("Do you want remove this action!");
    if (r == true) {
      const temp = this.mSriptService.getListByCondition((ref) => ref.where('domain', '==', actionType.domain).where('actionType', '==', actionType.actionType)).subscribe(z => {
        z.forEach(z => this.mSriptService.delete(z));
        this.mDomainService.delete(actionType);
        this.actionTypeSelected = undefined;
        this.originalCode = undefined;
        temp.unsubscribe();
      });
    }

  }

}
class Menu {
  domain: string; actionType: MDomain[]
}