// src/data/resume-data.ts

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
      start: "2024",
      end: "2026",
      description: "GPA: 4.0/4.0",
    },
    {
      school: "University of Mumbai",
      degree: "Bachelor of Engineering in Information Technology",
      start: "2018",
      end: "2022",
      description: "GPA: 8.37/10",
    },
  ],
  work: [
    {
      company: "LTIMindtree",
      link: "https://www.ltimindtree.com",
      badges: ["Data Engineering", "Azure", "Snowflake"],
      title: "Senior Data Engineer",
      start: "Jun 2022",
      end: "Mar 2024",
      description:
        "Led a 10-member team to migrate data from SQL Server to Snowflake, reducing reporting run-time by 20%. Optimized query logic to cut data retrieval time by 40%. Developed incremental-load pipelines in Azure Data Factory (ADF).",
    },
    {
      company: "Abner Security",
      link: "https://abnersecurity.com", // Placeholder link
      badges: ["Web Dev", "WordPress", "SEO"],
      title: "Web Development Intern",
      start: "May 2021",
      end: "Sep 2021",
      description:
        "Reengineered the web platform, increasing organic traffic by 30% via SEO and performance optimization. Customized plugins to enhance security and analytics.",
    },
    {
      company: "Innovatiive Creators",
      link: "", 
      badges: ["PHP", "MySQL", "Backend"],
      title: "Web Developer Intern",
      start: "Oct 2020",
      end: "Nov 2020",
      description:
        "Built a PHP-based admin panel for the National Institute of Hospitality Management, reducing content update time by 40%. Normalized database schemas to improve query performance by 30%.",
    },
  ],
  skills: [
    "Python",
    "Next.js",
    "TypeScript",
    "Java",
    "C++",
    "SQL (Snowflake, MySQL)",
    "Azure Data Factory",
    "Docker",
    "AWS",
    "Power BI",
    "Git",
  ],
  projects: [
    {
      title: "BattyCoda",
      techStack: ["Open Source", "Python", "Streamlit", "Signal Processing"],
      description:
        "An open-source tool to classify bat echolocation calls using sonograms. Contributed features like audio speed toggling and fixed frequency errors.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/BattyCoda", // Verify this link later
      },
    },
    {
      title: "Receipt Count Prediction",
      techStack: ["Docker", "Flask", "NumPy", "Machine Learning"],
      description:
        "Forecasts monthly receipt volumes using a custom polynomial regression model built from scratch. Fully containerized with Docker for consistent deployment.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
    {
      title: "Gym Buddy App",
      techStack: ["Android", "Java", "XML"],
      description:
        "A native Android fitness app with workout planning, diet tracking, and BMI calculation. Features a custom XML UI and local data storage.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
    {
      title: "IPL Prediction Model",
      techStack: ["Python", "Scikit-learn", "Flask"],
      description:
        "Developed a machine learning model to predict IPL outcomes. Built a Flask web interface for end-user predictions.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet",
      },
    },
  ],
} as const;