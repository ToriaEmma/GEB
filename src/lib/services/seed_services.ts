import { serviceService } from './services';

const initialServices = [
  {
    title: "Audit & Diagnostic",
    description_fr: "Évaluation rigoureuse de vos systèmes pour garantir la conformité et identifier les leviers d'amélioration.",
    description_en: "Rigorous evaluation of your systems to ensure compliance and identify levers for improvement.",
    icon: "ShieldCheck",
    category: "Audit",
    order_index: 1
  },
  {
    title: "Accompagnement Certification",
    description_fr: "Un parcours structuré de l'audit initial jusqu'à l'obtention de votre certification internationale.",
    description_en: "A structured journey from the initial audit to obtaining your international certification.",
    icon: "CheckCircle",
    category: "Certification",
    order_index: 2
  },
  {
    title: "Conseil & Stratégie",
    description_fr: "Optimisation de vos processus et déploiement de stratégies pour une croissance durable.",
    description_en: "Optimization of your processes and deployment of strategies for sustainable growth.",
    icon: "ChartLineUp",
    category: "Conseil",
    order_index: 3
  },
  {
    title: "Solutions Digitales",
    description_fr: "Transformation numérique et outils intelligents pour piloter votre performance en temps réel.",
    description_en: "Digital transformation and intelligent tools to pilot your performance in real time.",
    icon: "Cube",
    category: "Digital",
    order_index: 4
  }
];

export const seedServices = async () => {
  try {
    for (const service of initialServices) {
      await serviceService.create(service);
    }
    console.log("Services seeded successfully!");
  } catch (err) {
    console.error("Error seeding services:", err);
  }
};
