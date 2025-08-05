import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/language-context";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.localizacao'),
      content: ["Fenda da Tundavala, Huíla", "Angola"],
      color: "bg-china-yellow"
    },
    {
      icon: Phone,
      title: t('contact.telefone'),
      content: ["+244 123 456 789", "+244 987 654 321"],
      color: "bg-china-yellow"
    },
    {
      icon: Mail,
      title: t('contact.email'),
      content: ["info@fendatundavala.edu.ao", "admissoes@fendatundavala.edu.ao"],
      color: "bg-china-yellow"
    },
    {
      icon: Clock,
      title: t('contact.horario'),
      content: [t('contact.horario_desc'), t('contact.sabado')],
      color: "bg-china-yellow"
    }
  ];

  const subjectOptions = [
    { value: "admissao", label: t('contact.admissao') },
    { value: "informacoes", label: t('contact.informacoes') },
    { value: "intercambio", label: t('contact.intercambio') },
    { value: "outro", label: t('contact.outro') }
  ];

  return (
    <section id="contact" className="py-20 bg-angola-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-blue-200">
            {t('contact.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className={`${info.color} p-3 rounded-lg`}>
                    <info.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    {info.content.map((line, i) => (
                      <p key={i} className="text-blue-200">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t('contact.nome')} *</Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t('contact.email')} *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t('contact.telefone')}</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t('contact.assunto')} *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">{t('contact.mensagem')} *</Label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-angola-blue hover:bg-blue-700"
                size="lg"
              >
                {contactMutation.isPending ? "Enviando..." : t('contact.enviar')}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
