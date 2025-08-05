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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertTuitionCalculation = z.infer<typeof insertTuitionCalculationSchema>;
export type TuitionCalculation = typeof tuitionCalculations.$inferSelect;

export type TuitionRequest = z.infer<typeof tuitionRequestSchema>;

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
