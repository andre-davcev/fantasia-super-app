import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models';

const BASE_URL: string = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${BASE_URL}/tasks`);
  }

  public create(task: Task): Observable<Array<Task>> {
    const { id: _, project: __, ...partial } = task;
    return this.http.post<Array<Task>>(`${BASE_URL}/tasks`, partial);
  }

  public update(taskNew: Task): Observable<Array<Task>> {
    return this.http.put<Array<Task>>(
      `${BASE_URL}/tasks/${taskNew.id}`,
      taskNew
    );
  }

  public delete(id: number): Observable<Array<Task>> {
    return this.http.delete<Array<Task>>(`${BASE_URL}/tasks/${id}`);
  }
}
