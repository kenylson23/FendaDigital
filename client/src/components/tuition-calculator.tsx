import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/language-context";
import { Calculator, Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type TuitionResult } from "@shared/schema";

export default function TuitionCalculator() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    educationLevel: "",
    paymentMode: "mensal",
    studentCount: 1,
    earlyPayment: false
  });
  
  const [result, setResult] = useState<TuitionResult | null>(null);
  const { toast } = useToast();

  const calculateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/calculate-tuition", data);
      return response.json();
    },
    onSuccess: (data: TuitionResult) => {
      setResult(data);
      toast({
        title: "Cálculo realizado com sucesso!",
        description: "Confira os valores abaixo.",
      });
    },
    onError: () => {
      toast({
        title: "Erro no cálculo",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleCalculate = () => {
    if (!formData.educationLevel) {
      toast({
        title: "Dados incompletos",
        description: "Selecione o nível de ensino.",
        variant: "destructive",
      });
      return;
    }
    
    calculateMutation.mutate(formData);
  };

  const levelOptions = [
    { value: "primario", label: "Ensino Primário", price: "25.000 Kz" },
    { value: "secundario", label: "Ensino Secundário", price: "35.000 Kz" },
    { value: "intercambio", label: "Programa de Intercâmbio", price: "50.000 Kz" }
  ];

  const paymentOptions = [
    { value: "mensal", label: "Pagamento Mensal", discount: "0%" },
    { value: "trimestral", label: "Pagamento Trimestral", discount: "-5%" },
    { value: "semestral", label: "Pagamento Semestral", discount: "-10%" },
    { value: "anual", label: "Pagamento Anual", discount: "-15%" }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(value).replace('AOA', 'Kz');
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('tuition.title')}</h2>
          <p className="text-xl text-gray-600">
            {t('tuition.subtitle')}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Nível de Ensino</Label>
                <Select 
                  value={formData.educationLevel} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, educationLevel: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} - {option.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Modalidade de Pagamento</Label>
                <Select 
                  value={formData.paymentMode} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMode: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} ({option.discount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Número de Estudantes</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.studentCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentCount: parseInt(e.target.value) || 1 }))}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="early-payment"
                  checked={formData.earlyPayment}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, earlyPayment: !!checked }))}
                />
                <Label htmlFor="early-payment" className="text-sm text-gray-700">
                  Pagamento antecipado (desconto adicional de 5%)
                </Label>
              </div>
              
              <Button 
                onClick={handleCalculate}
                disabled={calculateMutation.isPending}
                className="w-full bg-angola-blue hover:bg-blue-700"
                size="lg"
              >
                <Calculator className="mr-2" size={20} />
                {calculateMutation.isPending ? "Calculando..." : "Calcular Mensalidade"}
              </Button>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Resumo do Cálculo</h3>
                
                {!result ? (
                  <div className="text-center text-gray-500 py-8">
                    <Calculator className="mx-auto mb-4" size={48} />
                    <p>Preencha os campos para ver o cálculo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nível de Ensino:</span>
                      <span className="font-semibold">
                        {levelOptions.find(l => l.value === result.educationLevel)?.label}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Número de Estudantes:</span>
                      <span className="font-semibold">{result.studentCount}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">{formatCurrency(result.subtotal)}</span>
                    </div>
                    
                    {result.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto ({result.discount}%):</span>
                        <span>-{formatCurrency(result.discountAmount)}</span>
                      </div>
                    )}
                    
                    <hr className="border-gray-200" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">
                        Valor {paymentOptions.find(p => p.value === result.paymentMode)?.label.split(' ')[1]}:
                      </span>
                      <span className="text-2xl font-bold text-angola-blue">
                        {formatCurrency(result.installmentAmount)}
                      </span>
                    </div>
                  </div>
                )}
                
                {result && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1" size="sm">
                        <Save className="mr-2" size={16} />
                        Salvar
                      </Button>
                      <Button variant="outline" className="flex-1 bg-china-yellow hover:bg-yellow-600" size="sm">
                        <Printer className="mr-2" size={16} />
                        Imprimir
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
