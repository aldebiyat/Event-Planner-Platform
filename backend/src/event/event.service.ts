import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class EventService {
  private events: Event[] = [];
  private idCounter = 1;

  constructor(private readonly userService: UserService) {}

  create(eventData: CreateEventDto): Event {
    const newEvent: Event = {
      id: this.idCounter++,
      ...eventData,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): Event[] {
    return this.events;
  }

  findOne(id: number): Event {
    const event = this.events.find((e) => e.id === id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  update(id: number, updatedData: Partial<Event>): Event {
    const event = this.findOne(id);
    Object.assign(event, updatedData);
    return event;
  }

  delete(id: number): void {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    this.events.splice(index, 1);
  }
}