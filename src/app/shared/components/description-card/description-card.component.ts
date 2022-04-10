import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DescriptionCardComponent {

  private _description!:string;
  toggleText:boolean=false;

  @Input() set description(desc:string|null|undefined){
    let tempDesc = desc;
    if(desc===null || desc === undefined || desc.trim()==""){
      this._description="No data available";
    }
    else{
      this._description = desc.trim();
    }
  }

  get description():string{
    
    return this._description;
  }

  toggleClick(){
    this.toggleText=!this.toggleText;
  }
  
  addSpaces(description:string){
    let spaces:string="";
    if(description.length<150){
      return "&nbsp;".repeat(150 - description.length);
    }
 
  }

}
