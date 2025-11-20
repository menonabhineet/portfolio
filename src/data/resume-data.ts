export const resumeData = {
  name: "Abhineet Menon",
  initials: "AM",
  location: "Chicago, IL, USA",
  locationLink: "https://www.google.com/maps/place/Chicago,+IL",
  about:
    "I am a Data Engineer who doesn't just move data; I build the systems that make data useful. With a foundation in full-stack development and a specialization in distributed systems (Master's at UIC), I bridge the technical gap between raw ETL pipelines and polished user experiences. My work at LTIMindtree involved optimizing high-scale Snowflake migrations, while my personal projects explore the nuances of ML and Application Design. I value clean code, scalable architecture, and solving hard problems with elegant solutions.",
  summary:
    "I am a Full-Stack Data Engineer with a hybrid background in distributed systems and application development. Currently pursuing my MS in Computer Science at UIC (4.0 GPA), I have professional experience optimizing ETL pipelines at LTIMindtree and building full-stack web solutions.",
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
      description: "GPA: 4.0/4.0 | Focusing on Visualization & Visual Analytics, Data Systems.",
    },
    {
      school: "University of Mumbai",
      degree: "Bachelor of Engineering in Information Technology",
      start: "Aug 2018",
      end: "May 2022",
      description: "GPA: 8.37/10 | Built foundational skills in Algorithms, Database Management, and Web Engineering.",
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
        "Engineered massive-scale ETL pipelines to migrate legacy data from SQL Server to Snowflake, achieving a 20% reduction in reporting runtime.",
        "Spearheaded the optimization of Snowflake query logic, cutting data retrieval latency by up to 40% for critical business dashboards.",
        "Led a 10-member agile team, managing sprint lifecycles and removing technical blockers to ensure 100% on-time delivery of milestones.",
        "Designed incremental-load pipelines using Azure Data Factory (ADF) to ensure real-time data availability for analytics teams.",
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
        "Revamped the company's core web platform, implementing responsive design principles and SEO strategies that drove a 30% increase in organic traffic.",
        "Hardened site security by customizing third-party plugins and implementing strict validation protocols.",
        "Optimized asset delivery and caching strategies to significantly reduce page load times.",
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
        "Architected a custom PHP admin panel for the National Institute of Hospitality Management, streamlining content updates by 40%.",
        "Developed a centralized dashboard integrating real-time traffic analytics, student enrollment data, and lead management.",
        "Refactored and normalized the existing database schema, eliminating redundancy and improving query performance by 30%.",
      ],
    },
  ],
  skills: {
    languages: ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "C#"],
    frameworks: ["Next.js", "React", "Flask", "ASP.NET", "Tailwind CSS", "Streamlit"],
    dataTools: ["Snowflake", "Azure Data Factory", "AWS", "MySQL", "MongoDB", "Power BI", "Tableau"],
    devTools: ["Docker", "Git", "Jira", "Linux", "Postman", "VS Code"],
  },
  projects: [
    {
      title: "BattyCoda: Acoustic Classification",
      techStack: ["Open Source", "Python", "Streamlit", "Signal Processing", "Matplotlib"],
      description:
        "A specialized open-source tool designed to classify bat echolocation calls using sonogram analysis. I contributed critical features including an audio speed toggle for detailed listening and fixed complex frequency rendering errors. This tool aids researchers in accurate species identification through visual and audio signal processing.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/BattyCoda",
      },
    },
    {
      title: "Receipt Volume Forecasting Engine",
      techStack: ["Docker", "Flask", "NumPy", "Machine Learning", "Polynomial Regression"],
      description:
        "An end-to-end machine learning application that forecasts monthly receipt volumes for retail businesses. Unlike standard library implementations, I built a custom polynomial regression model from scratch using NumPy to demonstrate mathematical understanding. The entire application is containerized with Docker, ensuring consistent behavior across development and production environments.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
    {
      title: "Gym Buddy: Health Tracking Suite",
      techStack: ["Android SDK", "Java", "XML", "SQLite", "Mobile Architecture"],
      description:
        "A native Android application designed for holistic health tracking. It features a custom-built XML user interface and a local SQLite database to manage user data securely offline. Features include personalized workout planning algorithms, diet macro tracking, and a real-time BMI calculator, demonstrating strong command over the Android Activity lifecycle.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
    {
      title: "IPL Match Predictive Model",
      techStack: ["Python", "Scikit-learn", "Flask", "Pandas", "Data Visualization"],
      description:
        "A predictive analytics model achieving 84% accuracy in forecasting IPL cricket match outcomes. I engineered features from historical match data using Pandas and trained multiple classifiers using Scikit-learn. The model is served via a lightweight Flask REST API, allowing users to input match conditions and receive real-time win probability predictions.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
  ],
} as const;