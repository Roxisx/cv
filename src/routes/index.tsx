import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

declare global {
  interface Window {
    AOS: {
      init: (config?: Record<string, unknown>) => void;
      refresh: () => void;
    };
  }
}

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  useEffect(() => {
    const initAOS = () => {
      if (typeof window !== "undefined" && window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: true,
          offset: 80,
          easing: "ease-out-cubic",
        });
      }
    };
    if (window.AOS) {
      initAOS();
    } else {
      document.addEventListener("DOMContentLoaded", initAOS);
      setTimeout(initAOS, 500);
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = document.getElementById("hero");
      if (hero) {
        const parallax = hero.querySelector(".parallax-bg") as HTMLElement;
        if (parallax) {
          parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    const animateCounters = () => {
      const counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        const increment = Math.ceil(target / 50);
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = current + "+";
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + "+";
          }
        };
        updateCounter();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    const statsSection = document.getElementById("stats");
    if (statsSection) observer.observe(statsSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Michael
            </span>{" "}
            <span className="text-white">January</span>
          </h1>

          <div
            className="text-xl md:text-2xl text-white/70 mb-8 font-light"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="inline-block border-r-2 border-blue-400 pr-2 mr-2 animate-blink">Director</span>
            <span className="text-blue-400">&</span> Senior Developer
          </div>

          <p
            className="text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Results-driven Director with strong senior development expertise, leading cross-functional teams
            and delivering complex software projects from concept to deployment.
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <a
              href="#experience"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
            >
              View My Work
              <i className="fas fa-arrow-down ml-2" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-dot" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section
        id="stats"
        className="relative py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-y border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "fa-code", target: 25, label: "Projects Delivered" },
              { icon: "fa-users", target: 12, label: "Happy Clients" },
              { icon: "fa-award", target: 7, label: "Years Experience" },
              { icon: "fa-mug-hot", target: 3000, label: "Cups of Coffee" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center group"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="text-3xl text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className={`fas ${stat.icon}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                  <span className="counter" data-target={stat.target}>0</span>
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="relative py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className="relative"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl rotate-6 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl -rotate-3 opacity-30" />
                <div className="absolute inset-0 bg-slate-800 rounded-3xl flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <i className="fas fa-user-tie text-8xl text-blue-400/60" />
                    <p className="text-white/30 text-sm mt-4">Michael January</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 shadow-xl animate-float">
                <i className="fas fa-code text-white text-xl" />
              </div>
              <div className="absolute -top-4 -left-4 bg-slate-800 rounded-2xl p-4 shadow-xl border border-white/10 animate-float" style={{ animationDelay: "1s" }}>
                <i className="fas fa-brain text-blue-400 text-xl" />
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="400">
              <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-8">
                Director &{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Senior Developer
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Results-driven Director with strong senior development expertise, experienced
                in leading cross-functional teams and delivering complex software projects
                from concept to deployment. Skilled in applying Agile methodologies to drive
                collaboration, efficiency, and on-time delivery.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Proven ability to balance technical leadership with client engagement, ensuring
                solutions meet business goals while maintaining high-quality standards. Adept at
                guiding teams through version control, automation, and modern development practices,
                while fostering a culture of innovation and accountability.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Location", value: "Cape Town, SA" },
                  { label: "Email", value: "michaelcjanuary@gmail.com" },
                  { label: "Phone", value: "083 462 6003" },
                  { label: "Freelance", value: "Available" },
                ].map((info) => (
                  <div key={info.label} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <div>
                      <span className="text-white/40 text-xs uppercase tracking-wider">
                        {info.label}
                      </span>
                      <p className="text-white/80 text-sm">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE TIMELINE ===== */}
      <section
        id="experience"
        className="relative py-32 bg-gradient-to-b from-slate-950 to-slate-900"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
              Career
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Work{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-600 transform md:-translate-x-1/2" />

            {[
              {
                period: "Oct 2018 - June 2025",
                title: "Director & Senior Developer",
                company: "Temo Digital",
                description: "Managing full software lifecycles from concept to deployment using Agile methodologies. Leading teams, managing client relations, and aligning technical solutions with business objectives. Leading full-cycle software projects with hands-on expertise in front-end and back-end development.",
                tags: ["Agile", "Project Management", "Team Leadership", "System Architecture"],
                side: "left",
              },
              {
                period: "2016 - Oct 2018",
                title: "Junior Developer",
                company: "Temo Consulting",
                description: "Contributed to multiple projects, quickly adapting to different environments and completing assigned tasks across varied technologies. Supported project delivery by building add-ons to existing systems and managing client expectations.",
                tags: ["C#", "Angular", "Node.js", "REST API"],
                side: "right",
              },
              {
                period: "2014 - 2015",
                title: "Tutor, Mentor & Orientation Leader",
                company: "University of Cape Town",
                description: "Mentored and tutored students, boosting academic performance and confidence. Led orientation sessions, helping new students integrate and engage with campus life.",
                tags: ["Mentoring", "Teaching", "Leadership"],
                side: "left",
              },
            ].map((exp, i) => (
              <div
                key={exp.title}
                className={`relative mb-16 md:mb-24 pl-16 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                }`}
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={i * 100}
              >
                <div className="absolute left-2 md:left-1/2 top-2 w-5 h-5 bg-blue-600 rounded-full border-4 border-slate-900 transform -translate-x-1/2 z-10 shadow-lg shadow-blue-600/30" />

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 group">
                  <span className="text-blue-400 text-sm font-mono">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-indigo-300 font-medium mt-1">
                    {exp.company}
                  </p>
                  <p className="text-white/50 mt-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 mt-4 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section className="relative py-32 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Skills &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <i className="fas fa-code text-blue-400" />
                Frontend & Languages
              </h3>
              <div className="space-y-5">
                {[
                  { name: "JavaScript / TypeScript", level: 90 },
                  { name: "HTML5 / CSS3", level: 95 },
                  { name: "Angular / AngularJS", level: 85 },
                  { name: "C# / .NET", level: 88 },
                  { name: "PHP / Java", level: 75 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full skill-bar"
                        style={{ width: "0%" }}
                        data-width={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <i className="fas fa-server text-blue-400" />
                Backend & Cloud
              </h3>
              <div className="space-y-5">
                {[
                  { name: "Node.js / REST API", level: 90 },
                  { name: "MySQL / PostgreSQL", level: 85 },
                  { name: "Redis / nHibernate", level: 75 },
                  { name: "AWS / Azure", level: 80 },
                  { name: "Jenkins / GitLab CI/CD", level: 78 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full skill-bar"
                        style={{ width: "0%" }}
                        data-width={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership Skills */}
          <div className="mt-16" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
              <i className="fas fa-users text-blue-400" />
              Leadership & Management
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Project Management", "Stakeholder Management", "Team Leadership",
                "Agile Practices", "Performance Optimisation", "System Architecture & Design",
                "Technology Strategy & Roadmapping", "MVC Architecture"
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-3 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 text-sm font-medium hover:bg-blue-500/20 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS / PLATFORMS ===== */}
      <section className="relative py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
              Platforms
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Cloud &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Frameworks
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-cloud",
                title: "Cloud Platforms",
                items: ["AWS", "Azure"],
                color: "from-blue-600 to-cyan-600",
              },
              {
                icon: "fa-database",
                title: "Databases",
                items: ["MySQL", "PostgreSQL", "Redis", "nHibernate", "Entity Framework"],
                color: "from-indigo-600 to-blue-600",
              },
              {
                icon: "fa-cogs",
                title: "DevOps & Frameworks",
                items: ["Jenkins", "GitLab CI/CD", "Angular", ".NET", "Node.js", "MVC", "REST API"],
                color: "from-cyan-600 to-teal-600",
              },
            ].map((platform, i) => (
              <div
                key={platform.title}
                className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fas ${platform.icon}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {platform.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {platform.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm bg-white/5 text-white/60 rounded-lg border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/0 via-transparent to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="relative py-32 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
              Education
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Academic{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Background
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                degree: "BSc Computer Science",
                year: "2012 - 2018",
                school: "University of Cape Town",
                desc: "Comprehensive computer science degree with focus on software development, algorithms, and system design.",
              },
              {
                degree: "BSc Games Development",
                year: "2012 - 2018",
                school: "University of Cape Town",
                desc: "Specialized in game development, interactive systems, and immersive technology design.",
              },
              {
                degree: "National Senior Certificate",
                year: "2007 - 2011",
                school: "South Peninsula High School",
                desc: "Bachelors pass with strong academic performance.",
              },
            ].map((edu, i) => (
              <div
                key={edu.degree}
                className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group ${i === 2 ? "md:col-span-2 max-w-lg mx-auto w-full" : ""}`}
                data-aos="fade-up"
                data-aos-delay={i * 200}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-blue-400 text-sm font-mono">{edu.year}</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">{edu.degree}</h3>
                    <p className="text-indigo-300 font-medium">{edu.school}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <i className="fas fa-graduation-cap" />
                  </div>
                </div>
                <p className="text-white/50 leading-relaxed">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REFERENCES ===== */}
      <section className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">
              References
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              What People{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                author: "Wahseema Miller",
                role: "Temo Digital",
                phone: "082 595 4472",
                email: "waseema@temo.co.za",
                avatar: "WM",
              },
              {
                author: "Russell Miller",
                role: "Temo Consulting",
                phone: "083 700 0441",
                email: "russell@temo.co.za",
                avatar: "RM",
              },
              {
                author: "Russell Miller",
                role: "Temo Consulting",
                phone: "021 650 2665",
                email: "gstewart@cs.uct.ac.za",
                avatar: "RM",
              },
            ].map((ref, i) => (
              <div
                key={ref.author + i}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    {ref.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{ref.author}</p>
                    <p className="text-white/40 text-sm">{ref.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-white/50 text-sm">
                  <p><i className="fas fa-phone mr-2 text-blue-400" />{ref.phone}</p>
                  <p><i className="fas fa-envelope mr-2 text-blue-400" />{ref.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        className="relative py-32 bg-slate-950 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div data-aos="fade-up">
            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm">Contact</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Let's{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Work Together
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-12">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          <div
            className="flex flex-wrap justify-center gap-4 mb-16"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a
              href="mailto:michaelcjanuary@gmail.com"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <i className="fas fa-envelope" />
              Send Email
            </a>
            <a
              href="tel:+27834626003"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
            >
              <i className="fas fa-phone" />
              Call Me
            </a>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {[
              { icon: "fa-envelope", label: "Email", value: "michaelcjanuary@gmail.com" },
              { icon: "fa-map-marker-alt", label: "Location", value: "Cape Town, South Africa" },
              { icon: "fa-phone", label: "Phone", value: "083 462 6003" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
              >
                <i className={`fas ${item.icon} text-2xl text-blue-400 mb-3`} />
                <p className="text-white/40 text-sm uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2025 Michael January. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["fab fa-linkedin", "fab fa-github", "fab fa-twitter", "fas fa-envelope"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="text-white/30 hover:text-blue-400 transition-colors duration-300 hover:scale-110 inline-block"
              >
                <i className={`${icon} text-lg`} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s infinite; }
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        .animate-scroll-dot { animation: scroll-dot 1.5s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .skill-bar { transition: width 1.5s ease-in-out; }
        .aos-animate .skill-bar { width: var(--skill-width) !important; }
      `}</style>
    </div>
  );
}