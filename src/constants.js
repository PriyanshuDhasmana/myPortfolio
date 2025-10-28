// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import sassLogo from './assets/tech_logo/sass.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import angularLogo from './assets/tech_logo/angular.png';
import reduxLogo from './assets/tech_logo/redux.png';
import nextjsLogo from './assets/tech_logo/nextjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import gsapLogo from './assets/tech_logo/gsap.png';
import materialuiLogo from './assets/tech_logo/materialui.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import springbootLogo from './assets/tech_logo/springboot.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import firebaseLogo from './assets/tech_logo/firebase.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import typescriptLogo from './assets/tech_logo/typescript.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import mcLogo from './assets/tech_logo/mc.png';
import figmaLogo from './assets/tech_logo/figma.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import csharpLogo from './assets/tech_logo/csharp.png';

// Experience Section Logo's
import cat_logo from './assets/company_logo/cat_logo.png';
import fwc_it_services_pvt_ltd_logo from './assets/company_logo/fwc_it_services_pvt_ltd_logo.jpg';

// Education Section Logo's
import bmsceLogo from './assets/education_logo/bmsce_logo.png';
import bblLogo from './assets/education_logo/BBLPS.jpg';
import SSMVLogo from './assets/education_logo/SSMVLogo.jpg';


// Project Section Logo's
import githubdetLogo from './assets/work_logo/github_det.png';
import FWCLogo from './assets/work_logo/FWCWebsite.png';
import ecedept from './assets/work_logo/ecedept.png';
import taskremLogo from './assets/work_logo/task_rem.png';
import npmLogo from './assets/work_logo/npm.png';
import weatherApp from './assets/work_logo/weatherApp.png';

