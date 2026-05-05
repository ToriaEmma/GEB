export type ProjectCategory = 'Audit' | 'Certification' | 'Conseil' | 'Digital';

export interface Project {
    id: string;
    title: string;
    description: string;
    descriptionEn: string;
    client: string;
    category: ProjectCategory;
    image: string;
    link: string;
    date: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 'projet-educbest',
        title: 'EducBest',
        description: 'Développement d\'une plateforme éducative complète pour l\'apprentissage en ligne, offrant des ressources pédagogiques interactives et un suivi personnalisé.',
        descriptionEn: 'Development of a comprehensive educational platform for online learning, offering interactive pedagogical resources and personalized tracking.',
        client: 'EducBest',
        category: 'Digital',
        image: '/images/hero/digital.jpg',
        link: 'https://www.educbest.com/',
        date: '2023',
        featured: true,
    },
    {
        id: 'projet-bestqhse',
        title: 'Best QHSE',
        description: 'Conception et déploiement d\'un portail dédié à la Qualité, Hygiène, Sécurité et Environnement (QHSE), centralisant les normes et les audits.',
        descriptionEn: 'Design and deployment of a portal dedicated to Quality, Health, Safety and Environment (QHSE), centralizing standards and audits.',
        client: 'Best QHSE',
        category: 'Conseil',
        image: '/images/hero/expertise.jpg',
        link: 'https://bestqhse.com/',
        date: '2023',
    },
    {
        id: 'projet-bestmarket',
        title: 'Best Market Bénin',
        description: 'Création d\'une marketplace e-commerce B2C innovante pour le marché béninois, intégrant des solutions de paiement localisées et une gestion logistique avancée.',
        descriptionEn: 'Creation of an innovative B2C e-commerce marketplace for the Beninese market, integrating localized payment solutions and advanced logistics management.',
        client: 'Best Market',
        category: 'Digital',
        image: '/images/home/formation-hero.png',
        link: 'https://bestmarketbenin.com/',
        date: '2024',
        featured: true,
    }
];
