import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';

describe('EventService', () => {
  let service: EventService;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockUserService = {
      findOne: jest.fn((id) => {
        if (id === 1) {
          return { id, email: 'test@example.com', username: 'Test User' };
        }
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an event successfully with a userEmail', () => {
    const eventData = {
      title: 'Event with Email',
      date: '2024-11-20',
      location: 'Test Location',
      description: 'Event Description',
      userEmail: 'test@example.com',
    };

    const createdEvent = service.create(eventData);

    expect(createdEvent).toEqual({
      id: 1,
      ...eventData,
    });
    expect(service.findAll()).toContainEqual(createdEvent);
  });

  it('should create an event successfully with all mandatory fields', () => {
    const eventData = {
      title: 'Mandatory Fields Event',
      date: '2024-11-21',
      location: 'Test Location',
    };

    const createdEvent = service.create(eventData);

    expect(createdEvent).toEqual({
      id: 1,
      ...eventData,
    });
    expect(service.findAll()).toContainEqual(createdEvent);
  });

  it('should update an event successfully', () => {
    const eventData = {
      title: 'Initial Event',
      date: '2024-11-22',
      location: 'Initial Location',
    };

    const createdEvent = service.create(eventData);

    const updatedData = { title: 'Updated Event', location: 'Updated Location' };
    const updatedEvent = service.update(createdEvent.id, updatedData);

    expect(updatedEvent).toEqual({
      ...createdEvent,
      ...updatedData, // Overwrite with updated fields
    });
    expect(service.findOne(createdEvent.id)).toEqual(updatedEvent);
  });

  it('should select an event successfully by ID', () => {
      const eventData = {
        title: 'Event to Select',
        date: '2024-11-23',
        location: 'Select Location',
      };
  
      const createdEvent = service.create(eventData);
  
      const foundEvent = service.findOne(createdEvent.id);
  
      expect(foundEvent).toEqual(createdEvent);
  });
  
  it('should throw NotFoundException when selecting a non-existent event', () => {
    expect(() => service.findOne(99)).toThrow(NotFoundException);
  });
});