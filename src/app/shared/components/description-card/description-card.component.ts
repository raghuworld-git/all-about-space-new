import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.css']
})
export class DescriptionCardComponent {

  private _description!:string;
  toggleText:boolean=false;

  @Input() set description(desc:string|null|undefined){
    if(desc===null || desc === undefined || desc.trim()==""){
      this._description="No data available";
    }
    else{
      this._description = desc.trim();
    }
  }

  get description():string{
    // if(this._description.length<150){
    //     return this._description+" ".repeat(150-this._description.length)
    // }
    return this._description;
  }

  toggleClick(){
    this.toggleText=!this.toggleText;
  }
  
  // addSpaces(description:string){
  //   let spaces:string="";

  //   if(description.length<150){
  //     return "&nbsp;".repeat(150);
  //   }
  //   else{
  //     return spaces;      
  //   }
  // }

}
