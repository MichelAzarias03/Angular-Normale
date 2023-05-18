import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Abonne } from 'src/app/models/abonne.model';
import { AbonneService } from 'src/app/sercices/abonne.service';

@Component({
  selector: 'app-abonne-list',
  templateUrl: './abonne-list.component.html',
  styleUrls: ['./abonne-list.component.scss']
})
export class AbonneListComponent implements OnInit {
  abonne!:Abonne;
  abonnes$!:Observable<Abonne[]>
  constructor(private abonneService:AbonneService, private router:Router){}

  ngOnInit(): void {
    this.abonnes$=this.abonneService.get()
  }
  onPreDelete(abonne:Abonne){
    this.abonne=abonne
  }
  onDelete(){
    this.abonneService.delete(this.abonne).subscribe(response=>{
    this.abonnes$=this.abonneService.get()
    },
    error=>console.log(error),
    ()=>document.getElementById("close-modal")?.click(),
    )
  }
  onUpdate(id:number|undefined){
    this.router.navigateByUrl(`/abonnes/${id}/update`);
  }
}
