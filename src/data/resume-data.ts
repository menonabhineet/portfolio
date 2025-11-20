export const resumeData = {
  name: "Abhineet Menon",
  initials: "AM",
  location: "Chicago, IL, USA",
  locationLink: "https://www.google.com/maps/place/Chicago,+IL",
  about:
    "Master’s Candidate in CS at UIC. Ex-Senior Data Engineer. I build scalable data pipelines and intelligent full-stack applications.",
  summary:
    "I am a Full-Stack Data Engineer with a hybrid background in distributed systems and application development. Currently pursuing my MS in Computer Science at UIC (4.0 GPA), I have professional experience optimizing ETL pipelines at LTIMindtree and building full-stack web solutions. I bridge the gap between raw data and actionable product experiences.",
  avatarUrl: "https://github.com/menonabhineet.png",
  personalWebsiteUrl: "https://menonabhineet.github.io/portfolio",
  contact: {
    email: "ameno@uic.edu",
    tel: "+13123940278",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/menonabhineet",
        icon: "Github",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/menonabhineet",
        icon: "Linkedin",
      },
    ],
  },
  education: [
    {
      school: "University of Illinois Chicago",
      degree: "Master of Science in Computer Science",
      start: "Aug 2024",
      end: "May 2026",
      description: "GPA: 4.0/4.0",
    },
    {
      school: "University of Mumbai",
      degree: "Bachelor of Engineering in Information Technology",
      start: "Aug 2018",
      end: "May 2022",
      description: "GPA: 8.37/10",
    },
  ],
  work: [
    {
      company: "LTIMindtree",
      link: "https://www.ltimindtree.com",
      badges: ["Snowflake", "Azure ADF", "SQL", "Python"],
      title: "Senior Data Engineer",
      start: "Aug 2022",
      end: "Mar 2024",
      description: [
        "Engineered ETL pipelines to migrate data from SQL Server to Snowflake, reducing reporting run-time by 20% and enhancing query performance.",
        "Optimized data extraction processes by refining Snowflake query logic, reducing data retrieval time by up to 40%.",
        "Led and mentored a 10-member intern team, tracking milestones and removing blockers to ensure 100% on-time delivery.",
        "Collaborated with QA and analytics teams to develop dynamic Excel-based test reports, improving data validation accuracy.",
      ],
    },
    {
      company: "Abner Security",
      link: "https://abnersecurity.com",
      badges: ["Web Dev", "WordPress", "SEO", "PHP"],
      title: "Web Development Intern",
      start: "May 2021",
      end: "Sep 2021",
      description: [
        "Reengineered the company's web platform, implementing responsive layouts and SEO best practices to increase organic traffic by 30%.",
        "Customized and integrated third-party plugins to enhance site functionality, security, and analytics.",
        "Reduced average page load time through performance optimization and caching strategies.",
      ],
    },
    {
      company: "Innovatiive Creators",
      link: "",
      badges: ["PHP", "MySQL", "Backend", "Analytics"],
      title: "Web Developer Intern",
      start: "Oct 2020",
      end: "Nov 2020",
      description: [
        "Implemented a PHP-based admin panel for the National Institute of Hospitality Management, reducing content update time by 40%.",
        "Integrated real-time traffic analytics alongside content and lead-management modules, centralizing data in one interface.",
        "Normalized existing database schema to eliminate redundancy and improve query performance by 30%.",
      ],
    },
  ],
  // Categorized skills based on your resume and target style
  skills: {
    languages: ["Python", "Java", "C++", "SQL", "C", "C#", "JavaScript", "TypeScript"],
    frameworks: ["Next.js", "React", "Flask", "ASP.NET", "Tailwind CSS"],
    dataTools: ["Snowflake", "Azure Data Factory", "AWS", "MySQL", "MongoDB", "Power BI"],
    devTools: ["Docker", "Git", "Jira", "Linux", "Postman"],
  },
  projects: [
    {
      title: "BattyCoda",
      techStack: ["Open Source", "Python", "Streamlit", "Signal Processing"],
      description:
        "An open-source Streamlit application to classify bat echolocation calls using sonograms. Contributed features like audio speed toggling and fixed frequency errors to improve species identification accuracy.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/BattyCoda",
      },
    },
    {
      title: "Receipt Count Prediction",
      techStack: ["Docker", "Flask", "NumPy", "Machine Learning"],
      description:
        "A full-stack ML web app that forecasts monthly receipt volumes using a custom polynomial regression model implemented from scratch. Fully containerized with Docker for consistent production deployment.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
    {
      title: "Gym Buddy App",
      techStack: ["Android", "Java", "XML", "Mobile Dev"],
      description:
        "Native Android application for health tracking featuring personalized workout planning, diet tracking, and a built-in BMI calculator. Implemented custom XML layouts and local SQLite data storage.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
    {
      title: "IPL Prediction Model",
      techStack: ["Python", "Scikit-learn", "Flask", "Pandas"],
      description:
        "Machine learning model achieving 84% accuracy in predicting sports outcomes. Built a Flask-based web interface to allow end-users to input variables and view real-time predictions.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
  ],
} as const;