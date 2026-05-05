export type Category = 'Normes ISO' | 'Audit' | 'Certification' | 'Conseil' | 'Digital';

export interface Article {
    slug: string;
    title: string;
    titleEn: string;
    excerpt: string;
    excerptEn: string;
    content: string;
    contentEn: string;
    date: string;
    category: Category;
    image: string;
    author: string;
    readTime: number;
    likes: number;
    featured?: boolean;
}

export const articles: Article[] = [
    {
        slug: 'comprendre-iso-9001-2024',
        title: 'Comprendre les nouvelles exigences ISO 9001 : ce qui change en 2024',
        titleEn: 'Understanding the New ISO 9001 Requirements: What Changes in 2024',
        excerpt: 'La révision des normes ISO 9001 introduit des changements majeurs pour les organisations. Découvrez comment anticiper ces évolutions et maintenir votre certification.',
        excerptEn: 'The revision of ISO 9001 standards introduces major changes for organizations. Discover how to anticipate these evolutions and maintain your certification.',
        content: `
## Introduction

La norme ISO 9001 est la référence mondiale en matière de systèmes de management de la qualité (SMQ). Depuis sa dernière révision en 2015, le monde professionnel a connu des transformations majeures : digitalisation accélérée, nouvelles attentes des parties prenantes, enjeux de durabilité.

## Les principaux changements attendus

### 1. Intégration renforcée du contexte organisationnel

Les nouvelles directives insistent sur la nécessité pour les organisations de **comprendre profondément leur environnement** — aussi bien interne qu'externe. Il ne s'agit plus seulement d'identifier les risques, mais d'intégrer une veille stratégique continue.

### 2. Approche par les données et la performance

Le pilotage par indicateurs devient central. Les organisations devront démontrer que leurs décisions sont **basées sur des données probantes** et que les systèmes de mesure sont fiables et pertinents.

### 3. Durabilité et responsabilité élargie

L'ISO introduit progressivement des notions liées au développement durable et à la responsabilité sociétale. Les entreprises certifiées devront prouver leur engagement au-delà de la seule satisfaction client.

## Que faire dès maintenant ?

1. **Réaliser un audit à blanc** pour identifier les écarts avec les nouvelles exigences
2. **Former vos équipes** aux nouveaux concepts et outils
3. **Mettre à jour votre documentation** du SMQ
4. **Planifier une revue de direction** orientée vers les nouvelles exigences

## Conclusion

Anticiper est la clé. Les organisations qui intègrent ces évolutions en amont bénéficieront d'un avantage concurrentiel significatif et éviteront les écueils lors des audits de renouvellement.

> **BEG Team vous accompagne** dans l'analyse de vos systèmes existants et la mise en conformité avec les nouvelles versions des normes ISO.
        `,
        contentEn: `
## Introduction

ISO 9001 is the world's benchmark for quality management systems (QMS). Since its last revision in 2015, the professional world has undergone major transformations: accelerated digitalization, new stakeholder expectations, sustainability issues.

## Main Expected Changes

### 1. Reinforced Integration of Organizational Context

The new guidelines insist on the need for organizations to **deeply understand their environment** — both internal and external. It is no longer just about identifying risks, but integrating continuous strategic monitoring.

### 2. Data and Performance-Driven Approach

Indicator-based steering becomes central. Organizations will have to demonstrate that their decisions are **based on hard evidence** and that measurement systems are reliable and relevant.

### 3. Sustainability and Expanded Responsibility

ISO is gradually introducing concepts related to sustainable development and corporate social responsibility. Certified companies will have to prove their commitment beyond just customer satisfaction.

## What to Do Now?

1. **Conduct a gap analysis** to identify deviations from the new requirements
2. **Train your teams** on new concepts and tools
3. **Update your QMS documentation**
4. **Schedule a management review** focused on the new requirements

## Conclusion

Anticipating is key. Organizations that integrate these evolutions early on will benefit from a significant competitive advantage and avoid pitfalls during renewal audits.

> **BEG Team accompanies you** in analyzing your existing systems and complying with the new versions of ISO standards.
        `,
        date: '2024-03-15',
        category: 'Normes ISO',
        image: '/images/home/hero-team.png',
        author: 'Équipe BEG',
        readTime: 6,
        likes: 34,
        featured: true,
    },
    {
        slug: 'audit-interne-pme-guide-pratique',
        title: 'Audit interne pour les PME : guide pratique en 5 étapes',
        titleEn: 'Internal Audit for SMEs: A Practical 5-Step Guide',
        excerpt: 'L\'audit interne est souvent perçu comme une contrainte. Découvrez comment le transformer en véritable outil de performance pour votre PME.',
        excerptEn: 'Internal audit is often perceived as a constraint. Discover how to transform it into a true performance tool for your SME.',
        content: `
## Pourquoi l'audit interne est essentiel pour les PME ?

Contrairement aux idées reçues, l'audit interne n'est pas réservé aux grandes entreprises. Pour une PME, c'est un outil puissant pour **identifier les dysfonctionnements, réduire les risques et améliorer l'efficacité opérationnelle**.

## Les 5 étapes d'un audit interne réussi

### Étape 1 : Planification

Définissez le périmètre de l'audit, les processus à évaluer et les critères de conformité applicables. Un plan d'audit documenté est indispensable.

### Étape 2 : Préparation des outils

Créez vos listes de vérification (checklists) basées sur les référentiels normatifs applicables à votre secteur d'activité.

### Étape 3 : Réalisation de l'audit terrain

Menez des entretiens avec les responsables de processus, observez les pratiques réelles et collectez les preuves documentaires.

### Étape 4 : Rédaction du rapport

Documentez les constats (conformités, non-conformités, points sensibles) de manière objective et factuelle.

### Étape 5 : Suivi des actions correctives

L'audit n'a de valeur que si les non-conformités donnent lieu à des actions correctives documentées et suivies dans le temps.

## Ressources recommandées

- Guide ISO 19011 sur les lignes directrices pour l'audit des systèmes de management
- Modèles de checklists sectorielles disponibles sur demande
        `,
        contentEn: `
## Why is internal audit essential for SMEs?

Contrary to popular belief, internal audit is not reserved for large companies. For an SME, it is a powerful tool to **identify dysfunctions, reduce risks and improve operational efficiency**.

## The 5 steps of a successful internal audit

### Step 1: Planning

Define the scope of the audit, the processes to be evaluated and the applicable compliance criteria. A documented audit plan is essential.

### Step 2: Tool Preparation

Create your checklists based on the normative frameworks applicable to your sector of activity.

### Step 3: Carrying out the field audit

Conduct interviews with process owners, observe real practices and collect documentary evidence.

### Step 4: Writing the report

Document the findings (compliances, non-compliances, sensitive points) in an objective and factual manner.

### Step 5: Follow-up of corrective actions

The audit only has value if the non-compliances lead to documented corrective actions followed over time.

## Recommended Resources

- ISO 19011 Guide on guidelines for auditing management systems
- Sectoral checklist templates available on request
        `,
        date: '2024-02-28',
        category: 'Audit',
        image: '/images/home/hero-team.png',
        author: 'Équipe BEG',
        readTime: 5,
        likes: 21,
    },
    {
        slug: 'certification-iso-14001-environnement',
        title: 'ISO 14001 : pourquoi la certification environnementale est un atout stratégique',
        titleEn: 'ISO 14001: Why Environmental Certification is a Strategic Asset',
        excerpt: 'Face aux nouvelles exigences réglementaires et à la pression des clients, la certification ISO 14001 devient un différenciateur clé pour les entreprises ouest-africaines.',
        excerptEn: 'Faced with new regulatory requirements and customer pressure, ISO 14001 certification is becoming a key differentiator for West African companies.',
        content: `
## L'environnement au cœur des stratégies d'entreprise

En Afrique de l'Ouest, la pression réglementaire et les exigences des donneurs d'ordres internationaux poussent de plus en plus d'entreprises à s'engager dans une démarche de management environnemental structurée.

## Qu'est-ce que l'ISO 14001 ?

La norme ISO 14001 définit les exigences relatives à un **système de management environnemental (SME)**. Elle aide les organisations à améliorer leurs performances environnementales grâce à une utilisation plus efficace des ressources et à la réduction des déchets.

## Les bénéfices concrets

### Pour la compétitivité
- Accès à de nouveaux marchés internationaux
- Réponse aux appels d'offres exigeant une certification environnementale
- Valorisation de l'image de marque

### Pour les opérations
- Réduction des coûts énergétiques et de gestion des déchets
- Anticipation des risques environnementaux et réglementaires
- Amélioration de la relation avec les parties prenantes locales

## Comment se lancer ?

1. Diagnostic environnemental initial
2. Formation des équipes au management environnemental
3. Mise en place du SME
4. Audit de certification par un organisme accrédité
        `,
        contentEn: `
## Environment at the heart of business strategies

In West Africa, regulatory pressure and the requirements of international prime contractors are pushing more and more companies to engage in a structured environmental management approach.

## What is ISO 14001?

ISO 14001 defines the requirements for an **environmental management system (EMS)**. It helps organizations improve their environmental performance through more efficient use of resources and waste reduction.

## Concrete benefits

### For competitiveness
- Access to new international markets
- Response to tenders requiring environmental certification
- Enhancement of brand image

### For operations
- Reduction of energy and waste management costs
- Anticipation of environmental and regulatory risks
- Improvement of the relationship with local stakeholders

## How to get started?

1. Initial environmental diagnosis
2. Training of teams in environmental management
3. Implementation of the EMS
4. Certification audit by an accredited body
        `,
        date: '2024-01-20',
        category: 'Certification',
        image: '/images/home/hero-team.png',
        author: 'Équipe BEG',
        readTime: 7,
        likes: 47,
    },
    {
        slug: 'digitalisation-processus-qualite',
        title: 'Digitalisation des processus qualité : outils et meilleures pratiques',
        titleEn: 'Digitalization of Quality Processes: Tools and Best Practices',
        excerpt: 'La transformation numérique des systèmes de management qualité ouvre de nouvelles opportunités. Panorama des outils disponibles et des pièges à éviter.',
        excerptEn: 'The digital transformation of quality management systems opens up new opportunities. Overview of available tools and pitfalls to avoid.',
        content: `
## La digitalisation au service de la qualité

La gestion documentaire papier, les tableaux de bord Excel et les audits sur formulaires imprimés appartiennent progressivement au passé. Les outils numériques transforment profondément la manière dont les organisations pilotent leur système de management.

## Les catégories d'outils à connaître

### QHSE Software (Logiciels QHSE)
Des plateformes comme IsoTracker, Qualio ou Axelor QMS permettent de centraliser toute la documentation qualité, de gérer les non-conformités et de suivre les actions correctives en temps réel.

### Outils de collecte mobile
Les applications mobiles permettent aux auditeurs de renseigner leurs constats directement sur le terrain, avec photos et signatures électroniques à l'appui.

### Tableaux de bord intelligents
Les outils de Business Intelligence (Power BI, Tableau) permettent de visualiser les indicateurs de performance qualité et d'identifier les tendances rapidement.

## Les pièges à éviter

- **L'outil avant le processus** : digitaliser un processus mal défini ne fait qu'accélérer le désordre
- **La complexité excessive** : choisir des outils trop complexes pour l'équipe en place
- **La négligence de la formation** : tout outil nécessite une formation et un accompagnement au changement

## Notre recommandation

Commencez par un état des lieux de vos processus actuels avant de choisir un outil. La technologie doit servir votre stratégie qualité, pas l'inverse.
        `,
        contentEn: `
## Digitalization in the service of quality

Paper document management, Excel dashboards and audits on printed forms are gradually becoming a thing of the past. Digital tools are profoundly transforming the way organizations manage their management system.

## Tool categories to know

### QHSE Software
Platforms like IsoTracker, Qualio or Axelor QMS centralize all quality documentation, manage non-compliances and track corrective actions in real time.

### Mobile collection tools
Mobile applications allow auditors to record their findings directly in the field, with supporting photos and electronic signatures.

### Intelligent dashboards
Business Intelligence tools (Power BI, Tableau) visualize quality performance indicators and identify trends quickly.

## Pitfalls to avoid

- **The tool before the process**: digitalizing an ill-defined process only accelerates disorder
- **Excessive complexity**: choosing tools that are too complex for the current team
- **Neglect of training**: every tool requires training and change management

## Our recommendation

Start with an assessment of your current processes before choosing a tool. Technology should serve your quality strategy, not the other way around.
        `,
        date: '2024-01-05',
        category: 'Digital',
        image: '/images/home/hero-team.png',
        author: 'Équipe BEG',
        readTime: 8,
        likes: 29,
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(a => a.slug === slug);
}

export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
