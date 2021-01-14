import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const {status, search} = filterDto;

    //     let resultTasks = this.getAllTasks();

    //     if (status) {
    //         resultTasks = resultTasks.filter(task => task.status == status);
    //     }

    //     if (search) {
    //         resultTasks = resultTasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //             );
    //     }

    //     return resultTasks;

    // }

    // getTaskById(id: string): Task {
    //    const result = this.tasks.find(task => task.id === id);

    //    if (!result) {
    //        throw new NotFoundException('Trying again, nerd.');
    //    }

    //    return result;
    // }

    async getTaskById(id: number): Promise<Task> {
        const result = await this.taskRepository.findOne(id);
       
        if (!result) {
           throw new NotFoundException('Trying again, nerd.');
        }

        return result;
    }

    // createTask(CreateTaskDto: CreateTaskDto): Task {
    //     const {title, description} = CreateTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }

    //     this.tasks.push(task);
    //     return task;
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        // //with entity
        // const task = new Task();
        // const {title, description} = createTaskDto;
        // task.title = title;
        // task.description = description;
        // task.status = TaskStatus.OPEN;
        // await task.save();

        // return task;

        return this.taskRepository.createTask(createTaskDto);
    }

    // patchTaskStatusById(id: string, status: TaskStatus): Task {
    //     let task = this.getTaskById(id);
    //     task.status = status;

    //     return task;
    // }
    async patchTaskStatusById(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task;
    }

    // deleteTaskById(id: string): Task[] {
    //     const result = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);

    //     return this.tasks;
    // }

    async deleteTaskById(id: number): Promise<DeleteResult> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Task not found');
        }

        return result;
    }
}
