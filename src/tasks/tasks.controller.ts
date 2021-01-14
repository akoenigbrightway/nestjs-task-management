import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }

    //     return this.tasksService.getAllTasks();
    // }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // // @Post()
    // // createTask(@Body() body) {
    // //     console.log('body', body);
    // // }

    // // @Post()
    // // createTask(
    // //     @Body('title') title: string,
    // //     @Body('description') description: string
    // // ) {
    // //     return this.tasksService.createTask(title, description);
    // // }

    // // with Dto
    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto) {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Patch('/:id/status')
    // updateTaskStatusById(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    //     ) {
    //         return this.tasksService.patchTaskStatusById(id, status);
    // }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        ): Promise<Task> {
            return this.tasksService.patchTaskStatusById(id, status);
    }
    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): Task[] {
    //     return this.tasksService.deleteTaskById(id);
    // }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.tasksService.deleteTaskById(id);
    }

}
