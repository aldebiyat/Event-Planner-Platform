import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() eventData: CreateEventDto): Event {
    return this.eventService.create(eventData);
  }

  @Get()
  findAll(): Event[] {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Event {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: Partial<Event>,
  ): Event {
    return this.eventService.update(id, updatedData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): void {
    this.eventService.delete(id);
  }
}