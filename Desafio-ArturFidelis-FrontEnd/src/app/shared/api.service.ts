import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  // Post Method For Add Student
  postTrator(data:any)
  {
    return this._http.post<any>("http://localhost:3000/trator",data).pipe(map((res:any)=> {
      return res
    }))
  }

    // Get Method For All Student
    getTrator()
    {
      return this._http.get<any>("http://localhost:3000/trator").pipe(map((res:any)=> {
        return res
      }))
    }

      // Put Method For Update Student
  putTrator(data:any, _id:number)
  {
    return this._http.put<any>("http://localhost:3000/trator/" + _id,data).pipe(map((res:any)=> {
      return res
    }))
  }

  // Delete Method For Update Student
  deleteTrator(_id:number)
  {
    return this._http.delete<any>("http://localhost:3000/trator/" + _id).pipe(map((res:any)=> {
      return res
    }))
  }

}