export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Next JS', logo: nextjsLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },

    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', logo: cLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'TypeScript', logo: typescriptLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Compass', logo: mcLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];

  export const experiences = [
    {
      id: 0,
      img: cat_logo,
      role: "Associate Engineer",
      company: "Caterpillar Inc.",
      date: "July 2025 - Present",
      desc: "Currently working in the role of Associate Engineer at Caterpillar Inc., contributing to the development and maintenance of web applications that enhance user experience and operational efficiency. Collaborating with cross-functional teams to implement innovative solutions using modern web technologies.",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node JS",
        "Java",
        "Various Protocols",
        "Python",
      ],
    },
    {
      id: 1,
      img: cat_logo,
      role: "Associate Engineer Intern",
      company: "Caterpillar Inc.",
      date: "January 2025 - July 2025",
      desc: "As an intern, I worked on various web based projects, gaining hands-on experience in full-stack development. I collaborated with senior developers to design and implement features, debug issues, and optimize application performance. This internship provided me with valuable insights into industry practices and enhanced my technical skills.",
      skills: [
       "HTML",
        "CSS",
        "JavaScript",
        "Node JS",
        "Java",
        "Various Protocols",
        "JProfiler",
      ],
    },
    {
      id: 2,
      img: fwc_it_services_pvt_ltd_logo,
      role: "SDE Intern",
      company: "FWC IT Services Pvt. Ltd.",
      date: "January 2025 - July 2025",
      desc: "I worked on the official website of the company with the help of ReactJS for frontend and NodeJS for backend. I was responsible for implementing new features, fixing bugs, and improving the overall user experience. This internship allowed me to apply my academic knowledge in a real-world setting and develop my problem-solving skills.",
      skills: [
        "ReactJS",
        "Node JS",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
      ],
    },
  ];
  
  export const education = [
    
    {
      id: 0,
      img: bmsceLogo,
      school: "BMS College of Engineering, Bangalore",
      date: "Dec 2025 - June 2025",
      grade: "7.8 CGPA",
      desc: "I completed my Bachelor's degree in Bachelor of Engineering(BE) from BMS College of Engineering, Bangalore. Throughout my studies, I was immersed in a variety of subjects that deepened my understanding of computing and technology. From exploring Data Structures and Algorithms to diving into Web Development and Database Management Systems, I gained practical insights into the world of software development. My time at BMS College allowed me to work on projects that applied theoretical concepts to real-world problems.",
      degree: "Bachelor of Engineering - BE",
    },
    {
      id: 1,
      img: bblLogo,
      school: "BBL Public School, Bareilly",
      date: "Apr 2019 - March 2020",
      grade: "90%",
      desc: "I completed my class 12 education from BBL Public School, Bareilly, under the CBSE board, where I studied Physics, Chemistry, and Mathematics (PCM) with Computer Science.",
      degree: "CBSE(XII) - PCM with Computer Science",
    },
    {
      id: 2,
      img: SSMVLogo,
      school: "SSMV, Shahjahanpur",
      date: "Apr 2017 - March 2018",
      grade: "92%",
      desc: "I completed my class 10 education from SSMV, Shahjahanpur, under the CBSE board, where I studied Science with Computer.",
      degree: "CBSE(X), Science with Computer Application",
    },
  ];
  
  export const projects = [
    {
      id: 0,
      title: "GitHub Profile Detective",
      description:
        "A powerful and user-friendly React.js application designed to uncover and showcase detailed GitHub profile information. Simply enter a GitHub username, and the app fetches comprehensive data, including profile stats, repositories, followers, and contributions. The intuitive interface ensures a seamless experience, making it a must-visit tool for developers and recruiters.",
      image: githubdetLogo,
      tags: ["HTML", "CSS", "JavaScript", "React JS", "API"],
      github: "https://github.com/codingmastr/GitHub-Profile-Search-App-Using-React-JS",
      webapp: "https://githubprofiledetective.netlify.app/",
    },
    {
      id: 1,
      title: "FWC Official Website",
      description:
        "Built an end-to-end website for FWC IT Services Pvt Ltd. Created a fully responsive site with over 40 interactive pages. Employed Styled-Components for modular and maintainable CSS-in-JS styling.",
      image: FWCLogo,
      tags: ["React JS", "Node.js", "MongoDB", "Express", "HTML", "CSS", "JavaScript"],
      github: null,
      webapp: "https://www.fwc.co.in/",
    },
    {
      id: 2,
      title: "ECE Department Website",
      description:
        "A React-based web application that provides information about the ECE department, including courses, faculty, and student resources. The website features a clean design and user-friendly navigation.",
      image: ecedept,
      tags: ["React JS", "HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/PriyanshuDhasmana/ECE-Dept-Website.git",
      webapp: "https://ece-dept-frontend.vercel.app/",
    },
    {
      id: 3,
      title: "Email Validator NPM Package",
      description:
        "An efficient and customizable NPM package for validating email addresses. Built using React.js and Node.js, it provides robust validation features to help developers ensure that email inputs meet required formats and standards.",
      image: npmLogo,
      tags: ["React JS", "Node.js", "NPM", "Validation"],
      github: "https://github.com/codingmastr/cmtk-email-validator",
      webapp: "https://www.npmjs.com/package/cmtk-email-validator",
    },
    {
      id: 4,
      title: "Weather App",
      description:
        "A weather forecasting application that provides real-time weather updates and forecasts for any location. Built using React.js and Node.js, it offers a user-friendly interface and accurate weather data.",
      image: weatherApp,
      tags: ["JavaScript", "React JS", "HTML", "CSS",  "Node JS", "API"],
      github: "https://github.com/PriyanshuDhasmana/weatherApp",
      webapp: "https://weather-6fhdcajtq-priyanshudhasmanas-projects.vercel.app/",
    },
    {
      id: 5,
      title: "University-Management-System-using-File-Stream-and-OOPs-Concepts",
      description:
        "The University Management System is a C++ program that manages student and faculty information. The program uses templates for data handling, and file operations for data persistence, and incorporates error handling for smooth execution.",
      image: null,
      tags: ["C++", "OOP", "File Handling", "Templates"],
      github: "https://github.com/PriyanshuDhasmana/University-Management-System-using-File-Stream-and-OOPs-Concepts.git",
      webapp: null,
    },
    
  ];  