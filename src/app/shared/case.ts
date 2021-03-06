export class Case {
    _id!: number;
    mcasetype!: string;
    sr_number!: number;
    mcaseno!: string;
    mcaseyr!: string;
    filed_by!: String;
    appearing_for!: string;
    case_filed_on!: Date;
    bata_filed_on!: Date; 
    bata_SR_number!: number;
    corum!: string;
    client_name!: string;
    client_address!: string;
    client_ph!: number;
    client_email!: string;
    records_received_date!: string;
    lower_court_details!: string;   
    referrer_name!: string;
    referrer_email!: string;
    referrer_ph!: number;
    referrer_address!: string;
    case_status!: string;
    result!: string;
    copy_app_interim_date!: Date;
    copy_app_final_date!: Date;
    copy_app_final_type!: string;
    copy_app_final_no!: number;
    copy_app_received!: Date;
    case_progress!: string;
 }