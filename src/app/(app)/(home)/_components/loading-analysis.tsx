import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";

import { cn } from "@/utils/cn";

import groovyAnimation from "./_assets/groovy.json";

export function LoadingAnalysis({ isLoading = true, isFinished = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);

  const loadingTexts = [
    "Lendo XML...",
    "Extraindo dados...",
    "Gerando análise da IA...",
    "Processando informações...",
    "Finalizando...",
  ];

  useEffect(() => {
    if (!isLoading || isFinished) return;

    const timer = setInterval(() => {
      setPreviousIndex(currentIndex);

      // Verifica se chegou no último item e impede que continue
      setCurrentIndex((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer); // Para o intervalo
          return prev; // Mantém no último item
        }
      });
    }, 4200);

    return () => clearInterval(timer);
  }, [isLoading, currentIndex, isFinished]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-slate-900 rounded-lg flex flex-col items-center justify-center p-6 pt-10 pb-12">
        <div className="w-32 h-auto">
          <Lottie animationData={groovyAnimation} loop={true} autoPlay={true} />
        </div>

        <div className="relative w-full h-24 mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {loadingTexts.map((text, index) => {
              const isCurrentText = index === currentIndex;
              const isPreviousText = index === previousIndex;

              if (!isCurrentText && !isPreviousText) return null;

              return (
                <motion.div
                  key={`${text}-${index}`}
                  className="absolute w-full text-center font-medium left-0 flex items-center justify-center"
                  initial={
                    isCurrentText ? { y: 40, opacity: 0 } : { y: 0, opacity: 1 }
                  }
                  animate={
                    isCurrentText
                      ? { y: 0, opacity: 1, scale: 1.2 }
                      : { y: -40, opacity: 0.3, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <span
                    className={cn(
                      "transition-all duration-500 ease-in-out",
                      isCurrentText
                        ? "text-lg font-bold text-primary"
                        : "text-base text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
