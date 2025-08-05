import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentPortalModal({ isOpen, onClose }: StudentPortalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-angola-blue to-blue-600 p-6 text-white relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="bg-white bg-opacity-20 rounded-full p-3 w-fit mx-auto mb-4"
                    >
                      <GraduationCap size={32} className="text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-center mb-2">Portal do Aluno</h2>
                    <p className="text-blue-100 text-center">Fenda da Tundavala</p>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                  
                  {/* Body */}
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center mb-6"
                    >
                      <div className="bg-china-yellow bg-opacity-10 rounded-full p-4 w-fit mx-auto mb-4">
                        <Settings size={24} className="text-china-yellow mx-auto" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Em Desenvolvimento
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        O Portal do Aluno está sendo desenvolvido com as mais modernas tecnologias 
                        para oferecer a melhor experiência educacional.
                      </p>
                    </motion.div>
                    
                    {/* Features Preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gray-50 rounded-lg p-4 mb-6"
                    >
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        Funcionalidades em breve:
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-angola-blue rounded-full mr-3"></div>
                          Consulta de notas e frequência
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-china-yellow rounded-full mr-3"></div>
                          Calendário acadêmico
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          Comunicação com professores
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          Documentos escolares
                        </li>
                      </ul>
                    </motion.div>
                    
                    {/* Timeline */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-center text-sm text-gray-500 mb-6"
                    >
                      <Clock size={16} className="mr-2" />
                      Previsão de lançamento: Março 2024
                    </motion.div>
                    
                    {/* Action Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button 
                        onClick={onClose}
                        className="w-full bg-angola-blue hover:bg-blue-700 text-white font-semibold py-3"
                      >
                        Entendi, obrigado!
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}