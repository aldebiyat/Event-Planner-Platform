import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { NotFoundException } from '@nestjs/common';

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const mockEventService = {
      create: jest.fn((eventData) => ({
        id: 1,
        ...eventData,
      })),
      findAll: jest.fn(() => [
        { id: 1, title: 'Event 1', date: '2024-11-20', location: 'Location 1' },
      ]),
      findOne: jest.fn((id) => {
        if (id === 1) {
          return { id, title: 'Event 1', date: '2024-11-20', location: 'Location 1' };
        }
        throw new NotFoundException(`Event with ID ${id} not found`);
      }),
      update: jest.fn((id, updateData) => ({
        id,
        ...updateData,
      })),
      delete: jest.fn((id) => {
        if (id !== 1) {
          throw new NotFoundException(`Event with ID ${id} not found`);
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event successfully', () => {
      const eventData = { title: 'New Event', date: '2024-11-25', location: 'New Location' };
      const result = controller.create(eventData);

      expect(result).toEqual({ id: 1, ...eventData });
      expect(service.create).toHaveBeenCalledWith(eventData);
    });
  });

  describe('findAll', () => {
    it('should return all events', () => {
      const result = controller.findAll();

      expect(result).toEqual([
        { id: 1, title: 'Event 1', date: '2024-11-20', location: 'Location 1' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the event with the given ID', () => {
      const result = controller.findOne(1);

      expect(result).toEqual({
        id: 1,
        title: 'Event 1',
        date: '2024-11-20',
        location: 'Location 1',
      });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException for non-existent event', () => {
      expect(() => controller.findOne(99)).toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(99);
    });
  });

  describe('update', () => {
    it('should update an event successfully', () => {
      const updateData = { title: 'Updated Event', location: 'Updated Location' };
      const result = controller.update(1, updateData);

      expect(result).toEqual({ id: 1, ...updateData });
      expect(service.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('delete', () => {
    it('should delete an event successfully', () => {
      controller.delete(1);

      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException for non-existent event', () => {
      expect(() => controller.delete(99)).toThrow(NotFoundException);
      expect(service.delete).toHaveBeenCalledWith(99);
    });
  });
});