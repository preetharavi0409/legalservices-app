import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseFilesComponent } from '../case-files/case-files.component';
import { CommunicationDetailsComponent } from '../communication-details/communication-details.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.css']
})
export class AdditionalDetailsComponent implements OnInit {

  @ViewChild(CaseFilesComponent) private caseFilesComponent!: CaseFilesComponent;
  @ViewChild(CommunicationDetailsComponent)
  private communicationDetailsComponent!: CommunicationDetailsComponent;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onTabChanged(event: MatTabChangeEvent) 
  {
    if(event.index == 0)
    {
        this.caseFilesComponent.ngOnInit();
    }
    if(event.index == 1)
    {
        this.communicationDetailsComponent.ngOnInit();
    }
    else {

    }
  }

}
