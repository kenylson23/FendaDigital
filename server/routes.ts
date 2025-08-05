import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, tuitionRequestSchema, visitAppointmentRequestSchema, type TuitionResult } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      } else {
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  });

  // Get all contacts
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Tuition calculation
  app.post("/api/calculate-tuition", async (req, res) => {
    try {
      const validatedData = tuitionRequestSchema.parse(req.body);
      
      // Tuition prices (in Kwanza)
      const basePrices = {
        "primario": 25000,
        "secundario": 35000,
        "intercambio": 50000
      };

      // Payment mode discounts
      const paymentDiscounts = {
        "mensal": 0,
        "trimestral": 5,
        "semestral": 10,
        "anual": 15
      };

      // Payment frequency multipliers
      const paymentMultipliers = {
        "mensal": 1,
        "trimestral": 3,
        "semestral": 6,
        "anual": 12
      };

      const basePrice = basePrices[validatedData.educationLevel as keyof typeof basePrices];
      if (!basePrice) {
        return res.status(400).json({ error: "Nível de ensino inválido" });
      }

      const paymentDiscount = paymentDiscounts[validatedData.paymentMode as keyof typeof paymentDiscounts];
      if (paymentDiscount === undefined) {
        return res.status(400).json({ error: "Modalidade de pagamento inválida" });
      }

      const subtotal = basePrice * validatedData.studentCount;
      const earlyPaymentDiscount = validatedData.earlyPayment ? 5 : 0;
      const totalDiscount = paymentDiscount + earlyPaymentDiscount;
      const discountAmount = (subtotal * totalDiscount) / 100;
      const finalAmount = subtotal - discountAmount;
      
      const paymentMultiplier = paymentMultipliers[validatedData.paymentMode as keyof typeof paymentMultipliers];
      const installmentAmount = finalAmount * paymentMultiplier;

      const result: TuitionResult = {
        educationLevel: validatedData.educationLevel,
        paymentMode: validatedData.paymentMode,
        studentCount: validatedData.studentCount,
        earlyPayment: validatedData.earlyPayment,
        basePrice,
        subtotal,
        discount: totalDiscount,
        discountAmount,
        finalAmount,
        installmentAmount,
        paymentFrequency: validatedData.paymentMode
      };

      // Save calculation to storage
      await storage.createTuitionCalculation({
        educationLevel: validatedData.educationLevel,
        paymentMode: validatedData.paymentMode,
        studentCount: validatedData.studentCount,
        earlyPayment: validatedData.earlyPayment ? 1 : 0,
        basePrice: basePrice.toString(),
        finalAmount: installmentAmount.toString()
      });

      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      } else {
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  });

  // Visit appointment booking
  app.post("/api/visit-appointments", async (req, res) => {
    try {
      const validatedData = visitAppointmentRequestSchema.parse(req.body);
      
      // Convert date string to timestamp
      const visitDateTime = new Date(`${validatedData.visitDate} ${validatedData.visitTime}`);
      
      // Check if the appointment is in the future
      if (visitDateTime <= new Date()) {
        return res.status(400).json({ error: "A data da visita deve ser no futuro" });
      }

      // Check if it's during business hours (8:00-17:00, Monday-Friday)
      const dayOfWeek = visitDateTime.getDay();
      const hour = visitDateTime.getHours();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return res.status(400).json({ error: "Visitas disponíveis apenas de segunda a sexta-feira" });
      }
      
      if (hour < 8 || hour >= 17) {
        return res.status(400).json({ error: "Horário de visitas: 08:00 às 17:00" });
      }

      const appointment = await storage.createVisitAppointment({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        visitDate: visitDateTime,
        visitTime: validatedData.visitTime,
        visitType: validatedData.visitType,
        groupSize: validatedData.groupSize,
        specialRequests: validatedData.specialRequests,
      });

      res.json({ success: true, appointment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      } else {
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  });

  // Get all visit appointments
  app.get("/api/visit-appointments", async (req, res) => {
    try {
      const appointments = await storage.getVisitAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Get single visit appointment
  app.get("/api/visit-appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.getVisitAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Update visit appointment status
  app.patch("/api/visit-appointments/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!["pending", "confirmed", "cancelled"].includes(status)) {
        return res.status(400).json({ error: "Status inválido" });
      }

      const appointment = await storage.updateVisitAppointmentStatus(req.params.id, status);
      if (!appointment) {
        return res.status(404).json({ error: "Agendamento não encontrado" });
      }

      res.json({ success: true, appointment });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
