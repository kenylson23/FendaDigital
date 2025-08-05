import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { visitAppointmentRequestSchema, type VisitAppointmentRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

const visitTypes = {
  facilities: "Tour pelas Instalações",
  meeting: "Reunião com a Direção",
  enrollment: "Processo de Matrícula"
};

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00"
];

export default function VisitScheduler() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<VisitAppointmentRequest>({
    resolver: zodResolver(visitAppointmentRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      visitDate: "",
      visitTime: "",
      visitType: "facilities",
      groupSize: 1,
      specialRequests: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: VisitAppointmentRequest) => {
      const response = await fetch("/api/visit-appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao agendar visita");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/visit-appointments"] });
      setIsSubmitted(true);
      toast({
        title: "Visita Agendada!",
        description: "Sua solicitação foi recebida. Entraremos em contato em breve para confirmar.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao Agendar",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: VisitAppointmentRequest) => {
    mutation.mutate(data);
  };

  // Get tomorrow's date as minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl text-green-700 dark:text-green-400">
            Agendamento Confirmado!
          </CardTitle>
          <CardDescription className="text-lg">
            Recebemos sua solicitação de visita. Nossa equipe entrará em contato em até 24 horas para confirmar os detalhes.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-4"
          >
            Agendar Nova Visita
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Agende sua Visita</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Conheça nossa escola pessoalmente. Oferecemos tours pelas instalações, 
          reuniões com a direção e orientação sobre o processo de matrícula.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Informações da Visita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold">Horários Disponíveis</h4>
                <p className="text-sm text-muted-foreground">
                  Segunda a Sexta: 08:00 às 17:00
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold">Duração</h4>
                <p className="text-sm text-muted-foreground">
                  Tours: ~45 minutos | Reuniões: ~30 minutos
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold">Grupos</h4>
                <p className="text-sm text-muted-foreground">
                  Até 20 pessoas por visita
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Tipos de Visita:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Tour pelas Instalações:</strong> Conheça nossas salas, laboratórios e áreas de convivência</li>
                <li>• <strong>Reunião com a Direção:</strong> Tire dúvidas sobre nossos programas educacionais</li>
                <li>• <strong>Processo de Matrícula:</strong> Orientação completa sobre inscrições</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formulário de Agendamento</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para solicitar sua visita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Seu nome completo" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="seu@email.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+244 xxx xxx xxx" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="visitDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data da Visita *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date" 
                            min={minDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visitTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="visitType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Visita *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(visitTypes).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Pessoas *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          min={1} 
                          max={20}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solicitações Especiais</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Alguma necessidade especial ou informação adicional..."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Agendando..." : "Agendar Visita"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}