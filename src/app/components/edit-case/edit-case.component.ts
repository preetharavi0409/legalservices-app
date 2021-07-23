/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})
export class EditCaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

} */
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.css']
})

export class EditCaseComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList: any;
  @ViewChild('resetCaseForm', { static: true }) myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  caseForm!: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = ['A', 'B', 'C', 'D', 'E'];
  statusArray: any = ['Active', 'Disposed'];
  progressArray: any =['Admission','Adjourned Admission','Notice of Motion','Final Hearing','For Orders'];
  appearingArray : any =['Petitioner','Respondent','Applicant','Plaintiff','Defendent'];
  resultArray : any =['Allowed','Dismissed'];
  typeArray : any =['A','APPL.','APPLN','CMA','CMA(MD)','CMP','CMP(MD)','CMSA','CMSA(MD)','CRP','CRP(MD)','CRP NPD(MD)','CRP PD(MD)','CRP NPD','CRP PD', 'CS','CMA NPD','CMA PD','COM APEL','COMP.A','CP','CONT A','CONT A(MD)','CONT APP','CONT P','CONT P(MD)','CONT(MD)','CRL A','CRL A(MD)','CRL MP','CRL MP(MD)','CRL OP','CRL OP(MD)','CRL REF','CRL RC','CRL RC(MD)','CLMP(MD)','CLOP(MD)','CROS.OBJ','CROS.OBJ(MD)','ELP','EP','AS','HCMP','HCMP(MD)','HCP','HCP(MD)','IA','IC','IN','IP','LTS','LPA','LPA(MD)','MC(MD)','MC','MP','MP(MD)','OA','OMS','OP','OSA','RCMP','RCP','RC','RT','RT(MD)','REVW(MD)','REV.(MD)','REV.APLC(MD)','REV.APCR(MD)','REV.APPL(MD)','REV.APLC','REV.APPL','REV.APLW','REV.W(MD)','REV.APLW(MD)','REV.STP','REV.STP(MD)','SA','SA(MD)','STA','STP','SUB A','SUB APPL','SCMP','SCP','TCA', 'TCA(MD)',
  'TC(MD)','TCP','TCP(MD)','TC','TCMP','TCMP(MD)','TOS','TMA','TMA(MD)','TMSA','TMSA(MD)','TR APPL','TR CMA','TR CMP','TRCS','TR AS','VCMP','WVMP','WA(MD)','WAMP','WAMP(MD)','WP(MD)','WPMP','WPMP(MD)','WA','WMP','WMP(MD)','WP','WVMP(MD)' ];
  selectedProgress: string | undefined;
  selectedResult: string | undefined;
  selectedAppearing: string | undefined;
  selectedStatus: string | undefined;
  selectedType: string | undefined;

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private caseApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this. caseApi.GetCase(id).subscribe(data => {
      this.subjectArray = data.subjects;
      this.caseForm = this.fb.group({
        sr_number: [data.sr_number,[Validators.required]],
        mcasetype: [data.mcasetype,[Validators.required]],
        mcaseno: [data.mcaseno,[Validators.required]],
        mcaseyr: [data.mcaseyr,[Validators.required]],
        filed_by: [data.filed_by,[Validators.required]],
        appearing_for: [data.appearing_for,[Validators.required]],
        case_filed_on: [data.case_filed_on],
        bata_filed_on: [data.bata_filed_on], 
        bata_SR_number: [data.bata_SR_number],
        corum: [data.corum],
        client_name: [data.client_name,[Validators.required]],
        client_address: [data.client_address],
        client_ph: [data.client_ph],
        client_email: [data.client_email],
        records_received_date: [data.records_received_date],
        lower_court_details: [data.lower_court_details],   
        referrer_name: [data.referrer_name],
        referrer_email: [data.referrer_email],
        referrer_ph: [data.referrer_ph],
        referrer_address: [data.referrer_address],
        case_status: [data.case_status],
        result: [data.result],
        copy_app_interim_date: [data.copy_app_interim_date],
        copy_app_final_date: [data.copy_app_final_date],
        copy_app_final_type: [data.copy_app_final_type],
        copy_app_final_no: [data.copy_app_final_no],
        copy_app_received: [data.copy_app_received],
        case_progress: [data.case_progress,[Validators.required]]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.caseForm = this.fb.group({
      sr_number: ['',[Validators.required]],
      mcasetype: ['',[Validators.required]],
      mcaseno: ['',[Validators.required]],
      mcaseyr: ['',[Validators.required]],
      filed_by: ['',[Validators.required]],
      appearing_for: ['',[Validators.required]],
      case_filed_on: [''],
      bata_filed_on: [''], 
      bata_SR_number: [''],
      corum: [''],
      client_name: ['',[Validators.required]],
      client_address: [''],
      client_ph: [''],
      client_email: [''],
      records_received_date: [''],
      lower_court_details: [''],   
      referrer_name: [''],
      referrer_email: [''],
      referrer_ph: [''],
      referrer_address: [''],
      case_status: [''],
      result: [''],
      copy_app_interim_date: [''],
      copy_app_final_date: [''],
      copy_app_final_type: [''],
      copy_app_final_no: [''],
      copy_app_received: [''],
      case_progress: ['',[Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add lanage
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
   /* this.caseForm.get('dob').setValue(convertDate, {
      onlyself: true
    }) */
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.caseForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateCaseForm() {
    console.log(this.caseForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this. caseApi. UpdateCase(id, this.caseForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/case/cases-list'))
      });
    }
  }
  
}