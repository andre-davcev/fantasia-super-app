
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Task } from '../../../models';
import { TaskService } from '../../../services';
import { FormType } from '../shared';
import { TaskFormSubmit } from './enums';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnChanges {
  public taskForm: FormGroup;

  @Input() public taskCurrent!: Task;
  @Input() public formType!: FormType;
  @Output() public closePanel: EventEmitter<TaskFormSubmit> =
    new EventEmitter<TaskFormSubmit>();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      id: [0],
      project: [0],
    });
  }

  public get title(): string {
    return this.formType === FormType.Create ? 'Add new task' : 'Update task';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskCurrent']?.currentValue) {
      const task: Task = changes['taskCurrent'].currentValue;

      const dueDate: string = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

      this.taskForm.patchValue({
        ...task,
        dueDate,
      });
    }
  }

  public handleSubmit(): void {
    if (this.taskForm.valid) {
      const taskNew: Task = {
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate),

        completed:
          this.formType === FormType.Update
            ? this.taskForm.value.completed
            : false,
      };

      const operation$: Observable<Array<Task>> =
        this.formType === FormType.Create
          ? this.taskService.create(taskNew)
          : this.taskService.update(taskNew);

      operation$.subscribe(() => this.closePanel.emit(TaskFormSubmit.Submit));
    }
  }

  public handleCancel(): void {
    this.closePanel.emit(TaskFormSubmit.Cancel);
  }
}
