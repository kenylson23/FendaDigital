import { type User, type InsertUser, type Contact, type InsertContact, type TuitionCalculation, type InsertTuitionCalculation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createTuitionCalculation(calculation: InsertTuitionCalculation): Promise<TuitionCalculation>;
  getTuitionCalculations(): Promise<TuitionCalculation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private tuitionCalculations: Map<string, TuitionCalculation>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.tuitionCalculations = new Map();
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
}

export const storage = new MemStorage();
