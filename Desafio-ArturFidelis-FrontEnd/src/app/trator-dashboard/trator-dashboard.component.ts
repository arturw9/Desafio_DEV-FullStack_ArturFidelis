import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { TratorModel } from './trator.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './trator-dashboard.component.html',
  styleUrls: ['./trator-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formValue!: FormGroup;

  tratorobj: TratorModel = new TratorModel;

  alltrator: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({

      nome:[''],
      marca:[''],
      valor:[''],
      image:['']

    })
    this.AllTrator();
  }

  AddTrator(){


    this.tratorobj.nome = this.formValue.value.nome;
    this.tratorobj.marca = this.formValue.value.marca;
    this.tratorobj.valor = this.formValue.value.valor;
    this.tratorobj.image = this.formValue.value.image;

    this.api.postTrator(this.tratorobj).subscribe({
      next: (v) => {console.log(v)},
      error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Dados salvos")
      this.AllTrator();
      this.formValue.reset();
    } })

  }

  AllTrator(){
    this.api.getTrator().subscribe(res => {
      this.alltrator = res;
    })
  }

  EditTrator(data:any){

    this.formValue.controls['nome'].setValue(data.nome);
    this.formValue.controls['marca'].setValue(data.marca);
    this.formValue.controls['valor'].setValue(data.valor);
    this.tratorobj._id = data._id;
    this.UpdateShowBtn();
  }

  UpdateTrator(){

    this.tratorobj.nome = this.formValue.value.nome;
    this.tratorobj.marca = this.formValue.value.marca;
    this.tratorobj.valor = this.formValue.value.valor;
    this.api.putTrator(this.tratorobj,this.tratorobj._id).subscribe(res => {
      alert("Dados atualizados");
      this.AllTrator();
      this.SaveShowBtn();
    })


  }


  DeleteTrator(data:any){
    this.api.deleteTrator(data._id).subscribe(res => {
      alert("Dados deletados");
      this.AllTrator();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}
