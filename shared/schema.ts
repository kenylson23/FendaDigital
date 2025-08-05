import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tuitionCalculations = pgTable("tuition_calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  educationLevel: text("education_level").notNull(),
  paymentMode: text("payment_mode").notNull(),
  studentCount: integer("student_count").notNull(),
  earlyPayment: integer("early_payment").notNull().default(0), // 0 for false, 1 for true
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const visitAppointments = pgTable("visit_appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  visitDate: timestamp("visit_date").notNull(),
  visitTime: text("visit_time").notNull(),
  visitType: text("visit_type").notNull(), // "facilities", "meeting", "enrollment"
  groupSize: integer("group_size").notNull().default(1),
  specialRequests: text("special_requests"),
  status: text("status").notNull().default("pending"), // "pending", "confirmed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
});

export const insertTuitionCalculationSchema = createInsertSchema(tuitionCalculations).pick({
  educationLevel: true,
  paymentMode: true,
  studentCount: true,
  earlyPayment: true,
  basePrice: true,
  finalAmount: true,
});

export const tuitionRequestSchema = z.object({
  educationLevel: z.string().min(1, "Nível de ensino é obrigatório"),
  paymentMode: z.string().min(1, "Modalidade de pagamento é obrigatória"),
  studentCount: z.number().min(1, "Número de estudantes deve ser pelo menos 1").max(10, "Máximo 10 estudantes"),
  earlyPayment: z.boolean(),
});

export const insertVisitAppointmentSchema = createInsertSchema(visitAppointments).pick({
  name: true,
  email: true,
  phone: true,
  visitDate: true,
  visitTime: true,
  visitType: true,
  groupSize: true,
  specialRequests: true,
});

export const visitAppointmentRequestSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  visitDate: z.string().min(1, "Data da visita é obrigatória"),
  visitTime: z.string().min(1, "Horário da visita é obrigatório"),
  visitType: z.enum(["facilities", "meeting", "enrollment"], {
    errorMap: () => ({ message: "Tipo de visita inválido" })
  }),
  groupSize: z.number().min(1, "Tamanho do grupo deve ser pelo menos 1").max(20, "Máximo 20 pessoas"),
  specialRequests: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertTuitionCalculation = z.infer<typeof insertTuitionCalculationSchema>;
export type TuitionCalculation = typeof tuitionCalculations.$inferSelect;

export type TuitionRequest = z.infer<typeof tuitionRequestSchema>;

export type InsertVisitAppointment = z.infer<typeof insertVisitAppointmentSchema>;
export type VisitAppointment = typeof visitAppointments.$inferSelect;
export type VisitAppointmentRequest = z.infer<typeof visitAppointmentRequestSchema>;

export interface TuitionResult {
  educationLevel: string;
  paymentMode: string;
  studentCount: number;
  earlyPayment: boolean;
  basePrice: number;
  subtotal: number;
  discount: number;
  discountAmount: number;
  finalAmount: number;
  installmentAmount: number;
  paymentFrequency: string;
}
