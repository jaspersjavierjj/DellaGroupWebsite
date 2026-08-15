/*
=========================================================
DELLA GROUP
GLOBAL WEBSITE SEARCH

File:
assets/js/search.js

SEARCHES:
- Product Name
- Product ID / Code
- Category
- Keywords
- Description
- Website Pages

EXAMPLES:

Search:
MPPS

Destination:
/pages/Mpps.html

Search:
ARGUS

Destination:
/pages/Argus.html
=========================================================
*/

(() => {

    "use strict";


    /* =====================================================
       SEARCH DATABASE
    ===================================================== */

    const SEARCH_INDEX = [


        /* =================================================
           DELLA GROUP - MAIN BUSINESS UNITS
        ================================================= */

        {
            title: "Industrial",
            code: "",
            category: "DELLA Group",
            description:
                "Industrial systems, equipment and operational solutions.",
            keywords: [
                "industrial",
                "industry",
                "della solutions",
                "construction",
                "equipment",
                "machinery",
                "site solutions"
            ],
            url: "/pages/Industrial.html"
        },


        {
            title: "Healthcare",
            code: "",
            category: "DELLA Group",
            description:
                "Healthcare equipment, medical systems and operational solutions.",
            keywords: [
                "healthcare",
                "medical",
                "hospital",
                "clinical",
                "health"
            ],
            url: "/pages/Healthcare.html"
        },


        {
            title: "Infrastructure",
            code: "",
            category: "DELLA Group",
            description:
                "Infrastructure, mobility, parking and public operational systems.",
            keywords: [
                "infrastructure",
                "parking",
                "traffic",
                "mobility",
                "public infrastructure",
                "road safety"
            ],
            url: "/pages/Infrastructure.html"
        },


        {
            title: "Consumer Products",
            code: "",
            category: "DELLA Group",
            description:
                "DELLA Group consumer, personal care and performance products.",
            keywords: [
                "consumer",
                "consumer product",
                "consumer products",
                "personal care",
                "wellness",
                "toro",
                "azelane"
            ],
            url: "/pages/ConsumerProducts.html"
        },



        /* =================================================
           INDUSTRIAL
        ================================================= */

        {
            title: "Industrial Solutions",
            code: "",
            category: "Industrial",
            description:
                "Industrial equipment and systems for construction, infrastructure and facilities.",
            keywords: [
                "industrial",
                "construction",
                "equipment",
                "machinery",
                "site solutions"
            ],
            url: "/pages/Industrial.html"
        },


        {
            title: "Construction Equipment & Site Solutions",
            code: "",
            category: "Industrial",
            description:
                "Construction equipment and site deployment solutions.",
            keywords: [
                "construction",
                "site",
                "equipment",
                "industrial",
                "construction equipment"
            ],
            url: "/pages/Industrial.html#construction"
        },


        {
            title: "Drilling Tools & Machinery",
            code: "",
            category: "Industrial",
            description:
                "Drilling tools, machinery and industrial equipment.",
            keywords: [
                "drilling",
                "tools",
                "machinery",
                "industrial",
                "drilling tools"
            ],
            url: "/pages/Industrial.html#industrial-tools"
        },


        {
            title: "Smart Lighting Infrastructure System",
            code: "GEO",
            category: "Industrial",
            description:
                "Intelligent lighting and illumination infrastructure.",
            keywords: [
                "geo",
                "lighting",
                "smart lighting",
                "illumination",
                "saturn",
                "balder",
                "lighting infrastructure"
            ],
            url: "/pages/Geo.html"
        },


        {
            title: "Intelligent Utility Monitoring System",
            code: "METERX",
            category: "Industrial",
            description:
                "Digital utility monitoring and data capture system.",
            keywords: [
                "meterx",
                "utility",
                "monitoring",
                "meter",
                "digital data",
                "utility monitoring"
            ],
            url: "/pages/Meterx.html"
        },


        {
            title: "Water Purification Systems",
            code: "AQUAPURE",
            category: "Industrial",
            description:
                "Smart water purification system.",
            keywords: [
                "aquapure",
                "water",
                "purification",
                "purifier",
                "smart water",
                "water treatment"
            ],
            url: "/pages/Aquapure.html"
        },


        {
            title: "DELLA Automated Parking System",
            code: "",
            category: "Industrial / Infrastructure",
            description:
                "Automated parking, access control and parking management systems.",
            keywords: [
                "parking",
                "automated parking",
                "access control",
                "parking management",
                "smart parking",
                "parking system"
            ],
            url: "/pages/Parking.html"
        },



        /* =================================================
           HEALTHCARE
        ================================================= */

        {
            title: "Healthcare Solutions",
            code: "",
            category: "Healthcare",
            description:
                "Medical equipment, clinical training and field deployment solutions.",
            keywords: [
                "healthcare",
                "medical",
                "hospital",
                "clinical"
            ],
            url: "/pages/Healthcare.html"
        },


        {
            title: "Medical Training & Simulations",
            code: "",
            category: "Healthcare",
            description:
                "Medical training and simulation equipment.",
            keywords: [
                "medical training",
                "simulation",
                "trainer",
                "manikin",
                "medical simulation"
            ],
            url: "/pages/Healthcare.html#training-simulation"
        },


        {
            title: "Patient Care & Mobility",
            code: "",
            category: "Healthcare",
            description:
                "Patient care and mobility equipment.",
            keywords: [
                "patient care",
                "mobility",
                "medical mobility",
                "patient mobility"
            ],
            url: "/pages/Healthcare.html#mobility-equipment"
        },


        {
            title: "Emergency Medical Solutions",
            code: "",
            category: "Healthcare",
            description:
                "Emergency and field medical equipment.",
            keywords: [
                "emergency",
                "medical",
                "field gear",
                "ems",
                "emergency medical"
            ],
            url: "/pages/Healthcare.html#emergency-field-gear"
        },


        {
            title: "Medical Instruments & Diagnosis",
            code: "",
            category: "Healthcare",
            description:
                "Diagnostic tools and medical instruments.",
            keywords: [
                "diagnostic",
                "diagnosis",
                "medical instruments",
                "tools",
                "diagnostic tools"
            ],
            url: "/pages/Healthcare.html#diagnostic-tools"
        },


        {
            title: "Safety & Protective Equipment",
            code: "",
            category: "Healthcare",
            description:
                "Safety and protective equipment.",
            keywords: [
                "safety",
                "protective",
                "ppe",
                "protection",
                "protective equipment"
            ],
            url: "/pages/Healthcare.html#safety-equipment"
        },


        {
            title: "Water & Sanitation Systems",
            code: "",
            category: "Healthcare",
            description:
                "Water and sanitation systems for healthcare and field operations.",
            keywords: [
                "water",
                "sanitation",
                "hygiene",
                "water sanitation"
            ],
            url: "/pages/Healthcare.html#water-sanitation-system"
        },



        /* =================================================
           INFRASTRUCTURE
        ================================================= */

        {
            title: "Infrastructure Solutions",
            code: "",
            category: "Infrastructure",
            description:
                "Transportation, public safety, facilities management and field operations.",
            keywords: [
                "infrastructure",
                "transportation",
                "public safety",
                "facilities"
            ],
            url: "/pages/Infrastructure.html"
        },


        {
            title: "Traffic & Parking Management Systems",
            code: "",
            category: "Infrastructure",
            description:
                "Traffic, parking guidance and access management systems.",
            keywords: [
                "traffic",
                "parking",
                "smart mobility",
                "access control",
                "parking management"
            ],
            url: "/pages/Infrastructure.html#smart-mobility"
        },


        {
            title: "Uniforms & Professional Apparel",
            code: "",
            category: "Infrastructure",
            description:
                "Professional apparel and uniform solutions.",
            keywords: [
                "uniform",
                "apparel",
                "professional clothing",
                "uniforms"
            ],
            url: "/pages/Infrastructure.html#professional-apparel"
        },


        {
            title: "Road Safety & Infrastructure Products",
            code: "",
            category: "Infrastructure",
            description:
                "Road safety and supporting infrastructure products.",
            keywords: [
                "road safety",
                "traffic safety",
                "infrastructure",
                "road"
            ],
            url: "/pages/Infrastructure.html#road-safety"
        },


        {
            title: "Event & Field Deployment Gear",
            code: "",
            category: "Infrastructure",
            description:
                "Field deployment and event support equipment.",
            keywords: [
                "field deployment",
                "event",
                "deployment gear",
                "field equipment"
            ],
            url: "/pages/Infrastructure.html#field-deployment"
        },



        /* =================================================
           CONSUMER PRODUCTS
        ================================================= */

        {
            title: "TORO Vector",
            code: "TORO VECTOR",
            category: "Consumer Products / Well Being",
            description:
                "High-performance TORO sports product.",
            keywords: [
                "toro",
                "vector",
                "sports",
                "performance",
                "toro vector"
            ],
            url: "https://toro-works.com/"
        },


        {
            title: "TORO Pulse",
            code: "TORO PULSE",
            category: "Consumer Products / Well Being",
            description:
                "High-performance TORO sports product.",
            keywords: [
                "toro",
                "pulse",
                "sports",
                "performance",
                "toro pulse"
            ],
            url: "https://toro-works.com/"
        },


        {
            title: "TORO Phantom",
            code: "TORO PHANTOM",
            category: "Consumer Products / Well Being",
            description:
                "High-performance TORO sports product.",
            keywords: [
                "toro",
                "phantom",
                "sports",
                "performance",
                "toro phantom"
            ],
            url: "https://toro-works.com/"
        },


        {
            title: "TORO Terra",
            code: "TORO TERRA",
            category: "Consumer Products / Well Being",
            description:
                "High-performance TORO sports product.",
            keywords: [
                "toro",
                "terra",
                "sports",
                "performance",
                "toro terra"
            ],
            url: "https://toro-works.com/"
        },


        {
            title: "Azelane Facial Soap",
            code: "AZELANE",
            category: "Consumer Products / Personal Care",
            description:
                "Personal care and skincare product.",
            keywords: [
                "azelane",
                "facial soap",
                "soap",
                "skincare",
                "personal care",
                "azelane soap"
            ],
            url: "/pages/ConsumerProducts.html"
        },



        /* =================================================
           DELLA DEFENSE
        ================================================= */

        {
            title: "DELLA Defense",
            code: "",
            category: "Defense",
            description:
                "Survivability, sustainment and mission-ready field systems.",
            keywords: [
                "defense",
                "della defense",
                "military",
                "survivability",
                "sustainment",
                "defence"
            ],
            url: "/pages/Defense.html"
        },



        /* =================================================
           TIER 1
        ================================================= */

        {
            title: "Tier 1 Systems",
            code: "TIER 1",
            category: "Defense / Tier 1",
            description:
                "DELLA Defense Tier 1 operational systems.",
            keywords: [
                "tier 1",
                "tier1",
                "defense tier 1",
                "defence tier 1"
            ],
            url: "/pages/Tier1.html"
        },


        {
            title: "Modular Personal Protection System",
            code: "MPPS",
            category: "Defense / Tier 1",
            description:
                "Modular personal protection system for operational environments.",
            keywords: [
                "mpps",
                "modular personal protection system",
                "personal protection",
                "ballistic",
                "helmet",
                "ballistic helmet",
                "vest",
                "ballistic vest",
                "body armor",
                "body armour",
                "armor",
                "armour",
                "protection",
                "tier 1"
            ],
            url: "/pages/Mpps.html"
        },


        {
            title: "Operational Field Ration System",
            code: "OFRS",
            category: "Defense / Tier 1",
            description:
                "Operational field ration system for deployed personnel.",
            keywords: [
                "ofrs",
                "operational field ration system",
                "field ration",
                "ration",
                "rations",
                "food",
                "meal",
                "meals",
                "field food",
                "tier 1"
            ],
            url: "/pages/Ofrs.html"
        },


        {
            title: "Deployed Field Sanitation Unit",
            code: "DFSU",
            category: "Defense / Tier 1",
            description:
                "Deployable field sanitation capability.",
            keywords: [
                "dfsu",
                "deployed field sanitation unit",
                "field sanitation",
                "sanitation",
                "toilet",
                "portable toilet",
                "field toilet",
                "tier 1"
            ],
            url: "/pages/Dfsu.html"
        },


        {
            title: "Rapid Deployment Shelter System",
            code: "RDSS",
            category: "Defense / Tier 1",
            description:
                "Rapidly deployable field shelter system.",
            keywords: [
                "rdss",
                "rapid deployment shelter system",
                "rapid shelter",
                "deployment shelter",
                "field shelter",
                "inflatable shelter",
                "inflatable tent",
                "tent",
                "shelter",
                "tier 1"
            ],
            url: "/pages/Rdss.html"
        },


        {
            title: "Portable Industrial Air-conditioning Unit",
            code: "PIAC",
            category: "Defense / Tier 1",
            description:
                "Portable industrial air-conditioning system for field deployment.",
            keywords: [
                "piac",
                "portable industrial air-conditioning unit",
                "portable industrial air conditioning unit",
                "portable air conditioning",
                "portable air conditioner",
                "air conditioner",
                "air conditioning",
                "ac",
                "cooling",
                "field cooling",
                "tier 1"
            ],
            url: "/pages/Piac.html"
        },


        {
            title: "Integrated Field Uniform System",
            code: "IFUS",
            category: "Defense / Tier 1",
            description:
                "Integrated field uniform system.",
            keywords: [
                "ifus",
                "integrated field uniform system",
                "field uniform",
                "uniform",
                "uniform system",
                "combat uniform",
                "military uniform",
                "tier 1"
            ],
            url: "/pages/Ifus.html"
        },


        {
            title: "Individual Field Shelter System",
            code: "IFSS",
            category: "Defense / Tier 1",
            description:
                "Individual field shelter system.",
            keywords: [
                "ifss",
                "individual field shelter system",
                "individual shelter",
                "field shelter",
                "personal shelter",
                "tent",
                "shelter",
                "tier 1"
            ],
            url: "/pages/Ifss.html"
        },



        /* =================================================
           TIER 2
        ================================================= */

        {
            title: "Tier 2 Systems",
            code: "TIER 2",
            category: "Defense / Tier 2",
            description:
                "DELLA Defense Tier 2 operational systems.",
            keywords: [
                "tier 2",
                "tier2",
                "defense tier 2",
                "defence tier 2"
            ],
            url: "/pages/Tier2.html"
        },


        {
            title: "Deployable Water Purification System",
            code: "DWPS",
            category: "Defense / Tier 2",
            description:
                "Deployable water purification capability for field operations.",
            keywords: [
                "dwps",
                "deployable water purification system",
                "water purification",
                "water purifier",
                "water purification system",
                "clean water",
                "potable water",
                "field water",
                "water treatment",
                "tier 2"
            ],
            url: "/pages/Dwps.html"
        },


        {
            title: "Tactical Solar Power System",
            code: "TSPS",
            category: "Defense / Tier 2",
            description:
                "Tactical deployable solar power system.",
            keywords: [
                "tsps",
                "tactical solar power system",
                "solar",
                "solar power",
                "solar system",
                "tactical power",
                "power system",
                "electricity",
                "energy",
                "renewable energy",
                "tier 2"
            ],
            url: "/pages/Tsps.html"
        },


        {
            title: "Deployed Field Hygiene System",
            code: "DFHS",
            category: "Defense / Tier 2",
            description:
                "Deployed field hygiene system.",
            keywords: [
                "dfhs",
                "deployed field hygiene system",
                "field hygiene",
                "hygiene",
                "shower",
                "field shower",
                "sanitation",
                "washing",
                "tier 2"
            ],
            url: "/pages/Dfhs.html"
        },


        {
            title: "Tracked Unmanned Ground Logistics Vehicle",
            code: "TUGLV",
            category: "Defense / Tier 2",
            description:
                "Tracked unmanned ground logistics vehicle.",
            keywords: [
                "tuglv",
                "tracked unmanned ground logistics vehicle",
                "unmanned ground vehicle",
                "ground vehicle",
                "ugv",
                "tracked vehicle",
                "logistics vehicle",
                "robot",
                "robotic vehicle",
                "unmanned vehicle",
                "tier 2"
            ],
            url: "/pages/Tuglv.html"
        },


        {
            title: "Mobile Field Feeding System",
            code: "MFFS",
            category: "Defense / Tier 2",
            description:
                "Mobile field feeding and food preparation system.",
            keywords: [
                "mffs",
                "mobile field feeding system",
                "field feeding",
                "field kitchen",
                "mobile kitchen",
                "kitchen",
                "food",
                "feeding",
                "food preparation",
                "tier 2"
            ],
            url: "/pages/Mffs.html"
        },



        /* =================================================
           TIER 3
        ================================================= */

        {
            title: "Tier 3 Systems",
            code: "TIER 3",
            category: "Defense / Tier 3",
            description:
                "DELLA Defense Tier 3 unmanned and ISR systems.",
            keywords: [
                "tier 3",
                "tier3",
                "defense tier 3",
                "defence tier 3",
                "drone",
                "drones",
                "uav",
                "isr"
            ],
            url: "/pages/Tier3.html"
        },


        {
            title: "Personal Reconnaissance System Drone",
            code: "ORION",
            category: "Defense / Tier 3",
            description:
                "Personal reconnaissance drone system.",
            keywords: [
                "orion",
                "personal reconnaissance system drone",
                "personal reconnaissance drone",
                "reconnaissance drone",
                "personal drone",
                "recon",
                "reconnaissance",
                "uav",
                "drone",
                "isr",
                "surveillance",
                "tier 3"
            ],
            url: "/pages/Orion.html"
        },


        {
            title: "AI Autonomous ISR Drone",
            code: "ARGUS",
            category: "Defense / Tier 3",
            description:
                "AI-enabled autonomous intelligence, surveillance and reconnaissance drone.",
            keywords: [
                "argus",
                "ai autonomous isr drone",
                "autonomous drone",
                "ai drone",
                "artificial intelligence drone",
                "isr",
                "intelligence",
                "surveillance",
                "reconnaissance",
                "uav",
                "drone",
                "tier 3"
            ],
            url: "/pages/Argus.html"
        },


        {
            title: "Tactical ISR Drone",
            code: "SENTINEL",
            category: "Defense / Tier 3",
            description:
                "Tactical intelligence, surveillance and reconnaissance drone.",
            keywords: [
                "sentinel",
                "tactical isr drone",
                "isr drone",
                "tactical drone",
                "surveillance",
                "reconnaissance",
                "intelligence",
                "uav",
                "drone",
                "tier 3"
            ],
            url: "/pages/Sentinel.html"
        },


        {
            title: "Autonomous Logistics Support Drone",
            code: "ATLAS",
            category: "Defense / Tier 3",
            description:
                "Autonomous logistics support drone.",
            keywords: [
                "atlas",
                "autonomous logistics support drone",
                "logistics drone",
                "cargo drone",
                "autonomous drone",
                "support drone",
                "transport drone",
                "uav",
                "drone",
                "tier 3"
            ],
            url: "/pages/Atlas.html"
        },



        /* =================================================
           SUPPORT EQUIPMENT
        ================================================= */

        {
            title: "Support Equipment",
            code: "",
            category: "Defense / Support Equipment",
            description:
                "Mission sustainment and supporting operational equipment.",
            keywords: [
                "support equipment",
                "mission sustainment",
                "defense support",
                "defence support",
                "support"
            ],
            url: "/pages/SupportEquipment.html"
        },


        {
            title: "Deployable Containerized Fitness And Conditioning System",
            code: "FORTIS",
            category: "Defense / Support Equipment",
            description:
                "Deployable containerized fitness and conditioning system.",
            keywords: [
                "fortis",
                "deployable containerized fitness and conditioning system",
                "containerized fitness",
                "fitness",
                "conditioning",
                "gym",
                "deployable gym",
                "containerized gym",
                "mobile gym",
                "fitness system",
                "support equipment"
            ],
            url: "/pages/Fortis.html"
        },


        {
            title: "Electro-hydraulic Rescue Tool",
            code: "EHRT",
            category: "Defense / Support Equipment",
            description:
                "Electro-hydraulic rescue tool for emergency operations.",
            keywords: [
                "ehrt",
                "electro hydraulic rescue tool",
                "electro-hydraulic rescue tool",
                "rescue tool",
                "hydraulic rescue",
                "emergency rescue",
                "hydraulic cutter",
                "hydraulic spreader",
                "rescue",
                "support equipment"
            ],
            url: "/pages/EHRT.html"
        },


        {
            title: "Foldable Entrenching Shovel",
            code: "FES",
            category: "Defense / Support Equipment",
            description:
                "Portable foldable entrenching shovel.",
            keywords: [
                "fes",
                "foldable entrenching shovel",
                "entrenching shovel",
                "shovel",
                "foldable shovel",
                "field shovel",
                "military shovel",
                "digging",
                "support equipment"
            ],
            url: "/pages/FES.html"
        },


        {
            title: "Tactical First Aid Kit",
            code: "TFAK",
            category: "Defense / Support Equipment",
            description:
                "Tactical first aid kit for field emergency response.",
            keywords: [
                "tfak",
                "tactical first aid kit",
                "first aid kit",
                "medical kit",
                "trauma kit",
                "tactical medical",
                "first aid",
                "emergency medical",
                "medical",
                "support equipment"
            ],
            url: "/pages/TFAK.html"
        },



        /* =================================================
           COMPANY
        ================================================= */

        {
            title: "About DELLA Group",
            code: "",
            category: "Company",
            description:
                "Company profile, mission and vision.",
            keywords: [
                "about",
                "company",
                "mission",
                "vision",
                "della group",
                "about us"
            ],
            url: "/pages/About.html"
        },


        {
            title: "Contact Us",
            code: "",
            category: "Company",
            description:
                "Contact DELLA Group.",
            keywords: [
                "contact",
                "contact us",
                "inquiry",
                "email",
                "phone",
                "telephone"
            ],
            url: "/pages/Contact.html"
        },


        {
            title: "Strategic Engagement",
            code: "",
            category: "Company",
            description:
                "DELLA Group strategic engagements.",
            keywords: [
                "engagement",
                "strategic engagement",
                "projects",
                "fort bonifacio engagement"
            ],
            url: "/pages/Engagement.html"
        },


        {
            title: "Future Projects",
            code: "",
            category: "Company",
            description:
                "Explore DELLA Group future projects.",
            keywords: [
                "future projects",
                "projects",
                "future",
                "development"
            ],
            url: "/pages/FutureProjects.html"
        },


        {
            title: "Trusted By",
            code: "",
            category: "Company",
            description:
                "Organizations and partners that have worked with DELLA Group.",
            keywords: [
                "trusted by",
                "partners",
                "clients",
                "customers"
            ],
            url: "/pages/TrustedBy.html"
        }

    ];



    /* =====================================================
       SEARCH SETTINGS
    ===================================================== */

    /*
       Maximum number of search results displayed.

       20 is recommended because searching:
       "Tier 1", "Tier 2", "Tier 3", "Defense", "Drone", etc.
       can return several products.
    */

    const MAX_RESULTS = 20;

    const HOVER_CLOSE_DELAY = 180;



    /* =====================================================
       NORMALIZE SEARCH TEXT
    ===================================================== */

    const normalize = (value = "") => {

        return String(value)

            .toLowerCase()

            .normalize("NFD")

            .replace(/[\u0300-\u036f]/g, "")

            .trim();

    };



    /* =====================================================
       BREAK SEARCH INTO WORDS
    ===================================================== */

    const tokenize = (value = "") => {

        return normalize(value)

            .split(/\s+/)

            .filter(Boolean);

    };



    /* =====================================================
       SEARCH SCORE SYSTEM
    ===================================================== */

    function getSearchScore(item, query) {


        const q = normalize(query);


        if (!q) {

            return 0;

        }



        const title =
            normalize(item.title);


        const code =
            normalize(item.code);


        const category =
            normalize(item.category);


        const description =
            normalize(item.description);


        const keywords =
            normalize(
                (item.keywords || []).join(" ")
            );


        const allText =
            `${title} ${code} ${category} ${description} ${keywords}`;


        const terms =
            tokenize(q);



        let score = 0;



        /* =============================================
           PRODUCT ID / CODE
           HIGHEST PRIORITY
        ============================================= */

        if (
            code &&
            code === q
        ) {

            score += 1000;

        }


        else if (
            code &&
            code.startsWith(q)
        ) {

            score += 700;

        }


        else if (
            code &&
            code.includes(q)
        ) {

            score += 520;

        }



        /* =============================================
           PRODUCT / PAGE TITLE
        ============================================= */

        if (
            title === q
        ) {

            score += 500;

        }


        else if (
            title.startsWith(q)
        ) {

            score += 330;

        }


        else if (
            title.includes(q)
        ) {

            score += 240;

        }



        /* =============================================
           CATEGORY
        ============================================= */

        if (
            category === q
        ) {

            score += 150;

        }


        else if (
            category.includes(q)
        ) {

            score += 90;

        }



        /* =============================================
           KEYWORDS
        ============================================= */

        if (
            keywords.includes(q)
        ) {

            score += 120;

        }



        /* =============================================
           DESCRIPTION
        ============================================= */

        if (
            description.includes(q)
        ) {

            score += 60;

        }



        /* =============================================
           MULTI WORD SEARCH

           Example:
           "field shelter"

           Both words need to exist somewhere
           in the product information.
        ============================================= */

        const allTermsPresent =
            terms.every(term =>
                allText.includes(term)
            );


        if (allTermsPresent) {

            score += 120;

        }


        else {

            return 0;

        }



        /* =============================================
           SMALL BONUS FOR SHORT / PRECISE TITLES
        ============================================= */

        score += Math.max(
            0,
            40 - Math.floor(title.length / 3)
        );



        return score;

    }



    /* =====================================================
       SEARCH FUNCTION
    ===================================================== */

    function search(query) {


        return SEARCH_INDEX


            .map(item => {

                return {

                    ...item,

                    _score:
                        getSearchScore(
                            item,
                            query
                        )

                };

            })


            .filter(item =>
                item._score > 0
            )


            .sort((a, b) => {

                return (
                    b._score -
                    a._score
                )

                ||

                a.title.localeCompare(
                    b.title
                );

            })


            .slice(
                0,
                MAX_RESULTS
            );

    }



    /* =====================================================
       CREATE SEARCH PANEL
    ===================================================== */

    function createSearchPanel() {


        const existingPanel =
            document.querySelector(
                "#siteSearchPanel"
            );


        /*
           Prevent duplicate search panels
           if search.js accidentally loads twice.
        */

        if (existingPanel) {

            return existingPanel;

        }



        const panel =
            document.createElement(
                "section"
            );


        panel.className =
            "site-search-panel";


        panel.id =
            "siteSearchPanel";


        panel.setAttribute(
            "aria-hidden",
            "true"
        );



        panel.innerHTML = `

            <div class="site-search-inner">


                <div class="site-search-topline">


                    <div class="site-search-field-wrap">


                        <span
                            class="material-icons"
                            aria-hidden="true"
                        >
                            search
                        </span>


                        <input
                            class="site-search-input"
                            id="siteSearchInput"
                            type="search"
                            inputmode="search"
                            autocomplete="off"
                            spellcheck="false"
                            placeholder="Search products, product ID, category..."
                            aria-label="Search DELLA Group"
                        >


                    </div>



                    <button
                        class="site-search-close"
                        type="button"
                        aria-label="Close search"
                        title="Close search"
                    >

                        <span
                            class="material-icons"
                            aria-hidden="true"
                        >
                            close
                        </span>

                    </button>


                </div>



                <p class="site-search-helper">

                    Search by product name, product ID/code,
                    category, system, or keyword.

                </p>



                <div
                    class="site-search-results"
                    id="siteSearchResults"
                    aria-live="polite"
                >

                    <div class="site-search-status">

                        Start typing to search the DELLA Group website.

                    </div>

                </div>


            </div>

        `;



        const pageContent =
            document.querySelector(
                ".page-content"
            );


        if (pageContent) {

            document.body.insertBefore(
                panel,
                pageContent
            );

        }


        else {

            document.body.appendChild(
                panel
            );

        }



        return panel;

    }



    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value = "") {


        return String(value)

            .replaceAll(
                "&",
                "&amp;"
            )

            .replaceAll(
                "<",
                "&lt;"
            )

            .replaceAll(
                ">",
                "&gt;"
            )

            .replaceAll(
                '"',
                "&quot;"
            )

            .replaceAll(
                "'",
                "&#039;"
            );

    }



    /* =====================================================
       DISPLAY RESULTS
    ===================================================== */

    function renderResults(
        container,
        query
    ) {


        const q =
            query.trim();



        /* =============================================
           EMPTY SEARCH
        ============================================= */

        if (!q) {


            container.innerHTML = `

                <div class="site-search-status">

                    Start typing to search the DELLA Group website.

                </div>

            `;


            return;

        }



        const searchResults =
            search(q);



        /* =============================================
           NO RESULTS
        ============================================= */

        if (!searchResults.length) {


            container.innerHTML = `

                <div class="site-search-empty">

                    No result found for

                    <strong>
                        ${escapeHTML(q)}
                    </strong>.

                    Try a product ID,
                    product name,
                    category,
                    or shorter keyword.

                </div>

            `;


            return;

        }



        const resultWord =
            searchResults.length === 1
                ? "result"
                : "results";



        /* =============================================
           RESULT HTML
        ============================================= */

        container.innerHTML = `


            <div class="site-search-status">

                ${searchResults.length}
                ${resultWord}
                for
                “${escapeHTML(q)}”

            </div>



            <div class="site-search-result-list">


                ${searchResults.map(item => `


                    <a
                        class="site-search-result"
                        href="${escapeHTML(item.url)}"
                    >


                        <div class="site-search-result-main">


                            <div class="site-search-result-meta">


                                ${
                                    item.category

                                    ?

                                    `
                                    <span>
                                        ${escapeHTML(
                                            item.category
                                        )}
                                    </span>
                                    `

                                    :

                                    ""
                                }



                                ${
                                    item.code

                                    ?

                                    `
                                    <span
                                        class="site-search-result-code"
                                    >
                                        ${escapeHTML(
                                            item.code
                                        )}
                                    </span>
                                    `

                                    :

                                    ""
                                }


                            </div>



                            <div class="site-search-result-title">

                                ${escapeHTML(
                                    item.title
                                )}

                            </div>



                            ${
                                item.description

                                ?

                                `
                                <div
                                    class="site-search-result-description"
                                >

                                    ${escapeHTML(
                                        item.description
                                    )}

                                </div>
                                `

                                :

                                ""
                            }


                        </div>



                        <span
                            class="
                                material-symbols-outlined
                                site-search-result-arrow
                            "
                            aria-hidden="true"
                        >

                            arrow_outward

                        </span>


                    </a>


                `).join("")}


            </div>

        `;

    }



    /* =====================================================
       INITIALIZE SEARCH
    ===================================================== */

    function initSearch() {


        /* =============================================
           DESKTOP SEARCH BUTTON
        ============================================= */

        const desktopTrigger =
            document.querySelector(
                ".search-link"
            );



        /* =============================================
           MOBILE SEARCH BUTTON
        ============================================= */

        const mobileTrigger =
            document.querySelector(
                ".mobile-menu-link-search"
            );



        /*
           Stop if neither search button exists.
        */

        if (
            !desktopTrigger &&
            !mobileTrigger
        ) {

            return;

        }



        const panel =
            createSearchPanel();



        const input =
            panel.querySelector(
                "#siteSearchInput"
            );



        const results =
            panel.querySelector(
                "#siteSearchResults"
            );



        const closeButton =
            panel.querySelector(
                ".site-search-close"
            );



        let closeTimer = null;

        let isOpen = false;



        /* =================================================
           CLEAR CLOSE TIMER
        ================================================= */

        function clearCloseTimer() {


            if (closeTimer) {


                window.clearTimeout(
                    closeTimer
                );


                closeTimer = null;

            }

        }



        /* =================================================
           OPEN SEARCH
        ================================================= */

        function openSearch(
            {
                focus = true
            } = {}
        ) {


            clearCloseTimer();


            isOpen = true;



            panel.classList.add(
                "is-open"
            );


            panel.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "site-search-open"
            );



            if (desktopTrigger) {

                desktopTrigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }



            /* =========================================
               CLOSE MOBILE MENU IF OPEN
            ========================================= */

            document.body.classList.remove(
                "mobile-menu-open"
            );


            document
                .querySelector(
                    ".mobile-menu-panel"
                )
                ?.classList.remove(
                    "active"
                );



            /* =========================================
               FOCUS SEARCH INPUT
            ========================================= */

            if (focus) {


                window.requestAnimationFrame(
                    () => {

                        input.focus();

                    }
                );

            }

        }



        /* =================================================
           CLOSE SEARCH
        ================================================= */

        function closeSearch(
            {
                clear = false
            } = {}
        ) {


            clearCloseTimer();


            isOpen = false;



            panel.classList.remove(
                "is-open"
            );


            panel.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "site-search-open"
            );



            if (desktopTrigger) {

                desktopTrigger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }



            /*
               Optional:
               clear input when closing
            */

            if (clear) {


                input.value = "";


                renderResults(
                    results,
                    ""
                );

            }

        }



        /* =================================================
           HOVER CLOSE DELAY
        ================================================= */

        function scheduleClose() {


            clearCloseTimer();


            closeTimer =
                window.setTimeout(
                    () => {


                        /*
                           Keep search open while
                           user is typing.
                        */

                        if (
                            document.activeElement
                            !== input
                        ) {

                            closeSearch();

                        }


                    },

                    HOVER_CLOSE_DELAY
                );

        }



        /* =================================================
           DESKTOP SEARCH EVENTS
        ================================================= */

        if (desktopTrigger) {


            desktopTrigger.setAttribute(
                "role",
                "button"
            );


            desktopTrigger.setAttribute(
                "aria-controls",
                "siteSearchPanel"
            );


            desktopTrigger.setAttribute(
                "aria-expanded",
                "false"
            );



            /* =========================================
               HOVER SEARCH
            ========================================= */

            desktopTrigger.addEventListener(
                "mouseenter",
                () => {


                    if (
                        window.innerWidth >
                        1100
                    ) {


                        openSearch({
                            focus: false
                        });


                    }

                }
            );



            /* =========================================
               LEAVE SEARCH BUTTON
            ========================================= */

            desktopTrigger.addEventListener(
                "mouseleave",
                () => {


                    if (
                        window.innerWidth >
                        1100
                    ) {


                        scheduleClose();


                    }

                }
            );



            /* =========================================
               CLICK SEARCH BUTTON
            ========================================= */

            desktopTrigger.addEventListener(
                "click",
                event => {


                    event.preventDefault();



                    if (isOpen) {


                        input.focus();


                    }


                    else {


                        openSearch({
                            focus: true
                        });


                    }

                }
            );

        }



        /* =================================================
           MOBILE SEARCH EVENT
        ================================================= */

        if (mobileTrigger) {


            mobileTrigger.addEventListener(
                "click",
                event => {


                    event.preventDefault();


                    openSearch({
                        focus: true
                    });


                }
            );

        }



        /* =================================================
           SEARCH PANEL HOVER
        ================================================= */

        panel.addEventListener(
            "mouseenter",
            clearCloseTimer
        );



        panel.addEventListener(
            "mouseleave",
            () => {


                if (
                    window.innerWidth >
                    1100
                ) {


                    scheduleClose();


                }

            }
        );



        /* =================================================
           LIVE SEARCH WHILE TYPING
        ================================================= */

        input.addEventListener(
            "input",
            () => {


                renderResults(
                    results,
                    input.value
                );


            }
        );



        /* =================================================
           ENTER KEY
           OPENS FIRST SEARCH RESULT
        ================================================= */

        input.addEventListener(
            "keydown",
            event => {


                if (
                    event.key === "Enter"
                ) {


                    const firstResult =
                        results.querySelector(
                            ".site-search-result"
                        );


                    if (firstResult) {


                        window.location.href =
                            firstResult.href;


                    }

                }

            }
        );



        /* =================================================
           CLOSE BUTTON
        ================================================= */

        closeButton.addEventListener(
            "click",
            () => {


                closeSearch();


                desktopTrigger?.focus();

            }
        );



        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            event => {


                if (
                    event.key === "Escape" &&
                    isOpen
                ) {


                    closeSearch();


                    desktopTrigger?.focus();

                }

            }
        );



        /* =================================================
           CLICK OUTSIDE SEARCH
        ================================================= */

        document.addEventListener(
            "click",
            event => {


                if (!isOpen) {

                    return;

                }



                const clickedInsidePanel =
                    panel.contains(
                        event.target
                    );



                const clickedDesktopTrigger =
                    desktopTrigger
                        ?.contains(
                            event.target
                        );



                const clickedMobileTrigger =
                    mobileTrigger
                        ?.contains(
                            event.target
                        );



                if (
                    !clickedInsidePanel &&
                    !clickedDesktopTrigger &&
                    !clickedMobileTrigger
                ) {


                    closeSearch();


                }

            }
        );



        /* =================================================
           CLOSE SEARCH WHEN NAVBAR HIDES
        ================================================= */

        const navbar =
            document.querySelector(
                ".navbar"
            );



        if (
            navbar &&
            "MutationObserver" in window
        ) {


            const observer =
                new MutationObserver(
                    () => {


                        if (
                            navbar.classList.contains(
                                "nav-hidden"
                            )
                            &&
                            isOpen
                        ) {


                            closeSearch();


                        }

                    }
                );



            observer.observe(
                navbar,
                {

                    attributes: true,

                    attributeFilter: [
                        "class"
                    ]

                }
            );

        }



        /* =================================================
           CLOSE SEARCH IF WINDOW CHANGES TO MOBILE
           WHILE SEARCH IS OPEN
        ================================================= */

        window.addEventListener(
            "resize",
            () => {


                clearCloseTimer();


            }
        );

    }



    /* =====================================================
       START SEARCH SYSTEM
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {


        document.addEventListener(
            "DOMContentLoaded",
            initSearch
        );


    }


    else {


        initSearch();


    }


})();