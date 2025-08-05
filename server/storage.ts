import { type User, type InsertUser, type Contact, type InsertContact, type TuitionCalculation, type InsertTuitionCalculation, type VisitAppointment, type InsertVisitAppointment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createTuitionCalculation(calculation: InsertTuitionCalculation): Promise<TuitionCalculation>;
  getTuitionCalculations(): Promise<TuitionCalculation[]>;
  
  createVisitAppointment(appointment: InsertVisitAppointment): Promise<VisitAppointment>;
  getVisitAppointments(): Promise<VisitAppointment[]>;
  getVisitAppointment(id: string): Promise<VisitAppointment | undefined>;
  updateVisitAppointmentStatus(id: string, status: string): Promise<VisitAppointment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private tuitionCalculations: Map<string, TuitionCalculation>;
  private visitAppointments: Map<string, VisitAppointment>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.tuitionCalculations = new Map();
    this.visitAppointments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      phone: insertContact.phone || null,
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createTuitionCalculation(insertCalculation: InsertTuitionCalculation): Promise<TuitionCalculation> {
    const id = randomUUID();
    const calculation: TuitionCalculation = { 
      ...insertCalculation, 
      id,
      earlyPayment: insertCalculation.earlyPayment || 0,
      createdAt: new Date()
    };
    this.tuitionCalculations.set(id, calculation);
    return calculation;
  }

  async getTuitionCalculations(): Promise<TuitionCalculation[]> {
    return Array.from(this.tuitionCalculations.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createVisitAppointment(insertAppointment: InsertVisitAppointment): Promise<VisitAppointment> {
    const id = randomUUID();
    const appointment: VisitAppointment = { 
      ...insertAppointment, 
      id,
      phone: insertAppointment.phone || null,
      specialRequests: insertAppointment.specialRequests || null,
      groupSize: insertAppointment.groupSize || 1,
      status: "pending",
      createdAt: new Date()
    };
    this.visitAppointments.set(id, appointment);
    return appointment;
  }

  async getVisitAppointments(): Promise<VisitAppointment[]> {
    return Array.from(this.visitAppointments.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getVisitAppointment(id: string): Promise<VisitAppointment | undefined> {
    return this.visitAppointments.get(id);
  }

  async updateVisitAppointmentStatus(id: string, status: string): Promise<VisitAppointment | undefined> {
    const appointment = this.visitAppointments.get(id);
    if (appointment) {
      const updatedAppointment = { ...appointment, status };
      this.visitAppointments.set(id, updatedAppointment);
      return updatedAppointment;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
