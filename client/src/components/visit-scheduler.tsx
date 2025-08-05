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
import { Calendar, Clock, Users, MapPin, CheckCircle, Building, GraduationCap, BookOpen, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-xl">
          <CardHeader className="text-center pb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
                Agendamento Confirmado!
              </CardTitle>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-china-yellow" />
                <span className="text-china-yellow font-semibold">Sucesso</span>
                <Sparkles className="h-5 w-5 text-china-yellow" />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CardDescription className="text-lg text-green-600 dark:text-green-300">
                Recebemos sua solicitação de visita. Nossa equipe entrará em contato em até 24 horas para confirmar os detalhes.
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">Próximos passos:</p>
                <ul className="text-sm space-y-1 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-angola-blue rounded-full"></div>
                    Confirmação por email ou telefone
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-angola-blue rounded-full"></div>
                    Preparação dos materiais informativos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-angola-blue rounded-full"></div>
                    Agendamento definitivo da visita
                  </li>
                </ul>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
              >
                Agendar Nova Visita
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="bg-gradient-to-r from-angola-blue via-blue-600 to-china-yellow p-6 md:p-8 rounded-2xl shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 sm:h-8 w-6 sm:w-8" />
                <h2 className="text-2xl sm:text-4xl font-bold">Agende sua Visita</h2>
                <Building className="h-6 sm:h-8 w-6 sm:w-8" />
              </div>
            </div>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
              Conheça nossa escola pessoalmente e descubra como conectamos Angola e China através da educação de excelência
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6">
              <div className="flex items-center gap-2 text-china-yellow">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold">Educação Premium</span>
              </div>
              <div className="flex items-center gap-2 text-china-yellow">
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold">Intercâmbio Cultural</span>
              </div>
              <div className="flex items-center gap-2 text-china-yellow">
                <BookOpen className="h-5 w-5" />
                <span className="font-semibold">Programas Únicos</span>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-angola-blue rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                Informações da Visita
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Horários Disponíveis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Segunda a Sexta: 08:00 às 17:00
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Duração</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Tours: ~45 minutos | Reuniões: ~30 minutos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Grupos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Até 20 pessoas por visita
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-china-yellow" />
                  Tipos de Visita:
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
                    <Building className="h-5 w-5 text-angola-blue mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Tour pelas Instalações:</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Conheça nossas salas, laboratórios e áreas de convivência
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Reunião com a Direção:</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Tire dúvidas sobre nossos programas educacionais
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg">
                    <BookOpen className="h-5 w-5 text-china-yellow mt-0.5" />
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Processo de Matrícula:</strong>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Orientação completa sobre inscrições
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="h-full bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-china-yellow rounded-lg">
                  <Calendar className="h-6 w-6 text-gray-900" />
                </div>
                Formulário de Agendamento
              </CardTitle>
              <CardDescription className="text-base">
                Preencha os dados abaixo para solicitar sua visita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  className="w-full bg-gradient-to-r from-angola-blue to-china-yellow text-white font-semibold py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl" 
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Agendando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Agendar Visita
                    </div>
                  )}
                </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}